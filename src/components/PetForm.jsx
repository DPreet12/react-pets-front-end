// src/components/PetForm.jsx

import { useState } from "react";

const PetForm = (props) => {

    const intialState = {
        name: "",
        age: "",
        breed: "",
    }

    const [ formData, setFormData ] = useState(props.selected ? props.selected : intialState)
 
    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();

        if( props.selected) {
            props.handleUpdatePet(formData, props.selected._id);
        } else {
            props.handlePet(formData);
        }
        
        // setFormData({name: "", age: "", breed: ""})
    };

    return (
        <div>
            <form onSubmit={handleSubmitForm}>
                <label htmlFor="name"> Name: </label>
                <input type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange} 
                required/>
                <label htmlFor="age"> Age: </label>
                <input type="text"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                />
                <label htmlFor="breed"> Breed: </label>
                <input type="text"
                 id="breed"
                 name="breed"
                 value={formData.breed}
                 onChange={handleChange}
                 />
                 <button type="submit">{props.selected ? "Update Pet" : "Add New Pet"}</button>
            </form>
        </div>
    )
};

export default PetForm;