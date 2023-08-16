import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DeleteClinic = () =>{
    interface ClinicalRecord {
        id: number;
        ClinicDate: string;
        NatureOfAilment: string;
        MedicinePrescribed: string;
        ProcUnd: string;
        DateOfApp: string;
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
    
      const deleteIt = () =>{
        axios
        .delete(`http://localhost:3001/clinical-rec/${RouterParams.id}`)
        .then(() =>{
        alert("Succesfully Deleted");
        })
        .catch((error) =>{
            console.error(error);
        });
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
                  <td>{clinicrec.ClinicDate.substring(0, 10)}</td>
                  <td>{clinicrec.NatureOfAilment}</td>
                  <td>{clinicrec.MedicinePrescribed}</td>
                  <td>{clinicrec.ProcUnd}</td>
                  <td>{clinicrec.DateOfApp.substring(0, 10)}</td>
          
                </tr>
              ) : (
                <tr>
                  <td colSpan={9}>Loading...</td>
                </tr>
              )}
            </tbody>
          </table>

      <h1>Delete Record?</h1>
      <button onClick={deleteIt}><Link to={`/Read`}>Delete</Link></button>
    </div>
        )
    
}
export default DeleteClinic;