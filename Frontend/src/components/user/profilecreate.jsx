// React
import { useContext, useState } from "react";
import {useNavigate} from "react-router-dom"

// Context
import UserContext  from "../../context/userContext";
// Array of conitions to check
const conditionArray = [
    "celiac", "diabetes", "hypertension", "highColestherol", "lactoseintolerant", "nutA", "eggA", "sojaA"
]


const ProfileCreate = () => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const [error, setError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        const email = user.email
        let foodConditions = []
        conditionArray.forEach(condition => {
            if (e.target[condition].checked) {
                foodConditions.push(condition)
            }
        })
        const height = e.target.height.value ? e.target.height.value : null;
        const weight = e.target.weight.value ? e.target.weight.value : null;
        const birthday = e.target.birthday ? e.target.birthday.value : null;
        const sex = !e.target.sex.value == "0" ? e.target.sex.value : null;
        const foodPreference = !e.target.foodPreference.value == "O" ? e.target.foodPreference.value : null;
        let userData = {
            email,
            height,
            weight,
            birthday,
            sex,
            foodPreference,
            condition: foodConditions

        }
        const response = await fetch("http://localhost:3006/user/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)   
        })
        if (!response.ok) {
            console.log(response);
            if (response.status === 409) {
                setError("Se ha intentado registrar a un usuario que ya existe.")
            }
        }else{
            navigate("/")
        }
    }
    return (
        <section className="profileCreation">
            <h3>Crea tu perfil</h3>
            <p>Necesitamos un poco de información para poder ofrecer mejores recomendaciones nutricionales, todas las opciones son opcionales, pero mejoran los resultados.</p>
            <form action="POST" onSubmit={handleSubmit}>
                <label htmlFor="birthday">Fecha de nacimiento</label>
                <input type="date" id="birthday"/>
                <label htmlFor="height">Altura en cm</label>
                <input type="number" id="height" min={1} max={250}/>
                <label htmlFor="weight">Peso en Kg</label>
                <input type="number" id="weight" min={1} max={350}/>
                <label htmlFor="sex">Sexo biológico</label>
                <select id="sex">
                    <option value="0">Prefiero no especificar</option>
                    <option value="M">Macho</option>
                    <option value="H">Hembra</option>
                </select>
                <label htmlFor="foodPreference">Preferencias de dieta</label>
                <select id="foodPreference">
                    <option value="O">Omnívoro</option>
                    <option value="Vege">Vegetariano</option>
                    <option value="Vega">Vegano</option>
                </select>
                <article className="conditions">
                    <p>Condiciones alimenticias</p>
                    <label htmlFor="celiac">Celiaquia</label>
                    <input type="checkbox" value={"celiac"} id={"celiac"} />
                    <label htmlFor="diabetes">Diabetes</label>
                    <input type="checkbox" value={"diabetes"} id={"diabetes"} />
                    <label htmlFor="hypertension">Hipertensión</label>
                    <input type="checkbox" value={"hypertension"} id={"hypertension"} />
                    <label htmlFor="highColestherol">Colesterol alto</label>
                    <input type="checkbox" value={"highColestherol"} id={"highColestherol"} />
                    <label htmlFor="lactoseintolerant"> Intolerancia al lactosa</label>
                    <input type="checkbox" value={"lactoseintolerant"} id={"lactoseintolerant"} />
                    <label htmlFor="nutA">Alergia a los frutos secos</label>
                    <input type="checkbox" value={"nutA"} id={"nutA"} />
                    <label htmlFor="eggA">Alergia a los huevos</label>
                    <input type="checkbox" value={"eggA"} id={"eggA"} />
                    <label htmlFor="sojaA">Alergia a la soja</label>
                    <input type="checkbox" value={"sojaA"} id={"sojaA"} />
                </article>
                <button type="submit">Confirmar datos</button>
            </form>
            {error && <p>{error}</p>}
        </section>
    )
}

export default ProfileCreate