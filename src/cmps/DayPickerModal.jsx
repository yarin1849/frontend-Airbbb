
import { DayPicker } from "react-day-picker"
import { useEffect, useState } from "react"
export function DatePickerModal({ setFilterByToEdit, FilterByToEdit, next }) {
    const [selected, setSelected] = useState({ from: null, to: null })
    const [hoveredDate, setHoveredDate] = useState(null)
    useEffect(() => {
        handleChange()
    }, [selected])

    function handleChange() {
        if (!selected.from || !selected.to) {
            return
        } else {
            moveToNext()
            setFilterByToEdit(prevFilter => ({ ...prevFilter, checkIn: formatDate(selected.from), checkOut: formatDate(selected.to) }))

        }
    }

    function handleSelect(day) {
        if (!selected.from || (selected.from && selected.to)) {
            // Select from date
            setSelected({ from: day, to: null })
        } else if (selected.from && !selected.to && day > selected.from) {
            // Select to date
            setSelected(prevState => ({ ...prevState, to: day }))
        }
    }

    function handleDayHover() {
        (day) => {
            console.log(day)
            if (selected.from && !selected.to && day > new Date.now()) {
                setHoveredDate(day)
            } else {
                setHoveredDate(null)
            }
        }
    }

    function moveToNext() {
        console.log(next)
        next.focus()
    }

    function formatDate(date) {
        const d = new Date(date)
        const month = d.getMonth() + 1
        const day = d.getDate()
        const year = d.getFullYear()
        return `${month}/${day}/${year}`
    }
    return (
        <div className="day-picker-modal">
            <DayPicker
                captionLayout="label"
                numberOfMonths={2}
                dir="ltr"
                mode="single"
                showOutsideDays
                timeZone="Asia/Jerusalem"
                pagedNavigation
                fixedWeeks
                selected={selected}
                onSelect={handleSelect}
                onDayMouseEnter={handleDayHover}
                disabled={[{ before: new Date().setHours(0, 0, 0, 0) }]}
                modifiers={{
                    checkInDay: selected.from ? selected.from : null,
                    checkOutDay: selected.to ? selected.to : null,
                    inRange: checkIn && checkOut
                        ? { from: selected.from, to: selected.to } : from,
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
        </div>

    )
}