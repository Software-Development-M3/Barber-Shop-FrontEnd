import React, { useEffect, useState } from "react";
import './Allservice.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Allservices() {
    const { shopid } = useParams();
    const [services, setServices] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/shop/service/${shopid}`);
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error("Fetching Error:", error);
            }
        };
        fetchData();
    }, [shopid]);

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="shopAllServicesBody">
            {services ? (
                <>
                    {/* Haircut Table */}
                    <table className="serviceTable">
                        <thead>
                            <tr>
                                <th>Hair Style</th>
                                <th>Duration (mins)</th>
                                <th>Price (THB)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.haircut && services.haircut.map((haircut) => (
                                <tr key={haircut.id}>
                                    <td>{haircut.serviceName}</td>
                                    <td>{haircut.duration}</td>
                                    <td>{haircut.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Hair Dyeing Table */}
                    <table className="serviceTable">
                        <thead>
                            <tr>
                                <th>Hair Dyeing</th>
                                <th>Duration (mins)</th>
                                <th>Price (THB)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.hairdyeing && services.hairdyeing.map((hairdyeing) => (
                                <tr key={hairdyeing.id}>
                                    <td>{hairdyeing.serviceName}</td>
                                    <td>{hairdyeing.duration}</td>
                                    <td>{hairdyeing.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Hair Washing Table */}
                    <table className="serviceTable">
                        <thead>
                            <tr>
                                <th>Hair Washing</th>
                                <th>Duration (mins)</th>
                                <th>Price (THB)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.hairwashing && services.hairwashing.map((hairwash) => (
                                <tr key={hairwash.id}>
                                    <td>{hairwash.serviceName}</td>
                                    <td>{hairwash.duration}</td>
                                    <td>{hairwash.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* {shampoos} */}
                    <table className="serviceTable">
                        <thead>
                            <tr>
                                <th>Shampoo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.shampoos && services.shampoos.map((shampoo) => (
                                <tr>
                                    <td>{shampoo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* hair colors */}
                    <table className="serviceTable">
                        <thead>
                            <tr>
                                <th>Colors</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.colors && services.colors.map((color) => (
                                <tr>
                                    <td>{color}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <p>Pending...</p>
            )}
            <div className="BackButt" onClick={() => handleNavigate(`/shop/${shopid}`)}>
                <button>ไปหน้าร้านค้า</button>
            </div>
        </div>
    );
}

export default Allservices;
