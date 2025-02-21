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

// 1) Formats two date strings (M/D/YYYY) into "20-25 May 2025"
function formatDateRange(checkinStr, checkoutStr) {
  const [startMonth, startDay, startYear] = checkinStr.split('/')
  const [endMonth, endDay, endYear] = checkoutStr.split('/')

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  const monthName = months[Number(startMonth) - 1] // e.g. "5" => "May"

  return `${startDay}-${endDay} ${monthName} ${startYear}`
}

// 2) Parse "M/D/YYYY" => JavaScript Date object
function parseDate(dateStr) {
  const [month, day, year] = dateStr.split('/')
  return new Date(Number(year), Number(month) - 1, Number(day))
}

// 3) Sort helper: Pending first, then by checkout date descending (newest first)
function sortReservations(reservations) {
  return [...reservations].sort((a, b) => {
    // Pending first
    if (a.status === 'pending' && b.status !== 'pending') return -1
    if (b.status === 'pending' && a.status !== 'pending') return 1

    // Otherwise, sort by checkout date descending
    const dateA = parseDate(a.checkout)
    const dateB = parseDate(b.checkout)
    // For descending order, subtract dateA from dateB
    return dateB - dateA
  })
}

export function Dashboard() {
  const reserves = useSelector((storeState) => storeState.reservationModule.reservations)
  const isLoading = useSelector((storeState) => storeState.reservationModule.isLoading)

  useEffect(() => {
    loadReservations()
  }, [])

  if (isLoading || !reserves) return <Loading />
  function onStatusChange(updateStatus, todoId) {
    const reserve = reserves.find((reserve) => reserve._id === todoId)
    if (!reserve) {
      console.error('Reservation not found')
      return
    }
    const updatedReserve = { ...reserve, status: updateStatus }
    updateReservation(updatedReserve)
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

      {/* Reservations Table */}
      <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="reservation table">
          <TableHead>
            <TableRow>
              <TableCell>Guest</TableCell>
              {/* Single "Dates" column */}
              <TableCell align="left">Dates</TableCell>
              <TableCell align="left">Booked</TableCell>
              <TableCell align="left">Listing</TableCell>
              <TableCell align="center">Total Price</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="center">Todo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedReserves.map((reserve) => {
              const statusClass = `status-${reserve.status.toLowerCase()}`

              return (
                <TableRow key={reserve._id}>
                  <TableCell>{reserve.user.name}</TableCell>
                  <TableCell align="left">
                    {formatDateRange(reserve.checkin, reserve.checkout)}
                  </TableCell>
                  <TableCell align="left">{reserve.host.name}</TableCell>
                  <TableCell align="left">{reserve.location.address}</TableCell>
                  <TableCell align="center">${reserve.price}</TableCell>
                  <TableCell align="left" className={statusClass}>
                    {reserve.status}
                  </TableCell>
                  <TableCell align="center" className="btn">
                    <Button
                      className="approved-btn"
                      onClick={() => onStatusChange('approved', reserve._id)}
                      disabled={reserve.status !== 'pending'}
                    >
                      approved
                    </Button>
                    <Button
                      className="decline-btn"
                      onClick={() => onStatusChange('declined', reserve._id)}
                      disabled={reserve.status !== 'pending'}
                    >
                      Decline
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  )
}
