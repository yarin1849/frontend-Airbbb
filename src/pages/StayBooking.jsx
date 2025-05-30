import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { StayBookingModal } from "../cmps/StayBookingModal"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addReservation } from "../store/actions/reservation.actions"
import { loadStay } from "../store/actions/stay.actions"
import { Loading } from "../cmps/Loading"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import SelectLabels from "../cmps/SelectLabels"
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function StayBooking() {
    const [gradient, setGradient] = useState("linear-gradient(90deg, #FF3366, #E61E6E)")
    const { stayId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [searchParams] = useSearchParams()
    const checkin = searchParams.get("checkin") || "2025-02-19"
    const checkout = searchParams.get("checkout") || "2025-02-26"
    const guests = searchParams.get("guests") || "1"
    const totalPrice = searchParams.get("totalPrice") || "1"
    const [isHovering, setIsHovering] = useState(false)

    const stay = useSelector((storeState) => storeState.stayModule.stay)
    const user = useSelector((storeState) => storeState.userModule.user) || { fullName: "Guest", email: "No email" }
    const { host, loc, name } = stay
    useEffect(() => {
        loadStay(stayId)
    }, [stayId])

    if (!stay) return <Loading />
    const handleConfirmBooking = async () => {
        if (!stay) return
        if (!user) return
        try {
            const savedReservation = await addReservation({ checkin, checkout, guests, totalPrice, host, loc, name, user })
            showSuccessMsg(`your reservation has been sent`)
            navigate('/reserve-status')
        } catch (err) {
            console.error("Failed to save reservation:", err)
            showErrorMsg("Something went wrong. Please try again.")
        }
    }

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

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const options = { month: "short", day: "numeric" }
        return date.toLocaleDateString("en-US", options)
    }

    const calculateFormattedDates = (checkin, checkout) => {
        const checkinDate = new Date(checkin)
        const checkoutDate = new Date(checkout)

        const checkinMonth = checkinDate.toLocaleDateString("en-US", { month: "short" })
        const checkoutMonth = checkoutDate.toLocaleDateString("en-US", { month: "short" })

        if (checkinMonth === checkoutMonth) {
            return `${formatDate(checkin)}-${checkoutDate.getDate()}`
        } else {
            return `${formatDate(checkin)} - ${formatDate(checkout)}`
        }
    }

    const getCancellationDate = (checkin, daysBefore) => {
        const checkinDate = new Date(checkin)
        checkinDate.setDate(checkinDate.getDate() - daysBefore)
        return formatDate(checkinDate.toISOString())
    }



    return (
        <div className="stay-booking">
            <div className="booking-confirm-details">
                <div className="booking-header">
                    <a href={`/details/${stayId}`} className="back-to-details-btn">
                        <img src={"https://res.cloudinary.com/du312ufuo/image/upload/v1739635520/back-arrow_s0yb92.svg"} />
                        {/* <ChevronLeft size={20} /> */}
                    </a>
                    <div className="booking-main-title">
                        <h1>Confirm and Pay</h1>
                    </div>
                </div>
                <div className="recommendation-container">
                    <div className="recommendation-description">
                        <span>This is a rare find.</span>
                        <p>{host.fullname}'s place is usually booked.</p>
                    </div>
                    <div className="recommendation-tag">
                        <img src={images[4]?.src} />
                    </div>
                </div>

                <div className="trip-details">
                    <h2>Your trip</h2>
                    <div className="booking-dates">
                        <h3>Dates</h3>
                        <span>{calculateFormattedDates(checkin, checkout)}</span>

                    </div>
                    <div className="booking-guests">
                        <h3>Guests</h3>
                        <span> {guests} {guests === "1" ? "guest" : "guests"}</span>
                    </div>
                    <hr />
                    <div className="booking-payment-method">
                        <div className="booking-payment-header">
                            <div className="booking-payment-text"><span>Pay with</span></div>
                            <div className="booking-payment-imgs">
                                <span><img src={"https://res.cloudinary.com/du312ufuo/image/upload/v1740568396/visa_cmcgaf.svg"} /></span>
                                <span><img src={"https://res.cloudinary.com/du312ufuo/image/upload/v1740568397/mastercard_gmswdz.svg"} /></span>
                                <span><img src={"https://res.cloudinary.com/du312ufuo/image/upload/v1740568397/AMEX_q9stcu.svg"} /></span>
                                <span><img src={"https://res.cloudinary.com/du312ufuo/image/upload/v1740568535/asset_3_rnczol.svg"} /></span>
                                <span><img src={"https://res.cloudinary.com/du312ufuo/image/upload/v1740568337/asset_4_an71bf.svg"} /></span>
                            </div>
                        </div>
                        <div className="booking-payment-select"><SelectLabels /></div>
                    </div>
                    <hr />
                    <div className="cancellation-policy">
                        <div className="cancellation-policy-header">
                            Cancellation policy
                        </div>
                        <div className="cancellation-policy-text">
                            <span>Free cancellation before {getCancellationDate(checkin, 7)}. </span>
                            Cancel before {getCancellationDate(checkin, 3)} for a partial refund.
                            <div className="learn-more-btn-container"><button className="learn-more-btn">
                                Learn more
                            </button></div>
                        </div>
                    </div>
                    <hr />
                    <div className="booking-ground-rules">
                        <div className="ground-rules-header">
                            Ground rules
                        </div>
                        <div className="ground-rules-text">
                            We ask every guest to remember a few simple things about what makes a great guest.
                        </div>
                        <div className="ground-rules-li-container">
                            <ul>
                                <li>Follow the house rules</li>
                                <li>Treat your Host’s home like your own</li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className="privacy-policy-text">
                        <div className="first-policy">By selecting the button below, I agree to the <span>Host's House Rules, Ground rules for guests, Airbnb's Rebooking and Refund Policy</span>, and that Airbnb can <span>charge my payment method</span> if I’m responsible for damage.</div>

                        <div className="second-policy">I also agree to the <span>updated Terms of Service, Payments Terms of Service</span>, and I acknowledge the <span>Privacy Policy.</span></div>
                    </div>
                </div>
                <div className="confirm-container">
                    <button
                        onClick={handleConfirmBooking}
                        className="confirm-button"
                        style={{ background: gradient }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}>
                        Confirm and pay
                    </button>
                </div>
            </div >

            <div className="booking-stay-details">
                <StayBookingModal stay={stay} />
            </div>
        </div >
    )
}


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
