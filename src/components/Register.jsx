import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import "./styles.css";

const Register = () => {
    const [values, setValues] = React.useState({
        username: "",
        email: "",
        password: ""
    });

    const path = 'https://foldingcalculator.herokuapp.com/';

    const navigate = useNavigate();
    const cookies = new Cookies();
    cookies.remove("token");
    cookies.remove("username");

    async function handleSubmit(e) {
        e.preventDefault();

        if (
            !(values.username === "") &&
            !(values.email === "") &&
            !(values.password === "")
        ) {
            await axios.post(
                path + "api/v1/auth/register",
                values
            ).then(response => {
                if (response.status === 201) {
                    navigate("/")
                }
            }).catch(err => alert(err));
        }
    }

    function handleChange(e) {
        const {target} = e;
        const {name, value} = target;

        const newValues = {
            ...values,
            [name]: value,
        };

        setValues(newValues);
    }

    return (
        <div className="register" style={cardStyle}>
            <section className="form">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                    />

                    <label className="form-label">Email Adress</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />

                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    <button className="btn btn-dark pe-5 ps-5 mt-2" type="submit">
                        <a className="links">
                            Sign up
                        </a>
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Register;


const cardStyle = {
    width: '26%',
    textAlign: "center",
    margin: '5% 0% 2% 37%',
    background: '#000',
    color: 'white',
}