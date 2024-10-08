import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NotaEdit.css';

const NotaEdit = ({ nota, onSave }) => {
    const [notaEditada, setNotaEditada] = useState(nota);

    useEffect(() => {
        setNotaEditada(nota);
    }, [nota]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('estudiante.')) {
            const field = name.split('.')[1];
            setNotaEditada(prevNota => ({
                ...prevNota,
                estudiante: { ...prevNota.estudiante, [field]: value }
            }));
        } else {
            setNotaEditada(prevNota => ({
                ...prevNota,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/notas/${notaEditada.id}`, notaEditada);
            onSave();
        } catch (error) {
            console.error("There was an error updating the nota!", error);
        }
    };

    if (!nota) return null;

    return (
        <form onSubmit={handleSubmit} className="nota-edit">
            <input type="text" name="estudiante.id" value={notaEditada.estudiante.id} onChange={handleChange} placeholder="Estudiante ID" required />
            <input type="text" name="estudiante.nombre" value={notaEditada.estudiante.nombre} onChange={handleChange} placeholder="Nombre del Estudiante" required />
            <input type="number" name="actividades" value={notaEditada.actividades} onChange={handleChange} placeholder="Actividades" required />
            <input type="number" name="primerParcial" value={notaEditada.primerParcial} onChange={handleChange} placeholder="Primer Parcial" required />
            <input type="number" name="segundoParcial" value={notaEditada.segundoParcial} onChange={handleChange} placeholder="Segundo Parcial" required />
            <input type="number" name="examenFinal" value={notaEditada.examenFinal} onChange={handleChange} placeholder="Examen Final" required />
            <button type="submit">Guardar Cambios</button>
        </form>
    );
};

export default NotaEdit;
