import dotenv from 'dotenv';
dotenv.config();


const url = `https://api.edamam.com/api/nutrition-details?app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}`;


async function getIngredientsData(array) {
    let data = {"ingr": array};
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(data),
    }).catch((error) => {
        console.error("Error:", error);
    });
    if (response.status != 200) {
        return "error"
    }
    let datos = await response.json();
    return datos;
}

export default getIngredientsData;