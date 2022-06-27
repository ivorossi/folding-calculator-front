import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import {Button, Container, Nav, Navbar} from "react-bootstrap";

const Navigator = () => {
    const [cookiesUsername, setCookiesUsername] = useState(null)
    const [cookiesRole, setCookiesRole] = useState(null)

    useEffect(() => {
        const myCookies = new Cookies()
        setCookiesUsername(myCookies.get("username"))
        setCookiesRole(myCookies.get("role"))
    }, []);

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Calculadora-Plegados</Navbar.Brand>
                {cookiesUsername && (
                    <Nav>
                        {cookiesRole === 'ADMIN' && (
                            <Nav.Link className="me-4" href="/adminpanel">
                                Admin Panel
                            </Nav.Link>
                        )}
                        <Navbar.Text className="me-4">
                            Sesion iniciada como: <a href="/dashboard">{cookiesUsername}</a>
                        </Navbar.Text>
                        <Button className="btn-danger ms-4" href="/">
                            Cerrar sesion
                        </Button>
                    </Nav>
                )}
            </Container>
        </Navbar>
    );
};

export default Navigator;
