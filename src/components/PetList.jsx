// src/components/PetList.jsx

const PetList = (props) => {
    // return <h1>Pet List</h1>
  const pets = props.petList.map((pet) => {
    return (
       
         <a key= {pet._id} onClick={() => props.updateSelected(pet)}>
 <li> {pet.name}</li>
         </a>
           
       
        
      
        
    )
  })
  return (
    <div>
<h1> Pet List </h1>
{!props.petList.length ? <h2>No pets Yet!</h2>: <ul>{pets}</ul>}
 {/* <ul>{pets}</ul> */}
 <button onClick={props.handleFormView}>
    {props.isFormOpen ? "Close Form" : "New Pet"}
 </button>
    </div>
    
  )
};

export default PetList;