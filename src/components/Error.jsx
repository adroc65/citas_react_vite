// Usando Children es otra forma de recibir los PROFS
const Error = ({children}) => {
  return (
    <div className="bg-red-800 text-white font-bold uppercase rounded-lg shadow-lg text-center py-3 mt-5">
        {children}
    </div>
  )
}

export default Error