import * as React from 'react'
import { ReservationStatus } from '../cmps/ReservationStatus'
import { ResevationListing } from '../cmps/ResevationListing'
import { RevenewMonth } from '../cmps/RevenewMonth'
import {
  loadReservation,
  loadReservations,
  updateReservation,
} from '../store/actions/reservation.actions'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Loading } from '../cmps/Loading'
import { useState } from 'react'
import { DashbordIsNarrow } from '../cmps/DashbordIsNarrow'
import { DashbordTable } from '../cmps/DashbordTable'
// import {useIsNarrowScreen, formatDateRange, parseDate, sortByPendingFirst} from '../services/util.service'

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
        <DashbordIsNarrow data={sortedReserves} onStatusChange={onStatusChange}/>
        
  ) : (
    <DashbordTable data={sortedReserves} onStatusChange={onStatusChange}/> )
}
    </section >
  )
}


