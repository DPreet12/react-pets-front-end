// src/App.jsx
import { useState, useEffect } from "react";
import * as petService from "./services/petService";
import PetList from "./components/PetList";
import PetDetails from "./components/PetDetails";
import PetForm from "./components/PetForm";

const App = () => {
   const [ petList, setPetList] = useState([]);
   const [ selected, setSelected ] = useState(null);
   const [ isFormOpen, setIsFormOpen ] = useState(false);

   console.log("selected", selected)
   useEffect(() => {
    const fetchPets = async() => {
      
      try {
        const pets = await petService.index();

      if( pets.error) {
        throw new Error(pets.error);
      }
      setPetList(pets);
      } catch (error) {
        console.log("error", error)
      }
    } ;
    fetchPets()
   }, []);

   const updateSelected = (pet) => {
    setSelected(pet)
   };

   const handleFormView = (pet) => {
    if(!pet.name) setSelected(null);
    setIsFormOpen(!isFormOpen);
   };


   const handlePet = async ( formData) => {
    try {
      
      const newPet = await petService.create(formData);

      setPetList([newPet, ...petList]);
      setIsFormOpen(false);
    } catch (error) {
      console.log("error", error);
    }
   };

   const handleUpdatePet = async( formData, petId) => {
    try {
      
      const updatedPet = await petService.update(formData, petId);

      if (updatedPet.error) {
        throw new Error(updatedPet.error);
      }
      
      const newPetList = petList.map((pet) => {
        return pet._id === updatedPet._id ? updatedPet : pet
        
      }) 
setPetList(newPetList)
      setIsFormOpen(false);
      setSelected(updatedPet)
    } catch (error) {
      console.log("error", error);
    }
   };

  //  const handleRemovePet = async(  petId) => {

  //   try {
  //     const deletedPet = await petService.deletePet( petId);
    
  //     // if (deletedPet.error) {
  //     //   throw new Error(deletedPet.error);
  //     // }
  
  //     const newPetList = petList.filter((pet) => {
  //       return pet._id !== petId 
  //     });
  //     setPetList(newPetList)
  //     setSelected(null);
  //     setIsFormOpen(false);
  //   } catch (error) {
  //     console.log("error", error)
  //   }
   
  // }

  const handleRemovePet = async (petId) => {
    console.log("Deleting pet with ID:", petId); // Debugging line
    try {
        await petService.deletePet(petId); // Call deletePet

        const newPetList = petList.filter((pet) => pet._id !== petId); // Filter out deleted pet
        setPetList(newPetList); // Update state
        setSelected(null);
        setIsFormOpen(false);
    } catch (error) {
        console.log("Error deleting pet:", error); // Log any error
    }
};

  // const handleRemovePet = async (petId) => {
//     console.log("Deleting pet with ID:", petId); // Add this line
//     try {
//         await petService.deletePet(petId);
//         const newPetList = petList.filter((pet) => pet._id !== petId);
//         setPetList(newPetList);
//         setSelected(null);
//         setIsFormOpen(false);
//     } catch (error) {
//         console.log("error", error);
//     }
// };

  return  (
    <>
     < PetList petList= {petList} 
     updateSelected= {updateSelected} 
     handleFormView={handleFormView} 
      isFormOpen={isFormOpen}/>

     {isFormOpen ? ( 
      < PetForm handlePet={handlePet} 
      selected={selected}
       handleUpdatePet= {handleUpdatePet}
       /> 
       ) : ( <PetDetails 
       selected={selected}
        handleFormView= {handleFormView} 
        handleRemovePet={handleRemovePet}
        />)}
     
    </>
 
)
};

export default App;