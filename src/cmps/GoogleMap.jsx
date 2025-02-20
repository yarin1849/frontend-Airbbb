import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

export default function GoogleMap() {
    const [center, setCenter] = useState({ lat: 32.040521451921904, lng: 34.77233961910294 });

    const zoom = 12;

    const storesLocations = [
        { lat: 32.040521451921904, lng: 34.77233961910294 },
    ];

    function onHandleClick({ lat, lng }) {
        console.log('{ lat, lng }', { lat, lng });
        setCenter({ lat, lng });
    }

    return (
        <div className="google-map">
            <div className="map-container">
                <div className="map-wrapper">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "" }}
                        center={center}
                        defaultZoom={zoom}
                        onClick={onHandleClick}
                    >
                        {storesLocations.map((store, index) => (
                            <AnyReactComponent
                                key={index}
                                lat={store.lat}
                                lng={store.lng}
                                text="🏠"
                            />
                        ))}
                    </GoogleMapReact>
                </div>
            </div>
        </div>
    )
}

const AnyReactComponent = ({ text }) => (
    <div style={{ fontSize: '22px' }}>{text}</div>
)

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    },
    mapWrapper: {
        height: '70vh',
        width: '90%',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    }
}
