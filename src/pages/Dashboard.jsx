import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'
import { ReservationStatus } from '../cmps/ReservationStatus'
import { ResevationListing } from '../cmps/ResevationListing'
import { RevenewMonth } from '../cmps/RevenewMonth'
import { makeId } from '../services/util.service'
import {
  loadReservation,
  loadReservations,
  updateReservation,
} from '../store/actions/reservation.actions'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Loading } from '../cmps/Loading'
import { useState } from 'react'

// 1) Formats two date strings (M/D/YYYY) into "20-25 May 2025"
function formatDateRange(checkinStr, checkoutStr) {
  if (checkinStr.split('/').length === 1) {
    var [startYear, startMonth, startDay] = checkinStr.split('-')
    var [endYear, endMonth, endDay] = checkoutStr.split('-')
  } else {
    var [startMonth, startDay, startYear] = checkinStr.split('/')
    var [endMonth, endDay, endYear] = checkoutStr.split('/')

  }

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  const monthName = months[Number(startMonth) - 1] // e.g. "5" => "May"

  return `${startDay}-${endDay} ${monthName} ${startYear}`
}

// 2) Parse "M/D/YYYY" => JavaScript Date object
function parseDate(dateStr) {
  const [year, month, day] = dateStr.split('-')
  return new Date(Number(year), Number(month) - 1, Number(day))
}

// 3) Sort helper: Pending first, then by checkout date descending (newest first)
function sortReservations(reservations) {

  return [...reservations].sort((a, b) => {
    // Prioritize "pending" reservations
    if (a.status === "pending" && b.status !== "pending") return -1
    if (b.status === "pending" && a.status !== "pending") return 1

    // Convert checkout strings to Date objects
    const dateA = new Date(a.checkout)
    const dateB = new Date(b.checkout)

    // Sort by checkout date descending (newest first)
    return dateB - dateA
  })
}

function useIsNarrowScreen() {
  // console.log(document.documentElement.clientWidth)
  const [isNarrow, setIsNarrow] = useState(document.documentElement.clientWidth < 768)
  useEffect(() => {
    if (typeof document === 'undefined') return // Ensure it's running in the browser

    const handleResize = () => {
      setIsNarrow(document.documentElement.clientWidth < 768)
    }

    window.addEventListener('resize', handleResize) // Listen for changes

    return () => window.removeEventListener('resize', handleResize) // Cleanup on unmount
  }, [])

  return isNarrow
}

