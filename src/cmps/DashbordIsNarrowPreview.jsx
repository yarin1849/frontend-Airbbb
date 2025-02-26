import { formatCurrency, formatDateRange } from '../services/util.service'
import { Button } from '@mui/material'
export function DashbordIsNarrowPreview({ data, onStatusChange }) {
  return (
    <>
      <h1 className='narrow-header'>Reservations</h1>
      <ul className="trip-list">
        {data.map((row) => (
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
            <p><strong>status:</strong><span className={`status-${row.status}`}> {row.status}</span></p>
            <p><strong>Price:</strong><span> {formatCurrency(row.price)}</span></p>
            <p><strong>Action:</strong><span className="btn-group">
              <Button
                className="approved-btn"
                onClick={() => onStatusChange("approved", row._id)}
                disabled={row.status !== "pending"}
              >
                APPROVED
              </Button>
              <Button
                className="decline-btn"
                onClick={() => onStatusChange("declined", row._id)}
                disabled={row.status !== "pending"}
              >
                DECLINE
              </Button></span></p>
          </li>
        ))}
      </ul>
    </>
  )
}