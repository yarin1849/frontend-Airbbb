import { useState } from "react";
import { makeLorem } from "../services/util.service";


export function StayDescription() {
    const [isExpanded, setIsExpanded] = useState(false)
    const fullText = makeLorem(200)
    const maxLength = 560

    const displayedText = isExpanded ? fullText : fullText.slice(0, maxLength) + (fullText.length > maxLength ? " ..." : "");

    return (
        <div className="stay-description">
            <p>{displayedText}</p>
            {fullText.length > maxLength && (
                <button className="btn-description" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? "Show less" : "Show more"}
                </button>
            )
            }
        </div>
    )
}