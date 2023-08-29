// React
import { useContext, useState } from "react";
import {useNavigate} from "react-router-dom"

// Context
import UserContext  from "../../context/userContext";


const ProfileDelete = () => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const [error, setError] = useState("");

    const deleteProfile = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": user.accessToken,
                },
                body: JSON.stringify({ email: user.email }),
            });
            console.log("respuesta deleteProfile :", response);
            if (response.ok) {
                window.location.replace(`${process.env.REACT_APP_FRONTEND_URL}`);
            }else{
                setError("No se ha podido eliminar tu cuenta");
            }
        } catch (error) {
            console.log("error en deleteUser", error);
        }
    }

    return (
        <section className="profileDelete">
            <h4>¿Estás seguro de querer eliminar tu cuenta?</h4>
            <p>Una vez eliminada tu cuenta no se podrán recuperar tus datos</p>
            <button onClick={deleteProfile}>Eliminar cuenta</button>
        </section>
    )
}
export default ProfileDelete