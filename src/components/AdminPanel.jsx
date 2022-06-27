import React, {useEffect} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import {Button, Table} from "react-bootstrap";

const AdminPanel = () => {
    const path = 'https://foldingcalculator.herokuapp.com/';
    const cookies = new Cookies()

    const headers = {
        "content-type": "application/json",
        Authorization: "Bearer " + cookies.get("token"),
    };

    const [idBlackVeenerSelected, setIdBlackVeenerSelected] = React.useState(0);
    const [priceGalvanizedVeenerSelected, setPriceGalvanizedVeenerSelected] = React.useState(0);
    const [priceBlackVeenerSelected, setPriceBlackVeenerSelected] = React.useState(0);
    const [idGalvanizedVeenerSelected, setIdGalvanizedVeenerSelected] = React.useState(0);

    const handleIdBlackVeenerSelected = (e) => {
        setIdBlackVeenerSelected(e.target.value);
    };
    const handlePriceBlackVeenerSelected = (e) => {
        setPriceBlackVeenerSelected(e.target.value)
    };
    const handleIdGalvanizedVeenerSelected = (e) => {
        setIdGalvanizedVeenerSelected(e.target.value)
    };
    const handlePriceGalvanizedVeenerSelected = (e) => {
        setPriceGalvanizedVeenerSelected(e.target.value)
    };


    const [blackVeenerPrices, setBlackVeenerPrices] = React.useState([]);
    const [galvanizedVeenerPrices, setGalvanizedVeenerPrices] = React.useState([]);

    async function getVeenerPricesList(galvanized) {
        let route = "black-veener";
        if (galvanized) {
            route = "galvanized-veener";
        }

        const response = await axios.get(
            path + "api/v1/admin/prices/" + route,
            {headers}
        );
        const data = response.data;
        if (response.status === 200) {
            if (galvanized) {
                setGalvanizedVeenerPrices(data);
            } else {
                setBlackVeenerPrices(data);
            }
        }
    }

    useEffect(() => {
        getVeenerPricesList();
        getVeenerPricesList(true);
    }, []);


    return (
        <section >
            <form>
                <div style={{display: 'flex', marginTop: '8rem'}}>
                    <Table
                        bordered
                        hover
                        variant="dark"
                        style={{
                            textAlign: 'center',
                            marginLeft: '1rem',
                            marginTop: '2rem',
                            height: '12rem',
                            width: '40rem',
                        }}
                    >
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Manufacture</th>
                            <th>Actual Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {blackVeenerPrices?.map((veenerBlackData) => (
                            <tr key={veenerBlackData.id}>
                                <td>{veenerBlackData.id}</td>
                                <td>{veenerBlackData.manufacture}</td>
                                <td>{veenerBlackData.price} $</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                    <Table
                        bordered
                        hover
                        variant="dark"
                        style={{
                            textAlign: 'center',
                            marginLeft: '3rem',
                            marginTop: '2rem',
                            height: '13rem',
                            width: '40rem',
                        }}
                    >
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Actual Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {galvanizedVeenerPrices?.map((veenerGalvanizedData) => (
                            <tr key={veenerGalvanizedData.id}>
                                <td>{veenerGalvanizedData.id}</td>
                                <td>{veenerGalvanizedData.typeVeener}</td>
                                <td>{veenerGalvanizedData.price} $</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>

            </form>
            <div style={{display: 'flex', width: '50rem', marginLeft: '15.7rem'}}>
                <input
                    style={{width: '10rem'}}
                    type="number"
                    className="form-control"
                    placeholder="ID chapa negra"
                    id="idBlackVeener"
                    name="idBlackVeener"
                    value={idBlackVeenerSelected}
                    onChange={handleIdBlackVeenerSelected}
                />
                <input
                    style={{marginLeft: '1rem', width: '9rem'}}
                    type="number"
                    className="form-control"
                    placeholder="Nuevo precio"
                    id="newPriceBlackVeener"
                    name="newPriceBlackVeener"
                    value={priceBlackVeenerSelected}
                    onChange={handlePriceBlackVeenerSelected}
                />
                <Button variant='outline-success' style={{marginLeft: '1rem', width: '10rem'}}
                        onClick={async () => {
                            const dataBlack = {
                                "id": idBlackVeenerSelected,
                                "price": priceBlackVeenerSelected
                            };

                            const response = await axios.put(
                                path + "api/v1/admin/prices/black-veener",
                                dataBlack,
                                {headers}
                            );

                            if (response.status) {
                                window.location.reload();
                            }
                        }}
                >
                    Edit
                </Button>

                <input
                    style={{width: '12rem', marginLeft: '15rem'}}
                    type="number"
                    className="form-control"
                    placeholder="ID chapa galvanizada"
                    id="idGalvanizedVeener"
                    name="idGalvanizedVeener"
                    value={idGalvanizedVeenerSelected}
                    onChange={handleIdGalvanizedVeenerSelected}
                />
                <input
                    style={{marginLeft: '1rem', width: '9rem'}}
                    type="number"
                    className="form-control"
                    placeholder="Nuevo precio"
                    id="newPriceGalvanizedVeener"
                    name="newPriceGalvanizedVeener"
                    value={priceGalvanizedVeenerSelected}
                    onChange={handlePriceGalvanizedVeenerSelected}
                />
                <Button variant='outline-success' style={{marginLeft: '1rem', width: '7rem'}}
                        onClick={async () => {
                            const dataGalvanized = {
                                "id": idGalvanizedVeenerSelected,
                                "price": priceGalvanizedVeenerSelected
                            };

                            const response = await axios.put(
                                path + "api/v1/admin/prices/galvanized-veener",
                                dataGalvanized,
                                {headers}
                            );
                            if (response.status) {
                                window.location.reload();
                            }
                        }}
                >
                    Edit
                </Button>

            </div>

        </section>

    );
};

export default AdminPanel;
