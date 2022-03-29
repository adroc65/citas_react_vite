import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  
  //Detecta errores con useState
  const [error, setError] = useState(false);

  //Hook, para leer un dato cuando esta listo.
  useEffect(() => {
    if (Object.keys(paciente).length > 0 ) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  //Esta función genera un Hatch Unico, para el ID de cada campo.
  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return fecha + random
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validando formulario:
    if ([nombre, propietario, email,fecha, sintomas].includes('')) {
      //console.log('¡Hay un campo vacio!');
      setError(true);
    } else {
        //console.log('Todos llenos');
        setError(false);
        //Se crea el objeto Paciente:
        const objetoPaciente = {
          nombre, 
          propietario, 
          email,
          fecha, 
          sintomas,
          //id: generarId()
        };

        /**
         * Para la actualización de un paciente, se detecta primero si 
         * existe el ID, esto indica que es un paciente nuevo o uno que
         * se esta editando
         * */
        if (paciente.id) {
          //Editando el Registro
          objetoPaciente.id = paciente.id;
          const pacientesActualizados = pacientes.map( 
            pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState 
          );
          setPacientes(pacientesActualizados);
          setPaciente({}); //Se limpia de memoria el paciente enviado.

        } else {
          // Nuevo registro
          objetoPaciente.id = generarId();
          // Se crea un arreglo de Objetos de pacientes
          setPacientes([...pacientes, objetoPaciente]);
        }

        
        // Ya almacenado el paciente se limpia el FORM:
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');

    }
  };
  return (
    <div className="mx-5 md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento de Pacientes</h2>
      <p className="my-5 text-lg text-center">Añade Pacientes y {''} <span className="text-indigo-600 font-bold">Administralos</span></p>
      <form 
        onSubmit={ handleSubmit }
        action="" 
        className="bg-white shadow-md rounded-lg mb-10 py-10 px-5"
      >
        
        <div className="mb-6">
          <label htmlFor="nombre" className="block text-gray-700 font-bold uppercase">Nombre Mascota</label>
          <input 
            id="nombre"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-indigo-200 rounded-md"
            value={ nombre }
            onChange={ (e) => setNombre(e.target.value) }
          />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 font-bold uppercase">Nombre Propietario</label>
          <input 
            id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-indigo-200 rounded-md"
            value={ propietario }
            onChange={ (e) => setPropietario(e.target.value) }
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 font-bold uppercase">Email</label>
          <input 
            id="email"
            type="email"
            placeholder="Email del Contacto"
            className="border-2 w-full p-2 mt-2 placeholder-indigo-200 rounded-md"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </div>
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 font-bold uppercase">Fecha de Alta</label>
          <input 
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-indigo-200 rounded-md"
            value={ fecha }
            onChange={ (e) => setFecha(e.target.value) }
          />
        </div>
        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 font-bold uppercase">Síntomas</label>
          <textarea 
            id="sintomas" 
            placeholder="Describe los síntomas presentados"
            className="border-2 w-full p-2 mt-2 placeholder-indigo-200 rounded-md"
            value={ sintomas }
            onChange={ (e) => setSintomas(e.target.value) }
          />
        </div>
        <input 
          type="submit"
          value={ paciente.id ? "Editar Paciente" : "Agregar Paciente" }
          className="p-3 bg-indigo-600 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer w-full rounded-md transition-all" 
        />
        { error && <Error ><p>¡Todos los campos son obligatorios!</p></Error>}
      </form>
    </div>
  )
}

export default Formulario