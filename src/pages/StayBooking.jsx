import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { StayBookingModal } from "../cmps/StayBookingModal"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addReservation } from "../store/actions/reservation.actions"
import { loadStay } from "../store/actions/stay.actions"

export function StayBooking() {
    const [gradient, setGradient] = useState("linear-gradient(90deg, #FF3366, #E61E6E)")
    const { stayId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [searchParams] = useSearchParams()
    const checkin = searchParams.get("checkin") || "2025-02-19"
    const checkout = searchParams.get("checkout") || "2025-02-26"
    const guests = searchParams.get("guests") || "1"


    const stay = useSelector((storeState) => storeState.stayModule.stay)
    const user = useSelector((storeState) => storeState.userModule.user) || { fullName: "Guest", email: "No email" }

    useEffect(() => {
        loadStay(stayId)
        // console.log('loadStay(stayId)', loadStay(stayId))
    }, [stayId])

    const handleConfirmBooking = async () => {
        if (!stay) return
        // if (!stay || !user) return

        try {
            const savedReservation = await dispatch(addReservation({ stayId: stay._id }))
            // const savedReservation = await dispatch(addReservation({ stayId: stay._id, userId: user._id }))
            navigate(`/order-confirmation/${savedReservation._id}`)
        } catch (err) {
            console.error("Failed to save reservation:", err)
        }
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



    return (
        <div className="stay-booking">
            <div className="booking-confirm-details">
                <div className="booking-header">
                    <button className="back-to-details-btn">
                        <ChevronLeft size={16} style={{ transform: "translate(-36.5%, -16%)" }} />
                    </button>
                    <div className="booking-main-title">
                        <h1>Confirm and Pay</h1>
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

                    <div className="confirm-container">
                        <button
                            onClick={handleConfirmBooking}
                            className="confirm-button"
                            style={{ background: gradient }}>
                            Confirm and pay
                        </button>
                    </div>
                </div>
            </div>

            <div className="booking-stay-details">
                <StayBookingModal stay={stay} />
            </div>
        </div>
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
