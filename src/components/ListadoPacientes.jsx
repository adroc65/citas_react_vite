import { useEffect } from "react";

import Paciente from "./Paciente";

const ListadoPacientes = ({ pacientes, setPaciente, eliminarPaciente }) => {

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      { pacientes && pacientes.length ? (
        <>
          <h2 className="font-black text-center text-3xl">Lista de Pacientes</h2>
          <p className="my-5 text-lg text-center">Administra tus {' '} <span className="text-indigo-600 font-bold">Pacientes y Citas</span></p>
          { pacientes.map( paciente => ( 
            <Paciente
              key={ paciente.id } 
              paciente={ paciente }
              setPaciente={setPaciente}
              eliminarPaciente={eliminarPaciente}
            /> 
          ))}
        </>
      ) : (
        <>
            <h2 className="font-black text-center text-3xl">No Hay Pacientes</h2>
            <p className="my-5 text-lg text-center">Ingresa los Pacientes en el Formulario y se muestran {' '} 
              <span className="text-indigo-600 font-bold">aquí abajo</span>
            </p>
        </>
      )
      }
    </div>
  )
}

export default ListadoPacientes