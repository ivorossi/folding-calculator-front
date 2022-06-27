import React from "react";
import {Form, Table} from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";

let veenerType = "";

const GalvanizedVeenerCalculator = ({idPrice}) => {
    const path = 'https://foldingcalculator.herokuapp.com/';
    const [price, setPrice] = React.useState(0);
    const [longitude, setLongitude] = React.useState(0);
    const [development, setDevelopment] = React.useState(0);
    const [amount, setAmount] = React.useState(0);
    const cookies = new Cookies();

    function handleChangeLongitude(e) {
        setLongitude(e.target.value);
    }

    function handleChangeDevelopment(e) {
        setDevelopment(e.target.value);
    }

    function handleChangeAmount(e) {
        setAmount(e.target.value);
    }

    async function handleChangeVeenerType(e) {
        veenerType = e.target.value;
        await getDataCalculator();
    }


    function getDataCalculator() {
        const headers = {
            "content-type": "application/json",
            Authorization: "Bearer " + cookies.get("token")
        };

        if (veenerType === "Tipo De Chapa" || veenerType === "") {
            return;
        }

        const data = {
            high: longitude,
            developing: eval(development),
            amount: amount,
            typeVeener: veenerType
        }

        axios.post(path + "api/v1/galvanized",
            data,
            {headers}).then(
            response => {
                setPrice(Math.round(response.data));
            }
        );
    }

    return (
        <div>
            <Table striped bordered hover style={table_style}>
                <thead>
                <tr>
                    <th>Desarrollo</th>
                    <th>Longitud</th>
                    <th>Cantidad</th>
                    <th>Tipo de Chapa</th>
                    <th>Precio</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            id="development"
                            placeholder="Desarrollo"
                            name="development"
                            value={development}
                            onChange={handleChangeDevelopment}
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            min="0"
                            pattern="^[0-9]+"
                            className="form-control"
                            id="longitude"
                            placeholder="Longitud"
                            name="longitude"
                            value={longitude}
                            onChange={handleChangeLongitude}
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            min="0"
                            pattern="^[0-9]+"
                            className="form-control"
                            id="amount"
                            placeholder="Cantidad"
                            name="amount"
                            value={amount}
                            onChange={handleChangeAmount}
                        />
                    </td>
                    <td>
                        <Form.Select aria-label="Default select example" onChange={handleChangeVeenerType}>
                            <option>Tipo de Chapa</option>
                            <option value="prepintada">Pre-Pintado</option>
                            <option value="galv.25">Galvanizada 25</option>
                            <option value="galv.22">Galvanizada 22</option>
                        </Form.Select>
                    </td>
                    <td style={{textAlign: 'center'}}>
                        <label id={idPrice} style={{fontWeight: 'bold'}}>
                            {price} $
                        </label>
                    </td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default GalvanizedVeenerCalculator;


const table_style = {
    backgroundColor: 'white',
    width: '90%',
    marginLeft: '5%',
}


