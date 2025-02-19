import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

export default function GoogleMap() {
    const [center, setCenter] = useState({ lat: 32.040521451921904, lng: 34.77233961910294 })

    const zoom = 8

    const storesLocations = [
        { lat: 32.040521451921904, lng: 34.77233961910294 },
        { lat: 32.09000058822024, lng: 34.852677143517 },
        { lat: 31.946135148173017, lng: 34.788132465782624 },
        { lat: 32.81465329786846, lng: 34.984513081017 },
        { lat: 31.76237813186368, lng: 35.19935642675433 }
    ]

    function onHandleClick({ lat, lng }) {
        console.log('{ lat, lng }', { lat, lng })
        setCenter({ lat, lng })
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '70vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                center={center}
                storesLocations={storesLocations}
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
    )
}

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '22px' }}>{text}</div>;
