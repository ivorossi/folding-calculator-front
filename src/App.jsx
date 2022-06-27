import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Navigator from "./components/Navigator";
import Home from "./components/Home"
import AdminPanel from "./components/AdminPanel";
import BlackVeenerCalculator from "./components/BlackVeenerCalculator";
import {useEffect, useState} from "react";
import Cookies from "universal-cookie";

function App() {
    const [cookiesEmail, setCookiesEmail] = useState(null)

    useEffect(() => {
        const cookies = new Cookies()
        setCookiesEmail(cookies.get("username"))
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                {cookiesEmail && (
                    <Navigator/>
                )}
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/adminpanel" element={<AdminPanel/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
