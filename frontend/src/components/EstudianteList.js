import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EstudianteList.css';

const EstudianteList = ({ fetchEstudiantesTrigger, onEdit }) => {
    const [estudiantes, setEstudiantes] = useState([]);

    useEffect(() => {
        fetchEstudiantes();
    }, [fetchEstudiantesTrigger]);

    const fetchEstudiantes = async () => {
        const response = await axios.get('/api/estudiantes');
        setEstudiantes(response.data);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/estudiantes/${id}`);
            fetchEstudiantes(); // Asegúrate de volver a llamar a fetchEstudiantes después de eliminar
        } catch (error) {
            console.error("There was an error deleting the estudiante!", error);
        }
    };

    return (
        <div className="estudiante-list">
            <h2>Lista de Estudiantes</h2>
            {estudiantes.map(estudiante => (
                <div key={estudiante.id} className="estudiante">
                    <p><strong>ID:</strong> {estudiante.id}</p>
                    <p><strong>Nombre:</strong> {estudiante.nombre}</p>
                    <button onClick={() => onEdit(estudiante)}>Editar</button>
                    <button onClick={() => handleDelete(estudiante.id)}>Eliminar</button>
                </div>
            ))}
        </div>
    );
};

export default EstudianteList;
