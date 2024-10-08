import React, { useState } from 'react';
import axios from 'axios';
import './EstudianteForm.css';

const EstudianteForm = ({ fetchEstudiantes }) => {
    const [estudiante, setEstudiante] = useState({
        id: '',
        nombre: '',
        apellido: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEstudiante(prevEstudiante => ({
            ...prevEstudiante,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/estudiantes', estudiante);
            fetchEstudiantes();
        } catch (error) {
            console.error("There was an error creating the student!", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="estudiante-form">
            <h1>Ingreso de Estudiantes</h1>
            <input type="text" name="id" value={estudiante.id} onChange={handleChange} placeholder="ID del Estudiante" required />
            <input type="text" name="nombre" value={estudiante.nombre} onChange={handleChange} placeholder="Nombre del Estudiante" required />
            <input type="text" name="apellido" value={estudiante.apellido} onChange={handleChange} placeholder="Apellido del Estudiante" required />
            <button type="submit">Guardar Estudiante</button>
        </form>
    );
};

export default EstudianteForm;
