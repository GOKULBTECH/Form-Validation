import React, { useState } from "react";
import axios from "axios";
import "./form.css"

function Form() {
  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    email: "",
    phoneNumber: "",
    department: "",
    dateOfJoining: "",
    role: "",
  });

  const [error, setErrors] = useState({});

  const onchange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validate({ ...form, [name]: value });  
  };

  const validate = (data) => {
    let tempErrors = {};
    if (!data.name) {
      tempErrors.name = "Name is required.";
    }
    if (!data.employeeId || data.employeeId.length > 10) {
      tempErrors.employeeId = "Valid Employee ID is required.";
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      tempErrors.email = "Valid Email is required.";
    }
    if (!/^\d{10}$/.test(data.phoneNumber)) {
      tempErrors.phoneNumber = "Valid 10-digit phone number is required.";
    }
    if (!data.department) {
      tempErrors.department = "Department is required.";
    }
    if (!data.dateOfJoining || new Date(data.dateOfJoining) > new Date()) {
      tempErrors.dateOfJoining = "Valid date is required.";
    }
    if (!data.role) {
      tempErrors.role = "Role is required.";
    }

    setErrors(tempErrors);
  };

  const onsubmithandler = async (e) => {
    e.preventDefault();
    if (Object.keys(error).length > 0) return;  

    try {
      const res = await axios.post("http://localhost:5000/employee", form);
      alert(res.data.message);
      setForm({
        name: "",
        employeeId: "",
        email: "",
        phoneNumber: "",
        department: "",
        dateOfJoining: "",
        role: "",
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Submission failed!";
      alert(errorMessage);
    }
  };

  return (
    <div className="form">
      <h1 className="text-bold text-white">Give your Details</h1>
      <form onSubmit={onsubmithandler}>
        <input
          name="name"
          value={form.name}
          onChange={onchange}
          placeholder="Name"
        />
        {error.name && <p className="error">{error.name}</p>}

        <input
          name="employeeId"
          value={form.employeeId}
          onChange={onchange}
          placeholder="Employee ID"
        />
        {error.employeeId && <p className="error">{error.employeeId}</p>}

        <input
          name="email"
          value={form.email}
          onChange={onchange}
          placeholder="Email"
        />
        {error.email && <p className="error">{error.email}</p>}

        <input
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={onchange}
          placeholder="Phone Number"
        />
        {error.phoneNumber && <p className="error">{error.phoneNumber}</p>}

        <select
          name="department"
          value={form.department}
          onChange={onchange}
        >
          <option value="">Select Department</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="CSBS">CSBS</option>
          <option value="AIDS">AIDS</option>
          <option value="AIML">AIML</option>
          <option value="ECE">ECE</option>
          <option value="CIVIL">CIVIL</option>
          <option value="MECH">MECH</option>
          <option value="ACT">ACT</option>
          <option value="VLSI">VLSI</option>
          <option value="MECHATRO">MECHATRONICS</option>
        </select>
        {error.department && <p className="error">{error.department}</p>}

        <input
          name="dateOfJoining"
          type="date"
          value={form.dateOfJoining}
          onChange={onchange}
        />
        {error.dateOfJoining && <p className="error">{error.dateOfJoining}</p>}

        <input
          name="role"
          value={form.role}
          onChange={onchange}
          placeholder="Role"
        />
        {error.role && <p className="error">{error.role}</p>}

        <button type="submit" disabled={Object.keys(error).length > 0}>
          Submit
        </button>
        <button type="reset" onClick={() => setForm({})}>Reset</button>
      </form>
    </div>
  );
}

export default Form;