import { useState } from "react";

//import { translate } from '@vitalets/google-translate-api';

const FormIngredients = () => {
    const [ingList, setIngList] = useState([]);
    const [ingListEnglish, setIngListEnglish] = useState([]);
    const addToList = async (e) => {
        e.preventDefault()
        const lista =  [...ingList]
        const listaEnglish = [...ingListEnglish]
        const obj = {
            ingrediente: e.target.ingredientes.value,
            cantidad: parseInt(e.target.cantidad.value),
            unidad: e.target.unidad.value,
        }
        lista.push(obj)
        setIngList(lista)
        try {
            let ingEnglish = await fetch(`http://localhost:3006/translate/?message=${obj.ingrediente}`);
            if (ingEnglish) {
                let ingValue = await ingEnglish.text();
                ingEnglish = {
                    ingrediente: ingValue,
                    cantidad: parseInt(e.target.cantidad.value),
                    unidad: e.target.unidad.value,
                }
                
            }else {
                ingEnglish = await fetch(`http://localhost:3006/translategpt/?message=${obj}`);
                let data = await ingEnglish.text();
                ingEnglish = data
            }
            listaEnglish.push(ingEnglish)
        } catch (error) {
            console.log(error);
        }
        setIngListEnglish(listaEnglish)
        console.log("lista: ", lista);
        console.log("listaEnglish: ", listaEnglish);
    }


    return (
        <div className="IngredientList">
        <form onSubmit={addToList}>
            <h2>formulario</h2>
            <input autoFocus name="ingredientes" id="ingredientes" placeholder="Ingrediente" />
            <input type="number" name="cantidad" id="cantidad" min="1" max="1000" defaultValue="1" />
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
                    {`${ing.ingrediente} - ${ing.cantidad} ${ing.unidad === "units" ? "Unidad(es)" : ing.unidad === "plate" ? "Plato(s)": ing.unidad}`}
                </li>
            ))}
        </ul>
        </div>
    )
}

export default FormIngredients