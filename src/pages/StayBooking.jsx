import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { StayBookingModal } from "../cmps/StayBookingModal"
import { useNavigate, useParams } from 'react-router-dom';
import { loadStay } from "../store/actions/stay.actions";
import { useSelector } from "react-redux";


const images = [
    {
        name: "back-arrow",
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739635520/back-arrow_s0yb92.svg"
    },
    {
        name: "envelope",
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739635520/envelope_kh85bk.svg"
    },
    {
        name: "google-icon",
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739635520/google-icon_gumgnk.svg"
    },
    {
        name: "verification-icon",
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739695908/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaH_4_plv6ui.svg"
    },
    {
        name: "diamond-icon",
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739697775/diamond_iuzl5x.svg"
    }
]

export function StayBooking() {
    const [gradient, setGradient] = useState("linear-gradient(90deg, #FF3366, #E61E6E)")
    const [isHovering, setIsHovering] = useState(false)
    // console.log('stayId', stayId)

    const { stayId } = useParams()
    const stay = useSelector(storeState => storeState.stayModule.stay)


    useEffect(() => {
        loadStay(stayId)
    }, [])



    const handleMouseMove = (ev) => {
        if (!isHovering) setIsHovering(true)

        const { left, top, width, height } = ev.currentTarget.getBoundingClientRect()
        const xPos = ((ev.clientX - left) / width) * 100
        const yPos = ((ev.clientY - top) / height) * 100

        setGradient(`radial-gradient(circle at ${xPos}% ${yPos}%, rgb(255, 51, 102), #E61E6E)`)
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
        setGradient("linear-gradient(90deg, #FF3366, #E61E6E)")
    }
    return (
        <div className="stay-booking">
            <div className="booking-confirm-details">
                <div className="booking-header">
                    {/* <button className="back-btn"><img src={images[0]?.src} /></button> */}
                    <button className="back-to-details-btn">
                        <ChevronLeft size={16} style={{ transform: "translate(-36.5%, -16%)" }} />
                    </button>
                    <div className="booking-main-title">
                        <h1>Confirm and Pay</h1>
                    </div>
                </div>
                <div className="booking-user-details-connected">
                    {/* <div className="booking-verification">
                    <h2>Hi, you’re logged in</h2>
                    <img src={images[3]?.src}></img>
                </div> */}
                    <div className="recommendation-container">
                        <div className="recommendation-description">
                            <span>This is a rare find.</span>
                            <p>Bros Lee's place is usually booked.</p>
                        </div>
                        <div className="recommendation-tag">
                            <img src={images[4]?.src} />
                        </div>
                    </div>
                </div>
                <div className="trip-details">
                    <h2>Your trip</h2>
                    <div className="booking-dates">
                        <h3>Dates</h3>
                        <span>Mar 1-6</span>
                    </div>
                    <div className="booking-guests">
                        <h3>Guests</h3>
                        <span>2 guest</span>
                    </div>
                    <hr></hr>
                    <div className="confirm-container">
                        <button
                            onClick={() => {
                                console.log("Navigating to stay:", stayId);
                                navigate(`/${stayId}`);
                            }}
                            className="confirm-button"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{ background: gradient }}>
                            Confirm and pay
                        </button>
                    </div>
                </div>
            </div>
            <div className="booking-stay-details">
                <StayBookingModal stay={stay} />
            </div>

            {/* <div className="booking-user-details-not-connected">
                <h3>Welcome back, Yarin</h3>
                <img src={images[1]?.src} />
                <span>ab*********98@gmail.com</span>
            </div> */}
        </div>
    )
}