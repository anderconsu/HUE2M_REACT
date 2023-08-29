// Scss
import "./scss/profileCreate.scss";

// React
import { useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

// Context
import UserContext  from "../../context/userContext";
import TokenContext from "../../context/token";
// Array of conitions to check
const conditionArray = [
    "celiac", "diabetes", "hypertension", "highColestherol", "lactoseintolerant", "nutA", "eggA", "sojaA"
]

const ProfileUpdate = () => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const {token} = useContext(TokenContext);
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
                        "Authorization": token,
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
                "Content-Type": "application/json",
                "Authorization": token,
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

    if(!userData.condition){
        return null
    }
    return (
        <section className="profileUpdate">
            <h3>Modifica tu perfil tu perfil</h3>
            <form action="POST" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="birthday">Fecha de nacimiento</label>
                    <input type="date" id="birthday" defaultValue={userData.birthday}/>
                </div>
                <div>
                    <label htmlFor="height">Altura en cm</label>
                    <input type="number" id="height" min={1} max={250} defaultValue={userData.height}/>
                </div>
                <div>

                    <label htmlFor="weight">Peso en Kg</label>
                    <input type="number" id="weight" min={1} max={350} defaultValue={userData.weight}/>
                </div>
                <div>
                <label htmlFor="sex">Sexo biológico</label>
                <select id="sex">
                    <option value="0" selected={userData.sex === 0}>Prefiero no especificar</option>
                    <option value="M" selected={userData.sex === "M"}>Macho</option>
                    <option value="H" selected={userData.sex === "H"}>Hembra</option>
                </select>
                </div>
                <div>
                <label htmlFor="foodPreference">Preferencias de dieta</label>
                <select id="foodPreference">
                    <option value="0" selected={userData.foodPreference === 0} >Omnívoro</option>
                    <option value="Vege" selected={userData.foodPreference === "Vege"}>Vegetariano</option>
                    <option value="Vega" selected={userData.foodPreference === "Vega"}>Vegano</option>
                </select>
                </div>
                    <p id="conditionHeader">Condiciones alimenticias</p>
                <article className="conditions">
                    <div>
                    <label htmlFor="celiac">Celiaquia</label>
                    <input type="checkbox" value={"celiac"} id={"celiac"} defaultChecked={ userData.condition ? userData.condition.includes("celiac"): false}/>
                    </div>
                    <div>
                    <label htmlFor="diabetes">Diabetes</label>
                    <input type="checkbox" value={"diabetes"} id={"diabetes"} defaultChecked={ userData.condition ? userData.condition.includes("diabetes"): false}/>
                    </div>
                    <div>    
                    <label htmlFor="hypertension">Hipertensión</label>
                    <input type="checkbox" value={"hypertension"} id={"hypertension"} defaultChecked={ userData.condition ? userData.condition.includes("hypertension"): false} />
                    </div>
                    <div>    
                    <label htmlFor="highColestherol">Colesterol alto</label>
                    <input type="checkbox" value={"highColestherol"} id={"highColestherol"} defaultChecked={ userData.condition ? userData.condition.includes("highColestherol"): false}/>
                    </div>
                    <div>    
                    <label htmlFor="lactoseintolerant"> Intolerancia al lactosa</label>
                    <input type="checkbox" value={"lactoseintolerant"} id={"lactoseintolerant"} defaultChecked={ userData.condition ? userData.condition.includes("lactoseintolerant"): false} />
                    </div>
                    <div>    
                    <label htmlFor="nutA">Alergia a los frutos secos</label>
                    <input type="checkbox" value={"nutA"} id={"nutA"} defaultChecked={ userData.condition ? userData.condition.includes("nutA"): false} />
                    </div>
                    <div>    
                    <label htmlFor="eggA">Alergia a los huevos</label>
                    <input type="checkbox" value={"eggA"} id={"eggA"} defaultChecked={ userData.condition ? userData.condition.includes("eggA"): false} />
                    </div>
                    <div>    
                    <label htmlFor="sojaA">Alergia a la soja</label>
                    <input type="checkbox" value={"sojaA"} id={"sojaA"} defaultChecked={ userData.condition ? userData.condition.includes("sojaA"): false} />
                    </div>
                </article>
                <button type="submit">Confirmar datos</button>
            </form>
            {error && <p>{error}</p>}
        </section>
    )
}

export default ProfileUpdate