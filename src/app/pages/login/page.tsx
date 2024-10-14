// src/app/pages/login/page.tsx
'use client';

import styles from './login.module.css';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
//import { useAuth } from '../../../context/AuthContext'; // Importa el contexto de autenticación
import Swal from 'sweetalert2';
import { myFetch, setCookie } from '@/app/services/funcionesService';
import { AuthContextV2 } from '@/context/AuthContextV2';
export default function Login() {
  /*Contexto*/
  const { acceso, setAcceso, setUser } = useContext(AuthContextV2);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();


  const iniciarSesion = async () => {

    if (email.trim() == '' || password.trim() == '') {
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Todos los campos son obligatorios',
        confirmButtonColor: '#db320e',
      });
      return
    }

    const respuesta = await myFetch("http://localhost:8080/api/auth/login", "POST", {
      "email": email,
      "password": password
    })
    if (respuesta && respuesta?.token != null) {
      setCookie("auth", respuesta?.token, 1)
      setCookie("user", JSON.stringify(respuesta?.productorResponse), 1)
      setAcceso(true)
      setUser(respuesta?.productorResponse)
      router.push('/pages/dashboard')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Credenciales invalidas',
        confirmButtonColor: '#db320e',
      });
      return
    }

  }

  const irARegistro=()=>{
    router.push('/pages/register')
  }


  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1>Administre de forma eficiente sus fincas</h1>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        <button style={{width:160}} className={styles.loginButton} onClick={() => { iniciarSesion() }}>Iniciar sesión</button>&nbsp;&nbsp;
        <button style={{width:160}} className={styles.loginButton} onClick={() => { irARegistro() }}>Registro</button>

      </div>
    </div>
  );
}
