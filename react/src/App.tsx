import React, { Component, useEffect, useState } from 'react';
import Button from './components/buttonmachine';
import HomePage from './components/HomePage';
import axios from 'axios'
import CreatePatientForm from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Read from './components/Read';
import UpdateComponent from './components/Update';
import UpdateClinicRec from './components/UpdateClinicRec';
import DeleteData from './components/delete';
import DeleteClinic from './components/deleteClinic';


function App(){
 return (
           <BrowserRouter>
           <Routes>
           <Route path="/" element={<HomePage/>} />
           <Route path="/Read" element={<Read />} />
            <Route path={`/UpdateBiodata/:id`} element={<UpdateComponent/>} />
            <Route path={`/Update/ClinicRec/:id`} element={<UpdateClinicRec/>} />
            <Route path={`/DeleteBiodata/:id`} element={<DeleteData/>} />
            <Route path={`/DeleteClinicRec/:id`} element={<DeleteClinic/>} />

           </Routes>
           
           
           </BrowserRouter>
 );
}
export default App;