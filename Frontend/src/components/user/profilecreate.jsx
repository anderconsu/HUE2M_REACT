// Scss
import "./scss/profileCreate.scss";

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
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/create`, {
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
            <div className="description">
            <p className="intro">Necesitamos un poco de información para poder ofrecer mejores recomendaciones nutricionales, todas las opciones son opcionales, pero mejoran los resultados.</p>
            <p className="important"> * Si no deseas introducir ningún dato, selecciona "Confirmar datos" sin rellenar ningún campo *</p>
            <p className="important"> *Los datos introducidos a continuación se guardarán en una base de datos únicamente para proporcionar un análisis adecuado *</p>
            <p className="important"> * Si haces click en "Confirmar datos" se da por hecho que aceptas que se guarden tus datos *</p>
            <p className="important"> * Puedes eliminarlos en cualquier momento borrando el perfil *</p>
            </div>
            <form action="POST" onSubmit={handleSubmit}>
                <div>

                <label htmlFor="birthday">Fecha de nacimiento</label>
                <input type="date" id="birthday"/>
                </div>
                <div>

                <label htmlFor="height">Altura en cm</label>
                <input type="number" id="height" min={1} max={250}/>
                </div>
                <div>

                <label htmlFor="weight">Peso en Kg</label>
                <input type="number" id="weight" min={1} max={350}/>
                </div>
                
                <label htmlFor="sex">Sexo biológico</label>
                <select id="sex">
                    <option value="0">Prefiero no especificar</option>
                    <option value="M">Macho</option>
                    <option value="H">Hembra</option>
                </select>
                
                <label htmlFor="foodPreference">Preferencias de dieta</label>
                <select id="foodPreference">
                    <option value="0">Omnívoro</option>
                    <option value="Vege">Vegetariano</option>
                    <option value="Vega">Vegano</option>
                </select>
                    <p id="conditionHeader">Condiciones alimenticias</p>
                <article className="conditions">
                    <div>
                    <label htmlFor="celiac">Celiaquia</label>
                    <input type="checkbox" value={"celiac"} id={"celiac"} />
                    </div>
                    <div>
                    <label htmlFor="diabetes">Diabetes</label>
                    <input type="checkbox" value={"diabetes"} id={"diabetes"} />
                    </div>
                    <div>
                    <label htmlFor="hypertension">Hipertensión</label>
                    <input type="checkbox" value={"hypertension"} id={"hypertension"} />
                    </div>
                    <div>
                    <label htmlFor="highColestherol">Colesterol alto</label>
                    <input type="checkbox" value={"highColestherol"} id={"highColestherol"} />
                    </div>
                    <div>
                    <label htmlFor="lactoseintolerant"> Intolerancia al lactosa</label>
                    <input type="checkbox" value={"lactoseintolerant"} id={"lactoseintolerant"} />
                    </div>
                    <div>
                    <label htmlFor="nutA">Alergia a los frutos secos</label>
                    <input type="checkbox" value={"nutA"} id={"nutA"} />
                    </div>
                    <div>
                    <label htmlFor="eggA">Alergia a los huevos</label>
                    <input type="checkbox" value={"eggA"} id={"eggA"} />
                    </div>
                    <div>
                    <label htmlFor="sojaA">Alergia a la soja</label>
                    <input type="checkbox" value={"sojaA"} id={"sojaA"} />
                    </div>
                </article>
                <button type="submit">Confirmar datos</button>
            </form>
            {error && <p>{error}</p>}
        </section>
    )
}

export default ProfileCreate