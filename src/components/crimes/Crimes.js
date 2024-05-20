import React, { useContext, useRef, useState, useEffect} from 'react';
import { AuthContext } from '../../auth/AuthContext';
import NoAuthorized from '../ui/NoAuthorized';
import '../../index.css';
import Create from './Create';
import jsPDF from 'jspdf';
import { messages } from '../../utils/messages';
import { eliminar } from '../../services/private/DelitoService';
import { obtenerTodos } from '../../services/public/DelitoService';
import Swal from 'sweetalert2';

export default function Crimes() {

    const { isAdmin } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const table = useRef();
    const [crimenes, setCrimenes] = useState([]);

    const print = () => {
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.fromHTML(table.current);
        pdf.save("pdf");
    }



    const eliminarCrimen = id => {
            setLoading(true);
            eliminar(id)
            .then(r => {
                console.log(r);
                const crim = crimenes.filter(c => c.id !== id)
                setCrimenes(crim)
                setLoading(false);
                return Swal.fire('OK', messages.REG_EXITOSO, 'success');
            })
            .catch(e => {
                setLoading(false);
                console.log(e);
                return Swal.fire('Error', messages.ERROR_REGISTRO_CASO, 'error');
            });   
      };

    useEffect(() => {
      async function cargarCrimenes () {
        const response = await obtenerTodos();
        const body = await response.data;
        setCrimenes(body);
      }
      cargarCrimenes();
    }, [])
    

    return (
        <>
        {isAdmin &&
        (<div className="container" ref={table}>
            <div className="table-responsive mb-5" >
                <table className="table" >
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>

                    {
                        crimenes && crimenes.map((c, index) => 
                        
                        <tr key={c.id+1} value={c.id} className="table-active">
                            <th scope="row">{index}</th>
                            <td>{c.nombre}</td>
                            <td>{c.descripcion}</td>
                            <td>
                                <button 
                                    className="btn btn-outline-primary"
                                    title="Editar"
                                >
                                    <i className="fa fa-edit"></i>
                                </button>
                                <button 
                                    onClick={() => eliminarCrimen(c.id)}
                                    disabled={loading ? 1: 0}
                                    className="btn btn-outline-danger"
                                    title="Eliminar este"
                                >
                                    {loading && (
                                        <span 
                                        className="spinner-border spinner-border-sm" 
                                        role="status" 
                                        aria-hidden="true"
                                        >
                                        </span>
                                    )}
                                    <i className="fa fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>

                        )
                    }
                    
                    
                </tbody>
                </table>
            </div>
            <button 
                data-bs-toggle="modal" 
                href="#exampleModalToggle"
                className="btn btn-outline-success"
                title="Agregar nuevo"
                >
                    <i className="fas fa-plus-circle"></i>
            </button>

            <button 
                className="btn btn-outline-primary"
                title="Imprimir PDF"
                onClick={print}
            >
                <i className="fas fa-print"></i>
            </button>
        </div>)
        }
        {
          !isAdmin && (
              <NoAuthorized />
          )  
        }
        <Create />
        </>
    )
}
