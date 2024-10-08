import React, { useState } from 'react';
import axios from 'axios';
import './NotaForm.css';

const NotaForm = ({ fetchNotas }) => {
    const [nota, setNota] = useState({
        estudiante: { id: '', nombre: '' },
        actividades: '',
        primerParcial: '',
        segundoParcial: '',
        examenFinal: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'estudiante.id') {
            setNota(prevNota => ({
                ...prevNota,
                estudiante: { id: value, nombre: '' }  // Reset nombre to trigger fetch
            }));
        } else if (name === 'actividades' || name === 'primerParcial' || name === 'segundoParcial' || name === 'examenFinal') {
            setNota(prevNota => ({
                ...prevNota,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/notas', {
                estudiante: { id: nota.estudiante.id },
                actividades: nota.actividades,
                primerParcial: nota.primerParcial,
                segundoParcial: nota.segundoParcial,
                examenFinal: nota.examenFinal
            });
            fetchNotas();
        } catch (error) {
            console.error("There was an error creating the nota!", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="nota-form">
            <h1>Gestor de Notas</h1>
            <input type="text" name="estudiante.id" value={nota.estudiante.id} onChange={handleChange} placeholder="Estudiante ID" required />
            {nota.estudiante.nombre && <p>Nombre del Estudiante: {nota.estudiante.nombre}</p>}
            <input type="number" name="actividades" value={nota.actividades} onChange={handleChange} placeholder="Actividades" required />
            <input type="number" name="primerParcial" value={nota.primerParcial} onChange={handleChange} placeholder="Primer Parcial" required />
            <input type="number" name="segundoParcial" value={nota.segundoParcial} onChange={handleChange} placeholder="Segundo Parcial" required />
            <input type="number" name="examenFinal" value={nota.examenFinal} onChange={handleChange} placeholder="Examen Final" required />
            <button type="submit">Guardar Nota</button>
        </form>
    );
};

export default NotaForm;
