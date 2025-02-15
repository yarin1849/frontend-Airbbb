import { ChevronLeft, ChevronRight } from "lucide-react"

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
    }
]

export function StayBooking() {
    return (
        <div className="stay-booking">
            <div className="booking-header">
                {/* <button className="back-btn"><img src={images[0]?.src} /></button> */}
                <button className="back-to-details-btn">
                    <ChevronLeft size={16} style={{ transform: "translate(-36.5%, -16%)" }} />
                </button>
                <div className="booking-main-title">
                    <h1>Confirm and Pay</h1>
                </div>
            </div>
            <h2>Your trip</h2>
            <div className="booking-dates">
                <h3>Dates</h3>
                <span>Mar 1-6</span>
            </div>
            <div className="booking-guests">
                <h3>Dates</h3>
                <span>Mar 1-6</span>
            </div>
            <div className="booking-user-details-not-connected">
                <h3>Welcome back, Yarin</h3>
                <img src={images[1]?.src} />
                <span>ab*********98@gmail.com</span>
            </div>

        </div >
    )
}