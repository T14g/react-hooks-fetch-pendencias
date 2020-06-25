import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './viewPendencia.styles.scss'

const ViewPendencia = ({match : {params : {pendenciaID}}}) => {

    const [ pendenciaState, setPendenciaState ] = useState({pendencia: {}, editando: false, numero: null, responsavel: null, descricao: null});
    const { editando ,numero, responsavel, descricao } = pendenciaState;

    useEffect(() => {
        getPendencia();
    },[]);

    const getPendencia = async () => {
        const response = await fetch(
            'http://localhost/marlan-apis/services/pendencia.php', {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify({id: pendenciaID})
        });

        const p = await response.json();
        const { numero, responsavel, descricao } = p;
        setPendenciaState({...pendenciaState ,numero : numero, responsavel: responsavel , descricao: descricao});
    }

    const atualizarPendencia = async () => {
        const response = await fetch(
            'http://localhost/marlan-apis/services/updatePendencia.php', {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify({
                id: pendenciaID,
                numero: numero,
                descricao: descricao,
                responsavel: responsavel
            })
        });
        setPendenciaState({...pendenciaState ,editando: false});
    }



    return(
        <div className="viewPendencia">
            <table className="table table-bordered table-viewPendencia">
             
                  <thead>
                      <tr className="section-top">
                          <th>Número</th>
                          <th>Reponsável</th>
                      </tr>
                  </thead>
                  <tbody>
                        { editando ? 
                            (<tr>
                            <td>
                            <input 
                            value={numero} type="text" 
                            className="form-control" 
                            onChange={(e) => setPendenciaState({...pendenciaState, numero: e.target.value})}
                            /></td>
                            <td>
                            <input 
                            value={responsavel} type="text" 
                            className="form-control"
                            onChange={(e) => setPendenciaState({...pendenciaState, responsavel: e.target.value})}
                            /></td>
                            </tr>) 
                            : (<tr><td>{numero}</td><td>{responsavel}</td></tr>)
                        }
                  </tbody>
           
                  <thead>
                      <tr>
                          <th colSpan="2">Descrição</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          
                            { editando ?  
                                (
                                <td colSpan="2">
                                <textarea className="form-control" rows="5" 
                                value={descricao}
                                onChange={(e) => setPendenciaState({...pendenciaState, descricao: e.target.value})}
                                ></textarea>
                                </td>
                                )  
                                :
                                (<td colSpan="2">{descricao}</td> ) 
                            }
                          
                      </tr>
                  </tbody>
            </table>

            <Link to="/" className="btn btn-danger btn-voltar">Voltar</Link>

            {
                editando ?
                <button className="btn btn-success ml-2" 
                onClick={atualizarPendencia}>
                Salvar</button>
                :
                <button className="btn btn-info ml-2" 
                onClick={()=>setPendenciaState({...pendenciaState, editando: true})}>
                Editar</button>
            }
            

        </div>
        )
    }
export default ViewPendencia;