import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css"

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

    const formatDate = (date) => {
        if (!date) return ""
        const options = { year: 'numeric', month: 'short', day: 'numeric' }
        return new Date(date).toLocaleDateString("en-us", options)
    }

    useEffect(() => {
        const params = new URLSearchParams()
        params.set("checkin", checkIn)
        params.set("checkout", checkOut)
        params.set("guests", numGuests)
        setSearchParams(params)
    }, [checkIn, checkOut, numGuests, setSearchParams])


    const nightlyRate = stay.price
    const nights = Math.max((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24), 1)
    const fee = parseInt(stay.price * nights * 0.12)
    const totalPrice = nightlyRate * nights + fee


    const handleReserve = () => {
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

    const handleDateSelect = (range) => {
        if (!range?.from || !range?.to) {
            console.log("Invalid range selected")
            return
        }

        const formattedCheckIn = range.from.toISOString().split('T')[0]
        const formattedCheckOut = range.to.toISOString().split('T')[0]


        setCheckIn(formattedCheckIn)
        setCheckOut(formattedCheckOut)
        setIsDatePickerOpen(false)

        const params = new URLSearchParams(searchParams)
        params.set("checkin", formattedCheckIn)
        params.set("checkout", formattedCheckOut)
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

    // const handleDayClick = (day) => {
    //     if (focusedField === 'checkin') {
    //         const formattedCheckIn = day.toISOString().split('T')[0]
    //         setCheckIn(formattedCheckIn)
    //         setFocusedField('checkout')
    //     } else if (focusedField === 'checkout') {
    //         const formattedCheckOut = day.toISOString().split('T')[0]
    //         setCheckOut(formattedCheckOut)
    //         setIsDatePickerOpen(false)
    //     }
    // }

    const handleDayClick = (day) => {
        const formattedDate = day.toISOString().split("T")[0]

        if (!checkIn || (checkIn && checkOut)) {
            setCheckIn(formattedDate)
            setCheckOut(null)
        } else if (!checkOut && day > new Date(checkIn)) {
            setCheckOut(formattedDate)
            setHoveredDate(null)
            console.log('setIsDatePickerOpen(false)', setIsDatePickerOpen(false))
            setIsDatePickerOpen(false)

        }
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
                        <input type="date" value={checkIn} onChange={(ev) => setCheckIn(ev.target.value)} />
                    </div>
                    <div onClick={() => handleDatePickerClick('checkout')}>
                        <label>CHECKOUT</label>
                        <input type="date" value={checkOut} onChange={(ev) => setCheckOut(ev.target.value)} />
                    </div>
                </div>

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

            {isDatePickerOpen && (
                <div className="date-picker-modal-reserve">
                    <div className="date-picker-header">
                        <div className="date-picker-vacation-time">
                            <span>{nights} nights</span>
                            <span>{formatDate(checkIn)} - {formatDate(checkOut)}</span>
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
                        modifiers={{
                            range: checkIn && hoveredDate
                                ? { from: new Date(checkIn), to: new Date(hoveredDate) }
                                : undefined,
                        }}
                        modifiersClassNames={{
                            selected: "my-selected-day",
                            range: "my-hovered-range",
                        }}
                    />
                    <div className="date-picker-footer">
                        <button className="date-picker-clear-dates" onClick={() => handleDateSelect({ from: null, to: null })}>
                            Clear dates
                        </button>
                        <button className="date-picker-close-button" onClick={() => setIsDatePickerOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}

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
                <div><span className="nightly-rate-calc">${nightlyRate} x {nights} nights</span><span> ${nightlyRate * nights}</span></div>
                <div><span className="nightly-service-fee">Airbnb service fee</span><span> ${fee}</span></div>
                <hr />
                <div className="total"><span>Total</span>
                    <span>${totalPrice}</span></div>
            </div>
        </div>
    )
}
