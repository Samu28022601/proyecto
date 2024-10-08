import React, { useState } from 'react';
import './App.css';
import NotaList from './components/NotaList';
import NotaForm from './components/NotaForm';
import NotaEdit from './components/NotaEdit';
import EstudianteList from './components/EstudianteList';
import EstudianteForm from './components/EstudianteForm';

const App = () => {
    const [fetchNotasTrigger, setFetchNotasTrigger] = useState(false);
    const [fetchEstudiantesTrigger, setFetchEstudiantesTrigger] = useState(false);
    const [notaParaEditar, setNotaParaEditar] = useState(null);
    const [estudianteParaEditar, setEstudianteParaEditar] = useState(null);

    const fetchNotas = () => {
        setFetchNotasTrigger(prev => !prev);
    };

    const fetchEstudiantes = () => {
        setFetchEstudiantesTrigger(prev => !prev);
    };

    const handleEditNota = (nota) => {
        setNotaParaEditar(nota);
    };

    const handleSaveNota = () => {
        setNotaParaEditar(null);
        fetchNotas();
    };

    const handleEditEstudiante = (estudiante) => {
        setEstudianteParaEditar(estudiante);
    };

    const handleSaveEstudiante = () => {
        setEstudianteParaEditar(null);
        fetchEstudiantes();
    };

    return (
        <div className="container">
            <div>
                <h1>Gestión de Notas</h1>
                <EstudianteForm fetchEstudiantes={fetchEstudiantes} estudianteParaEditar={estudianteParaEditar} onSave={handleSaveEstudiante} />
                <NotaForm fetchNotas={fetchNotas} />
                <NotaList fetchNotasTrigger={fetchNotasTrigger} onEdit={handleEditNota} />
                {notaParaEditar && <NotaEdit nota={notaParaEditar} onSave={handleSaveNota} />}
            </div>
            <EstudianteList fetchEstudiantesTrigger={fetchEstudiantesTrigger} onEdit={handleEditEstudiante} />
        </div>
    );
};

export default App;
