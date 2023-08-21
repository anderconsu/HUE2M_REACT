import { useState } from "react";

const GptForm = () => {
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(localStorage.getItem("formattedData") ? true : false);

    const getMessage = async (e) => {
        setResponse("");
        e.preventDefault();
        const formattedData = JSON.parse(localStorage.getItem("formattedData"));
        if (formattedData) {
            // Get from local storage
            const now = new Date();
            const ingList = await JSON.parse(localStorage.getItem("ingList"));
            const ingListMessage = await ingList.map((ing) => `${ing.cantidad}${ing.unidad} de ${ing.ingrediente}`);
            const currentTime = now.toLocaleTimeString()
            //
            // TODO: get name (age, gender, weight, food preference and height) 
            // let name = localStorage.getItem("name");
            // Message
            let message = `Hola, me llamo Ander, mido 1,70 , peso 70Kg y soy vegetariano, son las (${currentTime}), ten en cuenta que depende de la hora, puede que me quede alguna comida mas por hacer. He comido los siguientes ingredientes: --- ${ingListMessage.join(", ")} --- los cuales tienen los siguientes valores nutricionales:--- ${formattedData.join(", ")} --- respondeme diciendome que te parece la ingesta de hoy, si deberia controlar algo de la misma y recomendaciones para mejorarla. Si crees que todavia tengo una comida por hacer en el dia, recomiendame que comer.`;
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
            {data && (    
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
        </section>
    );
};

export default GptForm;
