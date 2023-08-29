// Scss
import "./scss/profile.scss";

// React
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import ProfileCreate from "./profilecreate";


// Context
import UserContext from "../../context/userContext";
import TokenContext from "../../context/token";
// Dictionary
import conditDict from "./conditDict";
const Profile = () => {
    let [userData, setUserData] = useState(null);
    const { user } = useContext(UserContext);
    const { token } = useContext(TokenContext);
    const navigate = useNavigate();
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
                    setUserData(data);
                }else if (response.statusText === "Not Found") {
                    setUserData("ND");
                } else if (response.statusText === "Unauthorized" || response.status === "401") {
                    setUserData("error");
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
    useEffect(() => {
        if (user && token) {
            getUser();
        }
    }, [user, token]);
    if (userData === "error") {
        return <p>Se ha producido un error al obtener los datos</p>;
    }
    if (userData === "ND") {
        return <ProfileCreate/>
    }else {
        if (userData === null) {
            return <p>Cargando...</p>;
        }
        return (
            <section className="profile">
                <h3>Perfil</h3>
                <article className="profileInfo">
                    <p>Email: {userData.email}</p>
                    <p>Nombre: {user.displayName}</p>
                    <p>Fecha de nacimiento: {userData.birthday}</p>
                    <p>
                        Sexo:{" "}
                        {userData.sex
                            ? userData.sex === "M"
                                ? "Macho"
                                : userData.sex === "H"
                                ? "Hembra"
                                : "No especificado"
                            : "No especificado"}
                    </p>
                    <p>
                        Preferencia:{" "}
                        {userData.foodPreference
                            ? userData.foodPreference == "Vege"
                                ? "Vegetariano"
                                : userData.foodPreference == "Vega"
                                ? "Vegano"
                                : "No especificado"
                            : "No especificado"}
                    </p>
                    <section className="conditions">
                    <p>Condiciones: {" "} {userData.condition.length === 0 && "No hay condiciones"}</p>
                    {userData.condition.length > 0 && (
                        <ul className="conditionList">
                            {userData.condition.map((condition, index) => (
                                <li key={index}>{conditDict[condition]}</li>
                                ))}
                        </ul>                     
                    )}
                    </section>
                    <section className="actions">
                    <Link to="/profile/update">Editar perfil</Link>
                    <Link to="/profile/delete">Eliminar perfil</Link>
                    </section>
                </article>
            </section>  
        )
    }
};

export default Profile;
