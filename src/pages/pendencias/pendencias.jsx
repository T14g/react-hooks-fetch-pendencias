import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SearchPendencias from '../../components/searchPendencias/searchPendencias';
import ViewPendencia from '../../components/viewPendencia/viewPendencia.component';

const PendenciasPage = () =>{
    return (
    <Switch>
      <Route exact path='/' component={SearchPendencias} />
      <Route  path='/view/:pendenciaID' component={ViewPendencia} />
    </Switch>
    )
};

export default PendenciasPage;