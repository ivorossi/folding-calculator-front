import React from "react";
import "./styles.css";

const Home = () => {
    return (
        <div style={cardStyle}>
            <h1>Welcome to UM Credits</h1>
        </div>
    );
};

export default Home;


const cardStyle = {
    width: '30%',
    textAlign: "center",
    borderRadius: '5% 5% 5% 5%',
    margin: '5% 0% 2% 35%',
    background: "#000",
    color: 'white',
}
