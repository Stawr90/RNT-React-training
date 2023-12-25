import React from "react";
import { Link } from "react-router-dom";

function Page404() {

    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "30px", height: "100vh"}}>
            <h1 style={{textAlign: 'center', fontSize: '36px'}}>Oops!</h1>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page does not exist</p>
            <Link style={{'position': 'relative', 'marginTop': '100px'}} to='/'><button className="info__btn">Back</button></Link>
        </div>
    );
}

export default Page404;