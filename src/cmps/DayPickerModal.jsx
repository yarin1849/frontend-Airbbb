
import { DayPicker } from "react-day-picker"

export function DatePickerModal() {
    return (
        <div className="day-picker-modal">
            <DayPicker captionLayout="label" dir="ltr" min={1} mode="range" showOutsideDays timeZone="Asia/Jerusalem" />
            {/* <DayPicker captionLayout="label" dir="ltr" min={1} mode="range" showOutsideDays timeZone="Asia/Jerusalem" /> */}
        </div>

    )
}