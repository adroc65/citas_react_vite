import { useState, useEffect } from "react";
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"


function App() {

  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      setPacientes(pacientesLS);
    }
    obtenerLS();
  }, []);

  useEffect(() => {
    localStorage.setItem( 'pacientes', JSON.stringify( pacientes ));
  }, [pacientes]);

  const eliminarPaciente = id => {
    //console.log('Eliminando Pasiente con ID= ', id );
    //Con filter no se elimina el arreglo original.
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id );
    setPacientes(pacientesActualizados); //Se actualiza el arreglo de Objetos.
  }

  return (
    <div className="container mx-auto mt-12">
      <Header />
      <div className="mt-12 md:flex">
        <Formulario 
          pacientes={ pacientes }
          setPacientes={ setPacientes }
          paciente={ paciente }
          setPaciente={ setPaciente } //Se pasa esta funcion para limpiar memoria
        />
        <ListadoPacientes 
          pacientes={ pacientes }
          setPaciente={ setPaciente }
          eliminarPaciente={ eliminarPaciente }
        />
      </div>
      
    </div>
  )
}

export default App
