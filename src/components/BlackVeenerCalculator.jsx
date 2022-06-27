import React from "react";
import {Form, Table} from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";


let typeManufacture = "";
let veenerThickness = "";

const BlackVeenerCalculator = ({idPrice}) => {
    const path = 'https://foldingcalculator.herokuapp.com/';
    const [price, setPrice] = React.useState(0);
    const [long, setLong] = React.useState(0);
    const [width, setWidth] = React.useState(0);
    const [amount, setAmount] = React.useState(0);
    const cookies = new Cookies();

    function handleChangeLong(e) {
        setLong(e.target.value);
    }

    function handleChangeWidth(e) {
        setWidth(e.target.value);
    }

    function handleChangeAmount(e) {
        setAmount(e.target.value);
    }

    async function handleChangeVeenerThickness(e) {
        veenerThickness = e.target.value;

        await getDataCalculator();
    }

    async function handleChangeTypeManufacture(e) {
        typeManufacture = e.target.value;
        await getDataCalculator();
    }

    function getDataCalculator() {
        const headers = {
            "content-type": "application/json",
            Authorization: "Bearer " + cookies.get("token")
        };

        if (typeManufacture === "Manufactura" || typeManufacture === "") {
            return;
            if (veenerThickness === "Espesor" || veenerThickness === "") {
                return;
            }
        }

        const data = {
            high: eval(long),
            width: eval(width),
            typeManufacture: typeManufacture,
            amount: amount,
            veenerThickness: veenerThickness
        }

        axios.post(path + "api/v1/black",
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
                    <th>Largo</th>
                    <th>Ancho</th>
                    <th>Cantidad</th>
                    <th>Espesor</th>
                    <th>Manufactura</th>
                    <th>Precio</th>

                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            id="long"
                            placeholder="Largo"
                            name="long"
                            value={long}
                            onChange={handleChangeLong}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            id="width"
                            placeholder="Ancho"
                            name="width"
                            value={width}
                            onChange={handleChangeWidth}
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
                        <Form.Select aria-label="Default select example" onChange={handleChangeVeenerThickness}>
                            <option value="Espesor">Espesor</option>
                            <option value="24">24</option>
                            <option value="22">22</option>
                            <option value="20">20</option>
                            <option value="18">18</option>
                            <option value="16">16</option>
                            <option value="14">14</option>
                            <option value="12">12</option>
                            <option value="1/8">1/8</option>
                            <option value="3/16">3/16</option>
                        </Form.Select>
                    </td>
                    <td>
                        <Form.Select aria-label="Default select example" onChange={handleChangeTypeManufacture}>
                            <option value="Manufactura">Manufactura</option>
                            <option value="MMOP">MMOP</option>
                            <option value="MMOL">MMOL</option>
                            <option value="MOP">MOP</option>
                            <option value="MOL">MOL</option>
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

export default BlackVeenerCalculator;


const table_style = {
    backgroundColor: '#CF3232',
    width: '90%',
    marginLeft: '5%',
}


