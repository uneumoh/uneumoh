import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import Read from './Read';
import { Link } from 'react-router-dom';
import './components.css';
import { useParams } from 'react-router-dom';


const UpdateComponent: React.FC = () =>{
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

const [matricNumber, setMatricNumber] = useState('');
const checkMatricNumber = (event: ChangeEvent<HTMLInputElement>) => {
  const enteredMatricNumber = event.target.value;
  setMatricNumber(enteredMatricNumber);
  if (enteredMatricNumber === '21120612544') 
    newsetBiodata({ ...newbiodata, MatriculationNumber: "true" });
   else 
    newsetBiodata({ ...newbiodata, MatriculationNumber: "false" });
  
};
const RouterParams = useParams();
 
const check = () =>{
  console.log(RouterParams);
  console.log(RouterParams.id)
}


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



  const handleSubmit = () => {
    try{
    axios
    .put(`http://localhost:3001/Biodata/${RouterParams.id}`, newbiodata);
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

<form onSubmit={handleSubmit}>
          <br />
          <h3>Update Patient</h3>
          <input
            type="text"
            placeholder="First name"
            value={newbiodata.firstName}
            onChange={(event) => newsetBiodata({ ...newbiodata, firstName: event.target.value })}
            required
          />
          <br />
          <input
            type="text"
            placeholder="Middle name"
            value={newbiodata.middleName}
            onChange={(event) => newsetBiodata({ ...newbiodata, middleName: event.target.value })}
          />
          <br />
          <input
            type="text"
            placeholder="Last name"
            required
            value={newbiodata.lastName}
            onChange={(event) => newsetBiodata({ ...newbiodata, lastName: event.target.value })}
          />
          <br />
          <input
            type="text"
            placeholder="Address"
            required
            value={newbiodata.HomeAddress}
            onChange={(event) => newsetBiodata({ ...newbiodata, HomeAddress: event.target.value })}
          />
          <br />
          <input
            type="date"
            required
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            placeholder="yyyy-mm-dd"
            value={newbiodata.DateOfBirth}
            onChange={(event) => newsetBiodata({ ...newbiodata, DateOfBirth: event.target.value })}
          />
          <br />
          <input
            type="date"
            required
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            placeholder="yyyy-mm-dd"
            value={newbiodata.DateOfRegistration}
            onChange={(event) => newsetBiodata({ ...newbiodata, DateOfRegistration: event.target.value })}
          />
          <br />
          <input
            type="text"
            placeholder="Matric Number"
            value={matricNumber}
            onChange={checkMatricNumber}
            required
          />
          <br />
          <button type="submit">Submit</button>
        </form>
 

  </div>
  )
};

export default UpdateComponent;
