import React, { useState, useEffect } from 'react';
import { useUser } from '../lib/hooks';

export default function afterLogin() {
    const [errorMsg, setErrorMsg] = useState("");
    const [user] = useUser();
    const [Loader, updateLoad] = useState(false);
    const [msgAck, setMsgAck] = useState(false);
    const [astronauts, setAstronauts] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateLoad(true);
        const body = {
            message: e.currentTarget.message.value,
            name: user.name
        };
        const res = await fetch("/api/message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        if (res.status === 201) {
            setMsgAck(true);
            setTimeout(() => setMsgAck(false), 2500)
        } else {
            setErrorMsg(await res.text());
        }
        updateLoad(false);
        var msgForm = document.getElementById("msgForm");
        msgForm.reset();
    };



    fetch('//api.open-notify.org/astros.json').then(res => res.json())
        .then(data => {
            setAstronauts(data['people'])
        });
    

    return (
        <>
            <div className="row">
                <div className="col-sm-12">
                    <div className="card-text">
                        <h5>Click on <strong>Browse</strong> to take a look at different Astronomy Images of the Day. Click on <strong>Favorites </strong>
                            to view images you have saved.</h5>
                    </div>
                    <br></br>
                    
                    <table className="table caption-top">
                    <caption>Wow! These people are in space right now!</caption>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Spacecraft</th>
                            </tr>
                        </thead>
                        <tbody>
                            {astronauts.map(item => {
                                return (
                                    <tr key={item.name}>
                                        <td>{item.name}</td>
                                        <td>{item.craft}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>)
}
