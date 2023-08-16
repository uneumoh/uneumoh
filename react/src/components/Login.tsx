import React, { ChangeEvent, useState } from "react";
import './components.css';
import axios from "axios";

const CreatePatientForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    HomeAddress: '',
    DateOfBirth: '',
    DateOfRegistration: '',
    MatriculationNumber: '',
  });

  const [formData2, setFormData2] = useState({
    ClinicDate: '',
    NatureOfAilment: '',
    MedicinePrescribed: '',
    ProcUnd: '',
    DateOfApp: '',
  });

  const [matricNumber, setMatricNumber] = useState('');

  const checkMatricNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const enteredMatricNumber = event.target.value;
    setMatricNumber(enteredMatricNumber);
    if (enteredMatricNumber === '21120612544') 
      setFormData({ ...formData, MatriculationNumber: "true" });
     else 
      setFormData({ ...formData, MatriculationNumber: "false" });
    
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:3001/BioData', formData);
      alert("Patient Created");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit2 = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:3001/clinical-rec', formData2);
      alert("Clinical Record Created");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="formdiv">
        <h1>Welcome to Toothfixers</h1>
        <form onSubmit={handleSubmit}>
          <br />
          <h3>Create New Patient</h3>
          <input
            type="text"
            id="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={(event) => setFormData({ ...formData, firstName: event.target.value })}
            required
          />
          <br />
          <input
            type="text"
            id="middleName"
            placeholder="Middle name"
            value={formData.middleName}
            onChange={(event) => setFormData({ ...formData, middleName: event.target.value })}
          />
          <br />
          <input
            type="text"
            placeholder="Last name"
            required
            value={formData.lastName}
            onChange={(event) => setFormData({ ...formData, lastName: event.target.value })}
          />
          <br />
          <input
            type="text"
            placeholder="Address"
            required
            value={formData.HomeAddress}
            onChange={(event) => setFormData({ ...formData, HomeAddress: event.target.value })}
          />
          <br />
          <input
            type="date"
            required
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            placeholder="yyyy-mm-dd"
            value={formData.DateOfBirth}
            onChange={(event) => setFormData({ ...formData, DateOfBirth: event.target.value })}
          />
          <br />
          <input
            type="date"
            required
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            placeholder="yyyy-mm-dd"
            value={formData.DateOfRegistration}
            onChange={(event) => setFormData({ ...formData, DateOfRegistration: event.target.value })}
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

        <form onSubmit={handleSubmit2}>
  <br />
  <h3>Create New Clinical Record</h3>
  <input
    type="date"
    required
    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
    placeholder="Clinic Date"
    value={formData2.ClinicDate}
    onChange={(event) => setFormData2({ ...formData2, ClinicDate: event.target.value })}
  />
  <br />
  <input
    type="text"
    placeholder="Nature of Ailment"
    required
    value={formData2.NatureOfAilment}
    onChange={(event) => setFormData2({ ...formData2, NatureOfAilment: event.target.value })}
  />
  <br />
  <input
    type="text"
    placeholder="Medicine Prescribed"
    required
    value={formData2.MedicinePrescribed}
    onChange={(event) => setFormData2({ ...formData2, MedicinePrescribed: event.target.value })}
  />
  <br />
  <input
    type="text"
    placeholder="Procedure Undertaken"
    required
    value={formData2.ProcUnd}
    onChange={(event) => setFormData2({ ...formData2, ProcUnd: event.target.value })}
  />
  <br />
  <input
    type="date"
    required
    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
    placeholder="Date of Next Appointment"
    value={formData2.DateOfApp}
    onChange={(event) => setFormData2({ ...formData2, DateOfApp: event.target.value })}
  />
  <br />
  <button type="submit">Submit</button>
</form>

      </div>
    </>
  );
};

export default CreatePatientForm;
