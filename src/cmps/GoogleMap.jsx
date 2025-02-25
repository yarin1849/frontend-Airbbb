import React, { useEffect, useState } from "react"
import GoogleMapReact from "google-map-react"

export default function GoogleMap({ stay }) {
    const [center, setCenter] = useState({
        lat: stay?.loc?.lat ?? -12.992397,
        lng: stay?.loc?.lan ?? -38.454644
    })

    useEffect(() => {
        if (stay?.loc && stay.loc.lat !== undefined && stay.loc.lan !== undefined) {
            setCenter({ lat: stay.loc.lat, lng: stay.loc.lan })
        }
    }, [stay])

    const zoom = 14
    useEffect(() => {
        if (stay?.loc) {
            console.log("stay.loc.lat:", stay.loc.lat)
            console.log("stay.loc.lan:", stay.loc.lan)
        }
    }, [stay])

    function onHandleClick({ lat, lng }) {
        console.log("Clicked Location:", { lat, lng })
        setCenter({ lat, lng })
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
                        {stay?.loc?.lat !== undefined && stay?.loc?.lan !== undefined && (
                            <HouseIcon lat={stay.loc.lat} lng={stay.loc.lan} />
                        )}
                    </GoogleMapReact>
                </div>
            </div>
        </div>
    )
}

const HouseIcon = () => (
    <div style={{ width: "60px" }}>
        <
            img src={"https://res.cloudinary.com/du312ufuo/image/upload/v1740412900/klipartz.com_vmzint.png"}
            style={{ width: "100%" }}

        />
    </div>
)
