import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';

export function Form({data, setData,baseURL,getData}) {

    const payload = {
        name: "",
        age: "",
        address: "",
      department: "",
        salary:"",
        maritalStatus: false,
        image: "",
        id: nanoid(3)
    }
    const [text, setText] = useState(payload);


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        axios.post(baseURL, text).then(() => {
            getData();
        setText("");
        
        });
        

    }

    const handleChange = (e) => {

        const { name,value,checked,type} = e.target;
        
        setText({
            ...text,
            [name]: type === "checkbox" ? checked : value,
        });

    }
    
    return (
      <form onSubmit={handleSubmit}>
        <input name="name" onChange={handleChange} type="text" placeholder="Enter Name" />
        <input name="age" onChange={handleChange} type="number" placeholder="Enter Age" />
            <input
                name="address"
          onChange={handleChange}
          type="Address"
          placeholder="Enter Address"
        />
        <input type="number" placeholder="Enter Salary" name="salary"/>
        <label>
          Department:
          <select onChange={handleChange} name="department">
            <option hidden></option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </label>
        <label>
          Marital Status:
          <input onChange={handleChange} type="checkbox" name="maritalStatus" />
        </label>
        <input onChange={handleChange} name="image" type="file" placeholder="Select File" />
        <input type="submit" />
      </form>
    );

}