
import { DayPicker } from "react-day-picker"
import { useState } from "react"
export function DatePickerModal() {
    const [selected, setSelected] = useState(Date.now())
    console.log(selected)
    return (
        <div className="day-picker-modal">
            <DayPicker captionLayout="label" dir="ltr" min={1} mode="range" showOutsideDays timeZone="Asia/Jerusalem" selected={selected}
      onSelect={setSelected} />
            {/* <DayPicker captionLayout="label" dir="ltr" min={1} mode="range" showOutsideDays timeZone="Asia/Jerusalem" /> */}
        </div>

    )
}