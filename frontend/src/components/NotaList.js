import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NotaList.css';

const NotaList = ({ fetchNotasTrigger, onEdit }) => {
    const [notas, setNotas] = useState([]);

    useEffect(() => {
        fetchNotas();
    }, [fetchNotasTrigger]);

    const fetchNotas = async () => {
        const response = await axios.get('/api/notas');
        setNotas(response.data);
    };

    return (
        <div className="nota-list">
            {notas.map(nota => (
                <div key={nota.id} className="nota">
                    <p><strong>Estudiante ID:</strong> {nota.estudiante.id}</p>
                    <p><strong>Nombre del Estudiante:</strong> {nota.estudiante.nombre}</p>
                    <p><strong>Actividades:</strong> {nota.actividades}</p>
                    <p><strong>Primer Parcial:</strong> {nota.primerParcial}</p>
                    <p><strong>Segundo Parcial:</strong> {nota.segundoParcial}</p>
                    <p><strong>Examen Final:</strong> {nota.examenFinal}</p>
                    <p><strong>Puntaje Total:</strong> {nota.puntajeTotal}</p>
                    <button onClick={() => onEdit(nota)}>Editar</button>
                </div>
            ))}
        </div>
    );
};

export default NotaList;
