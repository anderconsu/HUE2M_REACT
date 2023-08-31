//scss
import "./css/form.scss";

// React
import { useState, useEffect, useContext } from "react";
import NutValues from "./nutValues";
// Context
import UserContext from "../../context/userContext";
import { Link } from "react-router-dom";
import TokenContext from "../../context/token";

const FormIngredients = () => {
    // * Pre function variables
    const [blockSubmit, setBlockSubmit] = useState(false);
    const [error, setError] = useState("");
    const [edamamError, setEdamamError] = useState("");
    const { user } = useContext(UserContext);
    const {token} = useContext(TokenContext);
    const [dbUser, setDbUser] = useState(false);
    const [inputValue, setInputValue] = useState("");

    // * Functions
    // Add form ingredients to lists
    const addToList = async (e) => {
        e.preventDefault();
        setBlockSubmit(true);
        setInputValue("");
        if(e.target.ingredientes.value === "" || !e.target.ingredientes.value){
            setBlockSubmit(false);
            return
        }
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
                `${process.env.REACT_APP_BACKEND_URL}/api/translate/?message=${obj.ingrediente}`
            );
            console.log("ingEnglish ", ingEnglish);
            if (ingEnglish.status === 200) {
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
                console.log("gpt translation selected");
                // If the translation is not successful an entire object is passed to gpt to translate
                ingEnglish = await fetch(
                    `${process.env.REACT_APP_BACKEND_URL}/api/translategpt/?message=${obj.ingrediente}`
                );
                let data = await ingEnglish.text();
                ingEnglish = {
                    ingrediente: data,
                    cantidad: parseInt(e.target.cantidad.value),
                    unidad:
                        e.target.unidad.value === "units"
                            ? ""
                            : e.target.unidad.value,
                };
            }

            listaEnglish.push(ingEnglish);
            setIngListEnglish(listaEnglish);
        } catch (error) {
            console.log(error);
        }
        setBlockSubmit(false);
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    // Get data from edamam
    const getEdamamData = async () => {
        setEdamamError("Cargando...");
        let ingredients = [];
        const url = new URL(`${process.env.REACT_APP_BACKEND_URL}/api/edamamdata/`);
        ingListEnglish.forEach((ing) => {
            ingredients.push(
                `${ing.cantidad} ${ing.unidad} ${ing.ingrediente}`
            );
        });
        url.searchParams.set("message", ingredients);
        console.log(ingredients);
        try {
            let response = await fetch(url);
            let data = await response.json();
            if (data === 555){
                setEdamamError("555");
            }
            setEdamamData(data);
            console.log(data);
            console.log(data.totalNutrients);
        } catch (error) {
            console.log("getEdamamData error: ", error);
        }
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
    const getEnglishListFromLocalStorage = () => {
        let ingList = JSON.parse(localStorage.getItem("ingListEnglish"));
        if (ingList === null) {
            return [];
        } else {
            return ingList;
        }
    };
    // Check user data before rendering
    const getUserData = async () => {
        let usuario = user;
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/get`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify({email: usuario.email})   
            });
            if (!response.ok) {
                console.log(response);
                if (response.status === 404 || response.status === 401) {
                    setError(
                        "No hay datos de tu usuario. Por favor completa el perfil primero."
                        );
                        return;
                } 
            }else{
                setDbUser(true);
        }  
        } catch (error) {
            console.log("error en getUser", error);
            return;
        }
    };

    //* Variable declaration
    const [ingList, setIngList] = useState(getListFromLocalStorage());
    const [ingListEnglish, setIngListEnglish] = useState(
        getEnglishListFromLocalStorage
    );
    const [edamamData, setEdamamData] = useState({});
    

    //* UseEffects
    useEffect(() => {
        getUserData();
    }, []);

    // Add to localstorage
    useEffect(() => {
        localStorage.setItem("ingList", JSON.stringify(ingList));
    }, [ingList]);
    useEffect(() => {
        localStorage.setItem("ingListEnglish", JSON.stringify(ingListEnglish));
    }, [ingListEnglish]);

    if (!dbUser) {
        return (
            <section className="noDbUser">
                {error ? (
                    <article className="incompleteProfile">
                        <p>{error} </p>{" "}
                        <Link to="/profile">Completar perfil</Link>
                    </article>
                ) : (
                    null
                )}
            </section>
        );
    } else {
        return (
            <section className="IngredientList">
                <article className="text">
                    <h2>
                        Añade la comida que has consumido en un dia completo.
                    </h2>
                    <p>
                        Te recomendamos, hacerlo una vez ya hayas completado
                        todas las comidas.
                    </p>
                </article>
                <form onSubmit={addToList}>
                    <div className="units">
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
                    </div>
                    <input
                        autoFocus
                        name="ingredientes"
                        id="ingredientes"
                        placeholder="Ingrediente"
                        onChange={handleInputChange}
                        value={inputValue}
                    />
                    <button type="submit" disabled={blockSubmit}>
                        Añadir
                    </button>
                </form>
                {edamamError === "Cargando..." ? (
                    <p>Cargando...</p>
                ) : null}

                {edamamError === "555" ? (
                    <p>Hay un error al cotejar uno o varios ingredientes. Puede que alguno de los ingredientes no sea cotejable, por favor, compruebalo eliminando los ingredientes</p>
                ) : null}
                <ul className="ingList">
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
                                X
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    className="calcular"
                    type="button"
                    onClick={getEdamamData}
                    disabled={
                        blockSubmit === true || ingListEnglish.length === 0
                    }
                >
                    Calcular
                </button>
                
                {edamamData?.totalNutrients && (
                    <NutValues edamamData={edamamData}></NutValues>
                    )}
                
            </section>
        );
    }
};

export default FormIngredients;
