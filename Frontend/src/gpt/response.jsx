import { useState } from "react";

const GptForm = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const getMessage = async (e) => {
        e.preventDefault();
        console.log(message);
        setLoading(true);
        let response = await fetch(`http://hue2m-back:3000/gpt/?message=${message}`);
        let data = await response.text();
        console.log(data);
        setResponse(data);
        setLoading(false);
        
    }
    return (
        <section>
            <form onSubmit={getMessage}>
                <input type="text" onChange={(e) => setMessage(e.target.value)} />
                <button type="submit" disabled={loading}>Submit</button>
                <p>{response}</p>
            </form>
        </section>
    )
}

export default GptForm