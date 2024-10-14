'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Register.module.css';
import Swal from 'sweetalert2';
import { myFetch } from '@/app/services/funcionesService';

export default function Register() {
  //const { login } = useAuth();
  const [formData, setFormData] = useState({
    "nombre": "",
    "apellido": "",
    "usuario": "",
    "email": "",
    "password": "",
    "ubicacion": "",
    "contacto": ""
  });

  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validarObjeto = (obj) => {
    console.log("--",obj )
    for (const key in obj) {
      if (obj[key] === "") {
        return false; // Devuelve false si se encuentra un campo vacío
      }
    }
    return true; // Devuelve true si todos los campos están llenos
  };

  const registrar = async () => {

    if(!validarObjeto(formData)){
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Todos los campos son obligatorios',
        confirmButtonColor: '#db320e',
      });
      return
    }
    const respuesta = await myFetch("http://localhost:8080/api/v1/addProductor", "POST", formData)
    if(respuesta && respuesta?.id !==null){
      Swal.fire({
        icon: 'success',
        title: 'Registro',
        text: 'Productor registrado correctamente.',
        confirmButtonColor: '#db320e',
      });
      router.push("/pages/login")
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Credenciales invalidas',
        confirmButtonColor: '#db320e',
      });
      return
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.registerBox}>
        <h1 className={styles.h1}>Registro de Productor</h1>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="lastname">Apellido</label>
          <input type="text" id="lastname" name="lastname" value={formData.apellido} onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="user">Usuario</label>
          <input type="text" id="user" name="user" value={formData.usuario} onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="location">Ubicación</label>
          <input type="text" id="location" name="location" value={formData.ubicacion} onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="contact">Contacto</label>
          <input type="text" id="contact" name="contact" value={formData.contacto} onChange={handleChange} required />
        </div>
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        <button className={styles.registerButton} onClick={() => { registrar() }}>Registrar</button>
      </div>
    </div>
  );
}