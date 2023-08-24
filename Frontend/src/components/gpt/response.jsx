//React
import { useState, useContext } from "react";
//Context
import UserContext from "../../context/userContext";
import IsDataContext from "../../context/isData";

// Diccionario de condiciones
import conditDict from "../user/conditDict";

const GptForm = () => {
    const { user, setUser } = useContext(UserContext); 
    const {isData, setIsData} = useContext(IsDataContext);
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getMessage = async (e) => {
        e.preventDefault();
        // Setters
        setResponse("");
        setError("");
        // Get from local storage
        const formattedData = JSON.parse(localStorage.getItem("formattedData"));
        if (formattedData) {
            // Get from local storage
            const now = new Date();
            const ingList = await JSON.parse(localStorage.getItem("ingList"));
            const ingListMessage = await ingList.map((ing) => `${ing.cantidad}${ing.unidad} de ${ing.ingrediente}`);
            const currentTime = now.toLocaleTimeString()
            //
            //  get name (age, gender, weight, food preference and height) 
            const usuario = user
            let name = usuario.displayName
            
            let userData = {}
            try {
                const response = await fetch("http://localhost:3006/user/get", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: usuario.email})   
                });
                if (!response.ok) {
                    console.log(response);
                    if (response.status === 404) {
                        setError("No hay datos de tu usuario.")
                        return
                    }
                }else{
                    userData = await response.json();
                }
            } catch (error) {
                console.log("error en getUser", error);
                return
            }
            // Data extract
            const height = userData.height;
            const weight = userData.weight;
            const birthday = userData.birthday;
            let sex = userData.sex;
            let foodPreference = userData.foodPreference;
            const condition = userData.condition;
            // Conditionals in data
            if(sex =="M"){sex = "un hombre"}else if(sex == "H"){sex = "una mujer"}else{sex = null}
            if(foodPreference == "Vege"){foodPreference = "vegetariano"}else if(foodPreference =="Vega"){foodPreference = "vegano"}else{foodPreference = null}

            // User data messages
            const sexMessage = sex ? `, soy ${sex}` : "";
            const ageMessage = birthday ? `, tengo ${now.getFullYear() - birthday.split("-")[0]} años`: "";
            const heightMessage = height ? `, mido ${height / 100}m` : "";
            const weightMessage = weight ? `, peso ${weight}Kg` : "";
            const foodPreferenceMessage = foodPreference ? `, soy ${foodPreference}` : "";
            let conditionMessage = condition ? condition.map((con) => ` ${conditDict[con]},`) : "";
            if (conditionMessage){
                conditionMessage = conditionMessage.join("");
                conditionMessage = ` y tengo las siguientes condiciones medicas:${conditionMessage}.`
            }

            // Message
            let message = `Hola, me llamo ${name}${sexMessage}${ageMessage}${heightMessage}${weightMessage}${foodPreferenceMessage}${conditionMessage}. 
Son las (${currentTime}), ten en cuenta que depende de la hora, puede que me quede alguna comida mas por hacer tanto la comida como la cena.
He comido los siguientes ingredientes: 
--- ${ingListMessage.join(", ")} --- 
los cuales tienen los siguientes valores nutricionales:
--- ${formattedData.join(", ")} ---.
Respondeme diciendome que te parece la ingesta de hoy, si deberia controlar algo de la misma  y recomendaciones para mejorarla dados mis datos personales con el siguiente formato:
___
¿Que te parece la ingesta de hoy?.
¿Deberia controlar algo?.
Recomendaciones para mejorarla.
___
En base a la hora propocionada y los ingredientes consumidos, decidelas comidas que he llegado a completar (desayuno, comida, cena), recomiendame algo que comer en cada una de las comidas que no haya completado y evalua las que si. Ten en cuenta lo que ya he comido y lo que me vendria mejor teniendo en cuenta que si recomiendas varias ingestas, su totalidad siga siendo saludable en base a mis datos. 
Formalo la siguiente manera:
___
- Desayuno:
recomendacion
- Comida:
recomendacion 
- Cena:
recomendacion
___
No me ofrezcas resolver mas dudas al final. Limitate a despedirte con un "Espero que te haya sido útil. ¡Sigue cuidando tu salud!"
.`;
            console.log(message);
            // Loading
            setLoading(true);
            // fetch
            let response = await fetch(
                `http://localhost:3006/api/gpt/?message=${message}`
            );
            console.log(response);
            let data = await response.json();
            console.log(data);
            setResponse(data);
            setLoading(false);
        }else{
            setResponse("No hay valores nutricionales, añadelos antes de solicitar un análisis");
        }
    };
    return (
        <section>
            {isData && (    
            <form onSubmit={getMessage}>
                <p>{response}</p>
                <button type="submit" hidden={loading}>
                    Submit
                </button>
                {loading ? (
                    <picture>
                        <img
                            src="images/Green_Line_Branch_Organic_Nature_Logo.gif"
                            alt="loading"
                        />
                    </picture>
                ) : null}
            </form>
            )}
            {error && <p>{error}</p>}
        </section>
    );
};

export default GptForm;
