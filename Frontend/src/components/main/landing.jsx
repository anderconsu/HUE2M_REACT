import './css/landing.scss';
import { useContext } from 'react';
import LoggedInContext from "../../context/loggedInContext";
import  Form from './form';
import GptForm from '../gpt/response';

const Landing = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoggedInContext);

    if (isLoggedIn === true) {
        return (
            <section className="userLanding">
                <Form />
                <GptForm />
            </section>
        )
    }else{
        return (
            <section className="landing">
            <div className='bienvenida'>
                <p>Bienvenido a</p>
                <h2>Have You Eaten too much?</h2>
            </div>
            <article className='info'>
                <h3>
                    ¿Te has preguntado alguna vez si has comido demasiado
                    durante el día?
                </h3>
                <p>
                    Muchas veces nos preguntamos a lo largo del día si hemos
                    comido demasiado y no tenemos claro cual sería la cantidad
                    idónea a consumir.
                </p>
                <p>
                    Con esta web podras saber el valor nutricional de tu ingesta diaria.  
                </p>
                <p>También contamos con un análisis avanzado basado en inteligencia artificial que indica la calidad de la ingesta y en qué se puede mejorar.</p>
            </article>
            <picture className="bottomLogo" onClick={()=> {window.location.href = 'https://fullstack.cloudconsu.com/RampUP/web_personal/pages/never.html'}}>
                <img
                    src="images/Green_Line_Branch_Organic_Nature_Logo.png"
                    alt="logo"
                    />
            </picture>
        </section>
    );
}
};

export default Landing;
