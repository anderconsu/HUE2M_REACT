// React
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import ProfileCreate from "./profilecreate";


// Context
import UserContext from "../../context/userContext";
// Dictionary
import conditDict from "./conditDict";
const Profile = () => {
    let [userData, setUserData] = useState(null);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
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
                    setUserData(data);
                }else if (response.statusText === "Not Found") {
                    setUserData("ND");
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
        if (user) {
            getUser();
        }
    }, [user]);
    
    if (userData === "ND") {
        return <ProfileCreate/>
    }else {
        if (userData === null) {
            return <p>Cargando...</p>;
        }
        return (
            <section className="profile">
                <h3>Perfil</h3>
                <article>
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
                    <article>
                        
                    </article>
                    <p>Condiciones: {" "} {userData.condition.length === 0 && "No hay condiciones"}</p>
                    {userData.condition.length > 0 && (
                    <ul>
                        {userData.condition.map((condition, index) => (
                            <li key={index}>{conditDict[condition]}</li>
                        ))}
                    </ul>                     
                    )}
                    <Link to="/profile/update">Editar perfil</Link>
                </article>
            </section>  
        )
    }
};

export default Profile;
