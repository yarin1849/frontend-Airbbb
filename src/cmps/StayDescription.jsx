import { makeLorem } from "../services/util.service";

export function StayDescription() {

    return (
        <div className="stay-description">{makeLorem()}</div>
    )
}