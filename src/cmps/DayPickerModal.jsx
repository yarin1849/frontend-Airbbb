
import { DayPicker } from "react-day-picker"
import { useEffect, useState } from "react"
export function DatePickerModal({ setFilterByToEdit, FilterByToEdit }) {
    const [selected, setSelected] = useState({ from: null, to: null })
    useEffect(() => {
        handleChange()
    }, [selected])
    function handleChange() {
        console.log(selected)
        if (!selected.from || !selected.to) {
            return
        } else {
            setFilterByToEdit(prevFilter => ({ ...prevFilter, checkIn: formatDate(selected.from), checkOut: formatDate(selected.to) }))
           
        }
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
            <DayPicker captionLayout="label" dir="ltr" min={1} mode="range" showOutsideDays timeZone="Asia/Jerusalem" selected={selected}
                onSelect={setSelected} />
            {/* <DayPicker captionLayout="label" dir="ltr" min={1} mode="range" showOutsideDays timeZone="Asia/Jerusalem" /> */}
        </div>

    )
}