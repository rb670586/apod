import React, { useState, useEffect } from 'react';
import { useUser } from '../lib/hooks';

export default function afterLogin() {
    const [errorMsg, setErrorMsg] = useState("");
    const [user] = useUser();
    const [Loader, updateLoad] = useState(false);
    const [msgAck, setMsgAck] = useState(false);
    const [iss, setIss] = useState([]);

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


    useEffect(() => {
        fetch('https://api.wheretheiss.at/v1/satellites/25544').then(res => res.json())
            .then(data => {
                var latlong = []
                latlong.push(data['latitude'])
                latlong.push(data['longitude'])
                setIss(latlong)
            });
    }, []);


    return (
        <>
            <div className="row">
                <div className="col-sm-12">
                    <div className="card-text">
                        <h5>Click on <strong>Browse</strong> to take a look at different Astronomy Images of the Day. Click on <strong>Favorites </strong>
                            to view images you have saved.</h5>
                    </div>

                    <div className="card-text">
                        <h5 style={{ paddingTop: '3em' }}>Take a look at where the International Space Station is right now!</h5>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Latitude</th>
                                <th>Longitude</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{iss[0]}</td>
                                <td>{iss[1]}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </>)
}
