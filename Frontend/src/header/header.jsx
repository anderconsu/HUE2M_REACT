import './header.css';
const Header = () => {
    return (
        <header>
            <picture className="logo">
                <img
                    src="images/Green_Line_Branch_Organic_Nature_Logo.png"
                    alt="logo"
                />
            </picture>
            <h1>HUE2M</h1>
            <nav>
                <p>Login</p>
                <p>Registro</p>
            </nav>

        </header>
    );
};

export default Header