export function Dashboard() {
  let reserves = useSelector((storeState) => storeState.reservationModule.reservations)
  const isLoading = useSelector((storeState) => storeState.reservationModule.isLoading)
  const user = useSelector((storeState) => storeState.userModule.user)

  reserves = reserves.filter(reserve => reserve.host && String(reserve.host._id) === String(user._id))
  useEffect(() => {
    loadReservations()
  }, [])

  // Add this new useEffect for handling new reservations
  useEffect(() => {
    function handleNewReservation(data) {
      console.log("🔔 Received new reservation:", data)
      // Reload all reservations to include the new one
      loadReservations()
    }

    socketService.on("addReservation", handleNewReservation)

    return () => {
      socketService.off("addReservation", handleNewReservation)
    }
  }, [])

  const isNarrow = useIsNarrowScreen()
  if (isLoading || !reserves) return <Loading />

  function onStatusChange(updateStatus, todoId) {
    const reserve = reserves.find((reserve) => reserve._id === todoId)
    if (!reserve) {
      console.error('Reservation not found')
      return
    }
    const updatedReserve = { ...reserve, status: updateStatus }
    updateReservation(updatedReserve)

    socketService.emit("reservationStatusUpdate", {
      reservationId: updatedReserve._id,
      status: updatedReserve.status,
      userId: updatedReserve.user._id  // The user who made the reservation
    })
  }


  // Sort the reservations based on our criteria (pending first, then newest date)
  const sortedReserves = sortReservations(reserves)


  return (
    <section className="dashboard">
      <div className="dashboard-header">Reservations</div>

      {/* Stats Section with Three Cards */}
      <section className="dashboard-stats">
        <div className="stat-card">
          <h3>Revenue / month</h3>
          <RevenewMonth reserves={sortedReserves} />
        </div>
        <div className="stat-card">
          <h3>Reservations status</h3>
          <ReservationStatus reserves={sortedReserves} />
        </div>
        <div className="stat-card">
          <h3>Reservations / listing</h3>
          <ResevationListing reserves={sortedReserves} />
        </div>
      </section>

      {isNarrow ? (
        <>
          <h1 className='narrow-header'>Upcoming Trips</h1>
          <ul className="trip-list">
            {sortedReserves.map((row) => (
              <li className="trip-item" key={row._id}>
                <p><strong>Location:</strong> {row.location.city}, {row.location.country}</p>
                <p><strong>Host:</strong> {row.host?.name}</p>
                <p><strong>Guest:</strong> {row.user?.name}</p>
                <p><strong>Dates:</strong> {formatDateRange(row.checkin, row.checkout)}</p>
                <p><strong>status:</strong><span className={`status-${row.status}`}> {row.status}</span></p>
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
      ) : (
        <>
          {/* Reservations Table */}
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table sx={{ tableLayout: "fixed", width: "100%" }} aria-label="reservation table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "15%", fontWeight: "bold" }}>Guest</TableCell>
                  <TableCell sx={{ width: "15%", fontWeight: "bold" }}>Dates</TableCell>
                  <TableCell sx={{ width: "15%", fontWeight: "bold" }}>Booked</TableCell>
                  <TableCell sx={{ width: "20%", fontWeight: "bold" }}>Listing</TableCell>
                  <TableCell sx={{ width: "10%", fontWeight: "bold", textAlign: "center" }}>Total Price</TableCell>
                  <TableCell sx={{ width: "10%", fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ width: "15%", fontWeight: "bold", textAlign: "left" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedReserves.map((reserve) => (
                  <TableRow key={reserve._id} sx={{ height: "70px" }}>

                    {/* Guest Info */}
                    <TableCell sx={{ padding: "10px", whiteSpace: "nowrap" }}>
                      <div className="user-cell">
                        <img src={reserve.user?.img} className="user-img" alt="User" />
                        <span>{reserve.user?.name}</span>
                      </div>
                    </TableCell>

                    {/* Dates */}
                    <TableCell sx={{ padding: "10px" }}>
                      {formatDateRange(reserve.checkin, reserve.checkout)}
                    </TableCell>

                    {/* Host Info */}
                    <TableCell sx={{ padding: "10px", whiteSpace: "nowrap" }}>
                      {/* {console.log("Host Data:", reserve.host)} */}
                      <div className="user-cell">
                        <img src={reserve.host?.img} className="user-img" alt="Host" />
                        <span>{reserve.host?.name}</span>
                      </div>
                    </TableCell>

                    {/* Listing */}
                    <TableCell sx={{ padding: "10px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {reserve.location.address}
                    </TableCell>

                    {/* Total Price */}
                    <TableCell sx={{ padding: "10px", textAlign: "center" }}>
                      ${reserve.price}
                    </TableCell>

                    {/* Status */}
                    <TableCell sx={{ padding: "10px", textAlign: "left" }}>
                      <span className={`status-${reserve.status.toLowerCase()}`}>
                        {reserve.status}
                      </span>
                    </TableCell>

                    {/* Action Buttons */}
                    < TableCell sx={{ padding: "10px", textAlign: "center" }}>
                      <div className="btn-group">
                        <Button
                          className="approved-btn"
                          onClick={() => onStatusChange("approved", reserve._id)}
                          disabled={reserve.status !== "pending"}
                        >
                          APPROVED
                        </Button>
                        <Button
                          className="decline-btn"
                          onClick={() => onStatusChange("declined", reserve._id)}
                          disabled={reserve.status !== "pending"}
                        >
                          DECLINE
                        </Button>
                      </div>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table >
          </TableContainer >
        </>)
      }
    </section >
  )
}


