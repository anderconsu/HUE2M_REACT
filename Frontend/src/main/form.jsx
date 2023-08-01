import { useState, useEffect } from "react";

const FormIngredients = () => {
    // * Functions

    // Add form ingredients to lists
    const addToList = async (e) => {
        e.preventDefault();
        const lista = [...ingList];
        const listaEnglish = [...ingListEnglish];
        
        // An object is created to store the ingredient, the quantity and the unit. Then is pushed to the array and setted to the state
        const obj = {
            ingrediente: e.target.ingredientes.value,
            cantidad: parseInt(e.target.cantidad.value),
            unidad: e.target.unidad.value,
        };
        lista.push(obj);
        setIngList(lista);
        
        // The value of ingrediente is translated and an alternative object is created and pushed to the alternative array to be compatible with edamam
        try {
            let ingEnglish = await fetch(
                `http://localhost:3006/api/translate/?message=${obj.ingrediente}`
                );
                if (ingEnglish) {
                    // If the translation is successful with the google translation in the backend
                    let ingValue = await ingEnglish.text();
                    ingEnglish = {
                        ingrediente: ingValue,
                        cantidad: parseInt(e.target.cantidad.value),
                        unidad:
                        e.target.unidad.value === "units"
                        ? ""
                        : e.target.unidad.value,
                    };
                } else {
                    // If the translation is not successful an entire object is passed to gpt to translate
                    ingEnglish = await fetch(
                        `http://localhost:3006/api/translategpt/?message=${obj}`
                        );
                        let data = await ingEnglish.text();
                        ingEnglish = data;
                    }
                    listaEnglish.push(ingEnglish);
                    setIngListEnglish(listaEnglish);
                } catch (error) {
            console.log(error);
        }
    };
    
    // Get data from edamam
    const getEdamamData = async () => {
        let ingredients = [];
        const url = new URL(`http://localhost:3006/api/edamamdata/`);
        ingListEnglish.forEach((ing) => {
            ingredients.push(
                `${ing.cantidad} ${ing.unidad} ${ing.ingrediente}`
                );
            });
            url.searchParams.set("message", ingredients);
            console.log(ingredients);
        let response = await fetch(url);
        let data = await response.json();
        setEdamamData(data);
        console.log(data);
        console.log(data.totalNutrients);
    };

    // Delete items from ingList too
    const delFromList = (index) => {
        const lista = [...ingList];
        const engLista = [...ingListEnglish];
        lista.splice(index, 1);
        engLista.splice(index, 1);
        setIngList(lista);
        setIngListEnglish(engLista);
    };

    
    // Get ingList from local storage
    const getListFromLocalStorage = () => {
        let ingList = JSON.parse(localStorage.getItem("ingList"));
        if (ingList === null) {
            return [];
        } else {
            return ingList;
        }
    };

    //* Variable declaration
    const [ingList, setIngList] = useState(getListFromLocalStorage());
    const [ingListEnglish, setIngListEnglish] = useState([]);
    const [edamamData, setEdamamData] = useState({});

    //* UseEffects

    // Add to localstorage
    useEffect(() => {
        localStorage.setItem("ingList", JSON.stringify(ingList));
    }, [ingList]);

    return (
        <div className="IngredientList">
            <form onSubmit={addToList}>
                <h2>Añade la comida que has consumido en un dia completo.</h2>
                <input
                    autoFocus
                    name="ingredientes"
                    id="ingredientes"
                    placeholder="Ingrediente"
                />
                <input
                    type="number"
                    name="cantidad"
                    id="cantidad"
                    min="1"
                    max="1000"
                    defaultValue="1"
                />
                <select name="unidad" id="unidad">
                    <option value="units">Unidad(es)</option>
                    <option value="plate">Plato</option>
                    <option value="l">Litros</option>
                    <option value="ml">Mililitros</option>
                    <option value="mg">Miligramos</option>
                    <option value="g">Gramos</option>
                    <option value="kg">Kilogramos</option>
                </select>
                <button type="submit">Añadir</button>
            </form>
            <ul>
                {ingList.map((ing, index) => (
                    <li key={index}>
                        {`${ing.ingrediente} - ${ing.cantidad} ${
                            ing.unidad === "units"
                                ? "Unidad(es)"
                                : ing.unidad === "plate"
                                ? "Plato(s)"
                                : ing.unidad
                        }`}
                        <button
                            className="eliminarButton"
                            onClick={() => delFromList(index)}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
            <button className="calcular" type="button" onClick={getEdamamData}>
                Calcular
            </button>
            {edamamData?.totalNutrients && (
                <ul>
                    {Object.entries(edamamData.totalNutrients).map(
                        ([key, value]) => (
                            <li key={key}>
                                {key} : {value.quantity.toFixed(2)} {value.unit}
                            </li>
                        )
                    )}
                </ul>
            )}

            {edamamData === 555 ? (
                <p>Hay un error al cotejar uno o varios ingredientes.</p>
            ) : null}
        </div>
    );
};

export default FormIngredients;
