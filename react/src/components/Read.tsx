import React, { useEffect, useState } from 'react';
import './components.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UpdateComponent from './Update';


const Read: React.FC = () => {
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
  interface ClinicalRecord {
    id: number;
    ClinicDate: string;
    NatureOfAilment: string;
    MedicinePrescribed: string;
    ProcUnd: string;
    DateOfApp: string;
  }
  const [clinicalRecords, setClinicalRecords] = useState<ClinicalRecord[]>([]);
    const [selectedRecordId, setSelectedRecordId] = useState(1);
    const [biodata, setBiodata] = useState<Biodata[]>([]); // Provide the type here

  useEffect(() => {
    
    axios
      .get('http://localhost:3001/biodata')
      .then((response) => {
        console.log(response.data)
        setBiodata(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      axios.get<ClinicalRecord[]>('http://localhost:3001/clinical-rec')
      .then(response => {
        setClinicalRecords(response.data);
      })
      .catch(error => {
        console.error(error);
        // Handle error or display an error message to the user
      });
  }, []);

  return (
    <>
      <div>
        <ul className="NavBar">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Read">Patients</Link>
          </li>
          <li>
            <Link to="/">Delete Patient</Link>
          </li>
        </ul>
      </div>

      <div>
        <h2>Read Patient Records</h2>
        <h3>Patient Biodata</h3>
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
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
  {biodata.map(item => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.firstName}</td>
      <td>{item.middleName}</td>
      <td>{item.lastName}</td>
      <td>{item.HomeAddress}</td>
      <td>{item.DateOfBirth.substring(0,10)}</td>
      <td>{item.DateOfRegistration.substring(0,10)}</td>
      <td>{item.MatriculationNumber}</td>
      <td><button ><Link to={`/UpdateBiodata/${item.id}`}>Edit</Link></button></td>
      <td><button ><Link to={`/DeleteBiodata/${item.id}`}>Delete</Link></button></td>
    </tr>
  ))}
</tbody>
 </table>

 <h3 >Clinical Records</h3>
      <table className="tablesettings">
        <thead>
          <tr>
            <th>Clinic Date</th>
            <th>Nature of Ailment</th>
            <th>Medicine Prescribed</th>
            <th>Procedure Undertaken</th>
            <th>Date of Next Appointment</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {clinicalRecords.map((record: ClinicalRecord) => (
            <tr key={record.id}>
              <td>{record.ClinicDate.substring(0, 10)}</td>
              <td>{record.NatureOfAilment}</td>
              <td>{record.MedicinePrescribed}</td>
              <td>{record.ProcUnd}</td>
              <td>{record.DateOfApp.substring(0, 10)}</td>
              <td>
                <button><Link to= {`/UpdateClinicRec/${record.id}`}>Update</Link></button>
              </td>
              <td>
                <button><Link to= {`/DeleteClinicRec/${record.id}`}>Delete</Link></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
 </div>
    </>
)
  }    
export default Read;
