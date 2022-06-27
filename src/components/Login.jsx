import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import "./styles.css";
import Background from "../images/LoginBackground.jpg";

const Login = () => {
    const [login, setLogin] = React.useState({
        username: "",
        password: "",
    });

    const path = 'https://foldingcalculator.herokuapp.com/';

    const navigate = useNavigate();
    const cookies = new Cookies();
    cookies.remove("token");
    cookies.remove("username");
    cookies.remove("role");

    async function handleSubmit(e) {
        e.preventDefault();

        if (!(login.username === "") && !(login.password === "")) {
            cookies.set("username", login.username);
            const res = await axios.post(
                path + "api/v1/auth/login",
                login
            );

            if (res.status) {
                cookies.set("token", res.data.token, {path: "/"});
                cookies.set("role", res.data.role[0].authority, {path: "/"});
                navigate("/dashboard", {replace: true});
                window.location.reload();
            }
        }
    }

    function handleChange(e) {
        const {target} = e;
        const {name, value} = target;

        const newValues = {
            ...login,
            [name]: value,
        };

        setLogin(newValues);
    }

    /*
    useEffect(() => {
        axios.get(path + "api/v1/auth/activateheroku");
    }, []);

     */

    return (


        <div style={background}>
            <div style={style}>
                <div style={FormLogin}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h1 style={{marginBottom: '15%', fontSize: '70px'}}>
                                Sign In
                            </h1>
                            <div>
                                <h5>Username</h5>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="userName"
                                    placeholder="Enter Username"
                                    name="username"
                                    value={login.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h5>Password</h5>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    id="password"
                                    name="password"
                                    value={login.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="d-grid" style={ButtonLogin}>
                                <button
                                    type="submit"
                                    className="btn btn-outline-primary"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        );
};

export default Login;

const background = {
    backgroundImage: "url(" + Background + ")",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100%',
}

const style = {
    height: '100vh',
    width: '50%',
    textAlign: "center",
    borderRadius: '5% 5% 5% 5%',
    margin: '0% 0% 0% 50%',
    color: 'black',
}

const FormLogin = {
    height: '100vh',
    background: "RGBA(255, 255, 255, 1)",
    padding: "15%",
}

const ButtonLogin = {
    width: '80%',
    marginLeft: '10%',
    marginTop: '10%',
}