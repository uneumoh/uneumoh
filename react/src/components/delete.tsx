import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const DeleteData = () =>{

    interface Biodata {
        id: number;
        firstName: string;
        middleName: string;
        lastName: string;
        HomeAddress: string;
        DateOfBirth: string;
        DateOfRegistration: string;
        MatriculationNumber: string;
      }
      const [biodata, setBiodata] = useState<Biodata | null>(null);
      const [newbiodata, newsetBiodata] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        HomeAddress: '',
        DateOfBirth: '',
        DateOfRegistration: '',
        MatriculationNumber: '',
        
        });

        const RouterParams = useParams();

        useEffect(() => {
            axios
              .get<Biodata>(`http://localhost:3001/Biodata/${RouterParams.id}`)
              .then((response) => {
                setBiodata(response.data);
                console.log(biodata);
              })
              .catch((error) => {
                console.error(error);
              });
          }, []);

          const deleteIt = () =>{
            axios
            .delete(`http://localhost:3001/Biodata/${RouterParams.id}`)
            .then(() =>{
            alert("Succesfully Deleted");
            })
            .catch((error) =>{
                console.error(error);
            });
            };


    return(
        <>
    <div >
    <ul className="NavBar">
    <li><a><Link to="/">Home</Link></a></li>
    <li><a><Link to="/Read">Patients</Link></a></li>

    </ul>
    </div>


    <table className="tablesettings">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Home Address</th>
            <th>Date of Birth</th>
            <th>Date of Registration</th>
            <th>Matriculation Number</th>
          </tr>
        </thead>
        <tbody>
          {biodata ? (
            <tr>
              <td>{biodata.id}</td>
              <td>{biodata.firstName}</td>
              <td>{biodata.middleName}</td>
              <td>{biodata.lastName}</td>
              <td>{biodata.HomeAddress}</td>
              <td>{biodata.DateOfBirth.substring(0, 10)}</td>
              <td>{biodata.DateOfRegistration.substring(0, 10)}</td>
              <td>{biodata.MatriculationNumber}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan={9}>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>

      <h1>Delete Patient?</h1>
      <button onClick={deleteIt}><Link to={`/Read`}>Delete</Link></button>
    </>
        )
    
}
export default DeleteData;