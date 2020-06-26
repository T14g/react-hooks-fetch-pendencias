import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './addPendencia.styles.scss'

const AddPendencia = ({history}) => {


    const [ pendenciaState, setPendenciaState ] = useState({setores: [], areas:[],filteredAreas : [] ,setorSelect: 1, areaSelect: null ,numero: null, responsavel: null, descricao: null});
    const { numero, responsavel, descricao, setores, areaSelect, setorSelect, filteredAreas , areas } = pendenciaState;

    useEffect(() => {
        getFields();
    },[]);
    

    const getFields = async () => {


        const response = await fetch(
            'http://localhost/marlan-apis/services/searchFields.php', {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST'
        });
        
        const json =  await response.json();
        const { setores, areas } = json;
        console.log(setores);
        //Default na primeira
        const filteredAreas = areas.filter(a => a.setorId == 1);
        const firstArea = filteredAreas[0]['id'];
        setPendenciaState({...pendenciaState, setores: setores, areas: areas, areaSelect: firstArea, filteredAreas: filteredAreas })
    }


    const salvarPendencia = async () => {
        const response = await fetch(
            'http://localhost/marlan-apis/services/salvarPendencia.php', {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify({
                area : areaSelect,
                numero: numero,
                descricao: descricao,
                responsavel: responsavel
            })
        });

        history.goBack();

  

    }

    return(
        <div className="viewPendencia">
            <table className="table table-bordered table-viewPendencia">

                <thead>
                      <tr className="section-top">
                          <th>Setor</th>
                          <th>Área</th>
                      </tr>
                  </thead>
                  <tbody>
                        <tr>
                            <td>
                            <select className="form-control" onChange={(e) => setPendenciaState({
                            ...pendenciaState,
                                filteredAreas : areas.filter(a => a.setorId === e.target.value),
                                areaSelect: areas.filter(a => a.setorId === e.target.value)[0]['id']
                            })}
                            >
                            {setores.map(({id, setor})=> <option key={id} value={id}>{setor}</option>)}
                        </select>
                            </td>
                            <td>
                            <select className="form-control" onChange={(e) => setPendenciaState({...pendenciaState, areaSelect: e.target.value})}>
                                {filteredAreas.map(({id, area})=> <option key={id} value={id}>{area}</option>)}
                            </select>
                           </td>
                        </tr>        
                  </tbody>
             
                  <thead>
                      <tr className="section-top">
                          <th>Número</th>
                          <th>Reponsável</th>
                      </tr>
                  </thead>
                  <tbody>
                        <tr>
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
                        </tr>        
                  </tbody>
           
                  <thead>
                      <tr>
                          <th colSpan="2">Descrição</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                        <td colSpan="2">
                        <textarea className="form-control" rows="5" 
                        value={descricao}
                        onChange={(e) => setPendenciaState({...pendenciaState, descricao: e.target.value})}
                        ></textarea>
                        </td>      
                      </tr>
                  </tbody>
            </table>

            <Link to="/" className="btn btn-danger btn-voltar">Voltar</Link>
            <button className="btn btn-success ml-2" 
            onClick={salvarPendencia}>
            Salvar</button>
        </div>
        )
    }

export default AddPendencia;