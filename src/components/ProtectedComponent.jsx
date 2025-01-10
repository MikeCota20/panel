import React, { useEffect, useState } from "react";
import API from "../services/api";

const ProtectedComponent = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        API.get("/protected-route")
            .then(response => setMessage(response.data))
            .catch(error => setMessage("You have to be logged in to look at this content."));
    }, []);

    return <div>{message}</div>;
};

export default ProtectedComponent;
 