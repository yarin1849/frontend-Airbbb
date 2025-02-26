import { formatDateRange } from '../services/util.service'

export function ReservationStatusIsNarrowPreview({ data }) {
    return (
        <section>
            {
                data.map((row) => (
                    <li className="trip-item" key={row._id}>
                        <p><strong>Location:</strong> {row.location.city}, {row.location.country}</p>
                        <p><strong>Host:</strong> <span>{row.host?.name ?
                            row.host.name.charAt(0).toUpperCase() + row.host.name.slice(1).toLowerCase()
                            : ""
                        }</span></p>
                        <p><strong>Guest:</strong> <span>{
                            row.user?.name
                                ? row.user.name.charAt(0).toUpperCase() + row.user.name.slice(1).toLowerCase()
                                : ""
                        }</span></p>
                        <p><strong>Dates:</strong> {formatDateRange(row.checkin, row.checkout)}</p>
                        <p><strong>Status:</strong>
                            <span className={`status-${row.status.toLowerCase()}`}> {row.status}</span>
                        </p>
                    </li>
                ))
            }
        </section>
    )
}