import { useState } from "react";

const GptForm = () => {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const getMessage = async (e) => {
        e.preventDefault();
        console.log(message);
        setLoading(true);
        let response = await fetch(
            `http://localhost:3006/api/gpt/?message=${message}`
        );
        console.log(response);
        let data = await response.json();
        console.log(data);
        setResponse(data);
        setLoading(false);
    };
    return (
        <section>
            <form onSubmit={getMessage}>
                <input
                    type="text"
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    Submit
                </button>
                {loading ? (
                    <picture>
                        <img
                            src="images/Green_Line_Branch_Organic_Nature_Logo.gif"
                            alt="loading"
                        />
                    </picture>
                ) : null}
                <p>{response}</p>
            </form>
        </section>
    );
};

export default GptForm;
