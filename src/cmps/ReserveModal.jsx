import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { formatCurrency } from "../services/util.service"
import { DayPicker } from "react-day-picker"
import { GuestsModal } from '../cmps/GuestsModal'
import "react-day-picker/style.css"
import { calculateGradient, resetGradient } from '../services/util.service';

export function ReserveModal({ stay, checkin, checkout, guests }) {

    const navigate = useNavigate()
    const { stayId } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    const parsedGuests = Math.max(1, parseInt(guests) || 1)

    const [checkIn, setCheckIn] = useState(checkin)
    const [checkOut, setCheckOut] = useState(checkout)
    const [numGuests, setNumGuests] = useState(parsedGuests)
    const [gradient, setGradient] = useState("linear-gradient(90deg, #FF3366, #E61E6E)")
    const [isHovering, setIsHovering] = useState(false)
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const [focusedField, setFocusedField] = useState(null)
    const [hoveredDate, setHoveredDate] = useState(null)

    useEffect(() => {
        const params = new URLSearchParams()
        params.set("checkin", checkIn)
        params.set("checkout", checkOut)
        params.set("guests", numGuests)
        setSearchParams(params)
    }, [checkIn, checkOut, numGuests, setSearchParams])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const checkinParam = params.get("checkin")
        const checkoutParam = params.get("checkout")

        if (checkinParam != "null") {
            setCheckIn(checkinParam)
        } else {
            setCheckIn(formatDateMMDDYYYY(new Date()))
        }

        if (checkinParam != "null") {
            setCheckOut(checkoutParam)
        } else {
            const fiveMoreDays = new Date()
            fiveMoreDays.setDate(fiveMoreDays.getDate() + 5)
            setCheckOut(formatDateMMDDYYYY(fiveMoreDays))
        }
    }, [])


    const nightlyRate = parseInt(stay.price)
    const nights = parseInt(Math.max((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24), 1))
    const fee = parseInt(stay.price * nights * 0.12)
    const totalPrice = parseInt(nightlyRate * nights + fee)

    const formatDate = (date) => {
        if (!date) return ""
        const options = { year: 'numeric', month: 'short', day: 'numeric' }
        return new Date(date).toLocaleDateString("en-us", options)
    }

    const handleReserve = () => {

        if (checkin == "null" || checkout == "null") {
            setIsDatePickerOpen(true)
            setFocusedField(!checkIn ? "checkin" : "checkout")
            return
        }

        const params = new URLSearchParams()
        params.set('checkin', checkIn)
        params.set('checkout', checkOut)
        params.set('guests', guests)
        params.set("price", nightlyRate)
        params.set("nights", nights)
        params.set("fee", fee)
        params.set("totalPrice", totalPrice)
        navigate(`/${stayId}/booking?${params.toString()}`)
    }

    const handleClearDates = () => {
        setCheckIn(null)
        setCheckOut(null)
        setHoveredDate(null)

        const params = new URLSearchParams(searchParams)
        params.delete("checkin")
        params.delete("checkout")
        setSearchParams(params)
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

    const handleDatePickerClick = (field) => {
        setFocusedField(field)
        setIsDatePickerOpen(true)
    }

    const formatDateMMDDYYYY = (date) => {
        const d = new Date(date)
        const month = String(d.getMonth() + 1).padStart(2, "0")
        const day = String(d.getDate()).padStart(2, "0")
        const year = d.getFullYear()

        return `${month}/${day}/${year}`
    }


    const handleDayClick = (day) => {
        const formattedDate = formatDateMMDDYYYY(day)

        if (!checkIn || (checkIn && checkOut)) {
            setCheckIn(formattedDate)
            setCheckOut(null)
            setHoveredDate(null)
        } else if (!checkOut && day > new Date(checkIn)) {
            setCheckOut(formattedDate)
            setHoveredDate(null)
            setIsDatePickerOpen(false)
        } else {
            setCheckIn(formattedDate)
            setCheckOut(null)
            setHoveredDate(null)
        }

        const params = new URLSearchParams(searchParams)
        params.set("checkin", checkIn)
        params.set("checkout", checkOut)
        setSearchParams(params)
    }

    const handleDayHover = (day) => {
        if (checkIn && !checkOut && day > new Date(checkIn)) {
            setHoveredDate(day)
        } else {
            setHoveredDate(null)
        }
    }

    return (
        <div className="reserve-modal">
            <div className="price-per-night">
                <span>${nightlyRate}</span>
                <span>night</span>
            </div>
            <div className="modal-info-selector">
                <div className="date-selector">
                    <div onClick={() => handleDatePickerClick('checkin')}>
                        <label>CHECK-IN</label>
                        <input
                            type="text"
                            value={checkIn ? checkIn : "MM/DD/YYYY"}
                            readOnly
                            onClick={() => handleDatePickerClick('checkin')}
                        />
                    </div>
                    <div onClick={() => handleDatePickerClick('checkout')}>
                        <label>CHECKOUT</label>
                        <input
                            type="text"
                            value={checkOut ? checkOut : "MM/DD/YYYY"}
                            readOnly
                            onClick={() => handleDatePickerClick('checkout')}
                        />
                    </div>
                </div>

                {/* <div className="guest-selector" onClick={() => setIsGuestsModalOpen(true)}>
                    <label>GUESTS</label>
                    <span>{numGuests} guest{numGuests > 1 ? "s" : ""}</span>
                </div>
                {isGuestsModalOpen && (
                    <GuestsModal
                        numGuests={numGuests}
                        onClose={() => setIsGuestsModalOpen(false)}
                        onConfirm={(newGuests) => {
                            setNumGuests(newGuests)
                            setIsGuestsModalOpen(false)
                        }}
                    />
                )} */}
                <div className="guest-selector">
                    <label>GUESTS</label>
                    <select value={numGuests} onChange={(ev) => setNumGuests(Number(ev.target.value))}>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                            <option key={num} value={num}>
                                {num} guest{num > 1 ? "s" : ""}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {
                isDatePickerOpen && (
                    <div className="date-picker-modal-reserve">
                        <div className="date-picker-header">
                            <div className="date-picker-vacation-time">
                                <span className="date-picker-nights">{nights > 1 ? `${nights} nights` : `${nights} night`}</span>
                                <span className="date-picker-checking">{formatDate(checkIn)} - {formatDate(checkOut)}</span>
                            </div>
                            <div className="date-inputs">
                                <div className="date-input">
                                    <label>CHECK-IN</label>
                                    <span>{checkIn || "Select date"}</span>
                                </div>
                                <div className="date-input">
                                    <label>CHECKOUT</label>
                                    <span>{checkOut || "Select date"}</span>
                                </div>
                            </div>
                        </div>
                        <DayPicker
                            captionLayout="label"
                            numberOfMonths={2}
                            dir="ltr"
                            mode="single"
                            showOutsideDays
                            timeZone="Asia/Jerusalem"
                            pagedNavigation
                            fixedWeeks
                            selected={checkIn ? new Date(checkIn) : undefined}
                            onDayClick={handleDayClick}
                            onDayMouseEnter={handleDayHover}
                            disabled={[{ before: new Date().setHours(0, 0, 0, 0) }]}
                            modifiers={{
                                checkInDay: checkIn ? new Date(checkIn) : undefined,
                                checkOutDay: checkOut ? new Date(checkOut) : undefined,
                                inRange: checkIn && checkOut
                                    ? { from: new Date(checkIn), to: new Date(checkOut) } : checkIn
                                        ? { from: new Date(checkIn), to: new Date(checkIn) } : undefined,
                                hoveredRange: checkIn && hoveredDate
                                    ? { from: new Date(checkIn), to: new Date(hoveredDate) } : undefined,
                                disabled: { before: new Date() },
                            }}
                            modifiersClassNames={{
                                inRange: "my-hovered-range",
                                hoveredRange: "my-hovered-range",
                                checkInDay: "check-in-day",
                                checkOutDay: "check-out-day",
                                disabled: "rdp-day_disabled",
                            }}
                        />
                        <div className="date-picker-footer">
                            <button className="date-picker-clear-dates" onClick={() => handleClearDates(null)}>
                                Clear dates
                            </button>
                            <button className="date-picker-close-button" onClick={() => setIsDatePickerOpen(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                )
            }

            <button
                onClick={handleReserve}
                className="reserve-button"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ background: gradient }}>
                Reserve
            </button>

            <p className="disclaimer">You won’t be charged yet</p>
            <div className="pricing-calculate">
                <div><span className="nightly-rate-calc">{formatCurrency(nightlyRate)} x {nights} nights</span><span> {formatCurrency(nightlyRate * nights)}</span></div>
                <div><span className="nightly-service-fee">Airbnb service fee</span><span> {formatCurrency(fee)}</span></div>
                <hr />
                <div className="total"><span>Total</span>
                    <span>{formatCurrency(totalPrice)}</span></div>
            </div>
        </div>
    )
}

