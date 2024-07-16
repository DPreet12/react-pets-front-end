const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`;

const index = async () => {

    try {
        const res = await fetch(BASE_URL);
    return res.json()
    } catch (error) {
        console.log("error", error)
    }
    
};

const create = async (formData) => {
    try {
        const res = await fetch(BASE_URL, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        return res.json();
    } catch (error) {
        console.log("error", error);
    }
}

const update = async(formData, petId) => {
    try {
        const res = await fetch(`${BASE_URL}/${petId}`, {

            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        });
        return res.json();
    } catch (error) {
        console.log("error", error);
    }
}

// const deletePet = async(formData, petId) => {
//     try {
//         const deletedPet  = await fetch(`${BASE_URL}/${petId}`, {

//             method:"DELETE",
          
//         });

       

//         return deletedPet ;
//     } catch (error) {
//         console.log("error", error)
//     }
// }

const deletePet = async (petId) => {
    try {
        const res = await fetch(`${BASE_URL}/${petId}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            throw new Error(`Failed to delete pet with ID ${petId}`);
        }
        return await res.json(); // Optional: depending on what your backend returns
    } catch (error) {
        console.log("error", error);
        throw error; // Re-throw error for handling in the calling function
    }
};
export { index, create, update, deletePet }; 
// export { create };