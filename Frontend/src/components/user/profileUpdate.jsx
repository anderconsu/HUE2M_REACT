// React
import { useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

// Context
import UserContext  from "../../context/userContext";
// Array of conitions to check
const conditionArray = [
    "celiac", "diabetes", "hypertension", "highColestherol", "lactoseintolerant", "nutA", "eggA", "sojaA"
]

const ProfileUpdate = () => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const [error, setError] = useState("");
    const [userData, setUserData] = useState({});
    const getUser = async () => {
        let usuario = user;
        if (usuario.email) {
            try {
                const response = await fetch("http://localhost:3006/user/get", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: usuario.email }),
                });
                if (response.ok) {
                    let data = await response.json();
                    console.log("dbuser:", data);
                    setUserData(data);
                }else if (response.statusText === "Not Found") {
                    navigate("/profile");
                } 
                else {
                    console.log("error en getUser (profile.jsx)", response);
                }
            } catch (error) {
                console.log("error en getUser", error);
                return;
            }
        }
    };
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
        const foodPreference = !e.target.foodPreference.value == "0" ? e.target.foodPreference.value : null;
        let userData = {
            email,
            height,
            weight,
            birthday,
            sex,
            foodPreference,
            condition: foodConditions

        }
        console.log(userData);
        const response = await fetch("http://localhost:3006/user/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)   
        })
        if (response.ok) {
            navigate("/profile")
        }else{
            console.log(response);
            if (response.status === 404) {
                setError("No se ha encontrado al usuario.")
            } else if (response.status === 400) {
                setError("Se ha producido un error desconocido.")
            }
        }
    }

    useEffect(() => {
        getUser()
    }, [user]);

    return (
        <section className="profileUpdate">
            <h3>Modifica tu perfil tu perfil</h3>
            <form action="POST" onSubmit={handleSubmit}>
                <label htmlFor="birthday">Fecha de nacimiento</label>
                <input type="date" id="birthday" defaultValue={userData.birthday}/>
                <label htmlFor="height">Altura en cm</label>
                <input type="number" id="height" min={1} max={250} defaultValue={userData.height}/>
                <label htmlFor="weight">Peso en Kg</label>
                <input type="number" id="weight" min={1} max={350} defaultValue={userData.weight}/>
                <label htmlFor="sex">Sexo biológico</label>
                <select id="sex" defaultValue={userData.sex}>
                    <option value="0">Prefiero no especificar</option>
                    <option value="M">Macho</option>
                    <option value="H">Hembra</option>
                </select>
                <label htmlFor="foodPreference">Preferencias de dieta</label>
                <select id="foodPreference" defaultValue={userData.foodPreference}>
                    <option value="0">Omnívoro</option>
                    <option value="Vege">Vegetariano</option>
                    <option value="Vega">Vegano</option>
                </select>
                <article className="conditions">
                    <p>Condiciones alimenticias</p>
                    <label htmlFor="celiac">Celiaquia</label>
                    <input type="checkbox" value={"celiac"} id={"celiac"} checked={ userData.condition ? userData.condition.includes("celiac"): false}/>
                    <label htmlFor="diabetes">Diabetes</label>
                    <input type="checkbox" value={"diabetes"} id={"diabetes"} checked={ userData.condition ? userData.condition.includes("diabetes"): false}/>
                    <label htmlFor="hypertension">Hipertensión</label>
                    <input type="checkbox" value={"hypertension"} id={"hypertension"} checked={ userData.condition ? userData.condition.includes("hypertension"): false} />
                    <label htmlFor="highColestherol">Colesterol alto</label>
                    <input type="checkbox" value={"highColestherol"} id={"highColestherol"} checked={ userData.condition ? userData.condition.includes("highColestherol"): false}/>
                    <label htmlFor="lactoseintolerant"> Intolerancia al lactosa</label>
                    <input type="checkbox" value={"lactoseintolerant"} id={"lactoseintolerant"} checked={ userData.condition ? userData.condition.includes("lactoseintolerant"): false} />
                    <label htmlFor="nutA">Alergia a los frutos secos</label>
                    <input type="checkbox" value={"nutA"} id={"nutA"} checked={ userData.condition ? userData.condition.includes("nutA"): false} />
                    <label htmlFor="eggA">Alergia a los huevos</label>
                    <input type="checkbox" value={"eggA"} id={"eggA"} checked={ userData.condition ? userData.condition.includes("eggA"): false} />
                    <label htmlFor="sojaA">Alergia a la soja</label>
                    <input type="checkbox" value={"sojaA"} id={"sojaA"} checked={ userData.condition ? userData.condition.includes("sojaA"): false} />
                </article>
                <button type="submit">Confirmar datos</button>
            </form>
            {error && <p>{error}</p>}
        </section>
    )
}

export default ProfileUpdate