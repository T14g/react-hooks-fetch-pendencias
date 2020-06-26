import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './searchPendencias.scss';

const SearchPendencias = () => {

    const [ searchData, setSearchData ] = useState({setorSelect: null, areaSelect: null, setores: [], areas:[], pendencias: [], filteredAreas: []});
    const { setores, filteredAreas, areas, pendencias, areaSelect } = searchData;
  
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

        //Default na primeira
        const filteredAreas = areas.filter(a => a.setorId == 1);
        const firstArea = filteredAreas[0]['id'];
        setSearchData({...searchData, setores: setores, areas: areas,areaSelect: firstArea ,filteredAreas: filteredAreas, pendencias : []})
    }

    const getPendencias = async (a) => {

        const response = await fetch(
            'http://localhost/marlan-apis/services/pendencias.php', {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify({area: a})
        });

        const ps = await response.json();

        console.log(ps);
        setSearchData({...searchData, pendencias: ps});
    }

    return (
        <div className="searchPendencias">
            <div className="row-filters">
                <div className="row fix-row">
                    <div className="col-md-4">
                    <select className="form-control" onChange={(e) => setSearchData({
                            ...searchData,
                            pendencias: [],
                            filteredAreas : areas.filter(a => a.setorId === e.target.value),
                            areaSelect: areas.filter(a => a.setorId === e.target.value)[0]['id']
                        })}
                        >
                        {setores.map(({id, setor})=> <option key={id} value={id}>{setor}</option>)}
                    </select>
                    </div>

                    <div className="col-md-5">
                        <select className="form-control" onChange={(e) => setSearchData({...searchData, areaSelect: e.target.value})}>
                        {filteredAreas.map(({id, area})=> <option key={id} value={id}>{area}</option>)}
                    </select>
                    </div>

                    <div className="col-md-3 col-buttons">
                        <button className="btn btn-success btn-search" onClick={()=> getPendencias(areaSelect)}>Buscar</button> 
                        <Link to="add/" className="btn btn-warning btn-add">Adicionar</Link>
                    </div>
                </div>
            </div>

            <div className="row fix-row">
                <div className="col-md-12">
                    <table className="table table-bordered table-pendencias">
                        <thead>
                            <tr>
                            <th>Número</th>
                            <th>Reponsável</th>
                            <th style={{width: "70px"}}></th>
                            </tr>
                        </thead>
                    
                        <tbody>
                        {
                            pendencias.length > 0 ? 
                            (pendencias.map(({id, numero, responsavel,descricao}) => {
                            return (
                                <tr key={id}>
                                    <td>{numero}</td>
                                    <td>{responsavel}</td>
                                    <td><Link to={`view/${id}`} className="btn btn-success">Ver</Link></td>
                                </tr>
                            )}))
                            :
                            (<tr><td colSpan="3">Sem pendências</td></tr>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default SearchPendencias;