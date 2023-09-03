import { useState } from "react";

const GptForm = () => {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const getMessage = async (e) => {
        e.preventDefault();
        setLoading(true);
        let response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/gpt/?message=${message}`
        );
        let data = await response.json();
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
