// React
import { useEffect, useState, useContext } from "react";
import ProfileCreate from "./profilecreate";

// Context
import UserContext from "../../context/userContext";
// Dictionary
import conditDict from "./conditDict";
const Profile = () => {
    let [userData, setUserData] = useState(null);
    const { user } = useContext(UserContext);
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
                } else {
                    console.log(response);
                }
            } catch (error) {
                console.log("error en getUser", error);
                return;
            }
        }
    };
    useEffect(() => {
        if (!user) {
            setUserData(null);
        }else{
            getUser();
        }
    }, [user]);
    
    if (!user) {
        return (
            <ProfileCreate />
        );
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
                    
                </article>
            </section>  
        )
    }
};

export default Profile;
