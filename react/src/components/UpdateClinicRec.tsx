import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import Read from './Read';
import { Link } from 'react-router-dom';
import './components.css';
import { useParams } from 'react-router-dom';


const UpdateClinicRec = () =>{
    
    interface ClinicalRecord {
        id: number;
        Clinic_date: string;
        NatureOfAilment: string;
        MedicinePrescribed: string;
        Procedure_undertaken: string;
        dateOfnextAppointment: string;
    }
      const [clinicrec, setClinicrec] = useState<ClinicalRecord | null>(null);
    
    const [newclinicrec, newsetclinicrec] = useState({
        ClinicDate: '',
        NatureOfAilment: '',
        MedicinePres: '',
        ProcUnd: '',
        DateOfApp: '',
    
    });
    
    const RouterParams = useParams();
     
    const check = () =>{
      console.log(RouterParams);
      console.log(RouterParams.id)
    }
    
    
    useEffect(() => {
      axios
        .get<ClinicalRecord>(`http://localhost:3001/clinical-rec/${RouterParams.id}`)
        .then((response) => {
          setClinicrec(response.data);
          console.log(clinicrec);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
    
    
    
      const handleSubmit = () => {
        try{
        axios
        .put(`http://localhost:3001/clinic-rec/${RouterParams.id}`, newclinicrec);
          alert("edited succesfully");
         } catch (error) {
        alert(error);
      };
        
      };
      return (
        <div>
          <div >
    <ul className="NavBar">
    <li><a><Link to="/">Home</Link></a></li>
    <li><a><Link to="/Read">Patients</Link></a></li>
    <li><a><Link to="/">Delete Patient</Link></a></li>
    </ul>
    </div>
          <table className="tablesettings">
          <thead>
          <tr>
            <th>Clinic Date</th>
            <th>Nature of Ailment</th>
            <th>Medicine Prescribed</th>
            <th>Procedure Undertaken</th>
            <th>Date of Next Appointment</th>
            <th>Actions</th>
          </tr>
        </thead>
            <tbody>
              {clinicrec ? (
                <tr>
                  <td>{clinicrec.id}</td>
                  <td>{clinicrec.Clinic_date}</td>
                  <td>{clinicrec.NatureOfAilment}</td>
                  <td>{clinicrec.MedicinePrescribed}</td>
                  <td>{clinicrec.Procedure_undertaken}</td>
                  <td>{clinicrec.dateOfnextAppointment.substring(0, 10)}</td>
          
                </tr>
              ) : (
                <tr>
                  <td colSpan={9}>Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
    
    <form onSubmit={handleSubmit}>
              <br />
              <h3>Update Patient</h3>
              <input
    type="date"
    required
    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
    placeholder="Clinic Date"
    value={newclinicrec.ClinicDate}
    onChange={(event) => newsetclinicrec({ ...newclinicrec, ClinicDate: event.target.value })}
  />
  <br />
  <input
    type="text"
    placeholder="Nature of Ailment"
    required
    value={newclinicrec.NatureOfAilment}
    onChange={(event) => newsetclinicrec({ ...newclinicrec, NatureOfAilment: event.target.value })}
  />
  <br />
  <input
    type="text"
    placeholder="Medicine Prescribed"
    required
    value={newclinicrec.MedicinePres}
    onChange={(event) => newsetclinicrec({ ...newclinicrec, MedicinePres: event.target.value })}
  />
  <br />
  <input
    type="text"
    placeholder="Procedure Undertaken"
    required
    value={newclinicrec.ProcUnd}
    onChange={(event) => newsetclinicrec({ ...newclinicrec, ProcUnd: event.target.value })}
  />
  <br />
  <input
    type="date"
    required
    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
    placeholder="Date of Next Appointment"
    value={newclinicrec.DateOfApp}
    onChange={(event) => newsetclinicrec({ ...newclinicrec, DateOfApp: event.target.value })}
  />
  <br />
  <button type="submit">Submit</button>
</form>

     
    
      </div>
      )
    };

export default UpdateClinicRec;