
import { DayPicker } from "react-day-picker";

export function DatePickerModal() {
    return (
        <div className="date-picker-modal">
            <DayPicker captionLayout="label" dir="ltr" min={1} mode="range" showOutsideDays timeZone="Asia/Jerusalem" />
        </div>

    )
}