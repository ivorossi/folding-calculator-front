import React, {useState} from "react";
import {Button} from "react-bootstrap";
import BlackVeenerCalculator from "./BlackVeenerCalculator";
import GalvanizedVeenerCalculator from "./GalvanizedVeenerCalculator";


const Dashboard = () => {
    const [calculators, setCalculators] = useState([]);
    const [price, setPrice] = useState(0);

    function numberWithCommas(n) {
        let parts = n.toString().split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    }

    return (
        <div>
            <div style={buttons}>
                <label style={{color: "white", fontSize: '3rem', marginRight: "4rem"}}>
                    Total: {numberWithCommas(price)} $
                </label>
                <Button variant="outline-danger" style={button_Black_Veener} onClick={() => {
                    setCalculators([...calculators,
                        <BlackVeenerCalculator key={calculators.length} idPrice={calculators.length}/>])
                }}>
                    Chapa Negra
                </Button>

                <Button variant="outline-light" style={button_Galvanized_Veener} onClick={() => {
                    setCalculators([...calculators,
                        <GalvanizedVeenerCalculator key={calculators.length} idPrice={calculators.length}/>])
                }}>
                    Galvanizada
                </Button>

                <Button variant="outline-success" style={button_send} onClick={() => {
                    let priceTotal = 0;
                    calculators.map(calculator => {
                        let price = document.getElementById(calculator.key).valueOf().innerHTML;
                        priceTotal += parseInt(price.split("$")[0]);
                    })
                    setPrice(priceTotal);
                }}>
                    Calcular
                </Button>

                <Button variant="outline-warning" style={button_send} onClick={() => {
                    window.location.reload();
                }}>
                    Limpiar
                </Button>
            </div>
            {calculators}

        </div>
    );
};

export default Dashboard;


const buttons = {
    marginTop: "2rem",
    marginBottom: "2rem",
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",

}

const button_Black_Veener = {
    fontSize: '145%',
    marginRight: '5%'
}

const button_Galvanized_Veener = {
    fontSize: '145%',
}

const button_send = {
    fontSize: '145%',
    marginLeft: '4%'
}






