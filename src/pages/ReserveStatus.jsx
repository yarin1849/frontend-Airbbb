import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadReservations } from '../store/actions/reservation.actions'
import { socketService } from '../services/socket.service'
import { Loading } from '../cmps/Loading'

// ✅ Format date range display (same format as original)
function formatDateRange(checkinStr, checkoutStr) {
    if (checkinStr.includes('-')) {
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
    const monthName = months[Number(startMonth) - 1]

    return `${startDay}-${endDay} ${monthName} ${startYear}`
}

// ✅ Parse "YYYY-M-D" or "M/D/YYYY" to JavaScript Date
function parseDate(dateStr) {
    if (dateStr.includes('-')) {
        const [year, month, day] = dateStr.split('-')
        return new Date(+year, +month - 1, +day)
    } else {
        const [month, day, year] = dateStr.split('/')
        return new Date(+year, +month - 1, +day)
    }
}

// ✅ Sort reservations: Pending first, then by checkout date (newest first)
function sortByPendingFirst(reservations) {
    return [...reservations].sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1
        if (b.status === 'pending' && a.status !== 'pending') return 1
        return new Date(b.checkout) - new Date(a.checkout)
    })
}

export function ReserveStatus() {
    const isLoading = useSelector((storeState) => storeState.reservationModule.isLoading)
    const user = useSelector((storeState) => storeState.userModule.user)
    const allReservations = useSelector((storeState) => storeState.reservationModule.reservations)

    // ✅ Filter reservations for the logged-in user
    const userReservations = allReservations.filter(reserve => 
        reserve.user && String(reserve.user._id) === String(user._id)
    )

    // ✅ Store reservations in local state for real-time updates
    const [reservations, setReservations] = useState(sortByPendingFirst(userReservations))

    // ✅ Load reservations when component mounts
    useEffect(() => {
        loadReservations()
    }, [])

    // ✅ Sync reservations from Redux store when they change
    useEffect(() => {
        setReservations(sortByPendingFirst(userReservations))
    }, [allReservations])

    // ✅ WebSocket listener for real-time updates
    useEffect(() => {
        function handleReservationUpdate(updatedData) {
            console.log("🔔 Received update:", updatedData) // Confirm the event is received
            setReservations((prevReservations) => {
                console.log("🔍 Previous reservations:", prevReservations) // Check current reservations
                const updatedReservations = prevReservations.map(reserve =>
                    reserve._id === updatedData.reservationId
                        ? { ...reserve, status: updatedData.status }
                        : reserve
                )
                console.log("🆕 Updated reservations:", updatedReservations) // Verify changes before updating state
                return updatedReservations
            })
        }
        console.log('reservationStatus update')
        socketService.on("reservationStatusUpdate", handleReservationUpdate)
    
        return () => {
            console.log("🔴 Removing listener for reservationStatusUpdate") // Debugging unmount
            socketService.off("reservationStatusUpdate", handleReservationUpdate)
        }
    }, [])
    
    

    if (isLoading || !reservations) return <Loading />

    // ✅ Today's date for filtering upcoming trips
    const today = new Date()

    // ✅ Separate reservations into "Upcoming" & "All"
    const upcomingTrips = reservations.filter(row => parseDate(row.checkout) >= today)
    const sortedUpcoming = sortByPendingFirst(upcomingTrips)
    const sortedAll = sortByPendingFirst(reservations)

    return (
        <section className="reserve-status">
            <h1>Trips</h1>

            {/* ----------- 1) Upcoming Trips ----------- */}
            <h2>Upcoming Trips</h2>
            <TableContainer component={Paper} sx={{ maxHeight: 300, mb: 4 }}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="Upcoming Trips Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Destination</TableCell>
                            <TableCell align="left">Host</TableCell>
                            <TableCell align="left">Dates</TableCell>
                            <TableCell align="left">Booked By</TableCell>
                            <TableCell align="left">Total Price</TableCell>
                            <TableCell align="left">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedUpcoming.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell>{row.location.city}, {row.location.country}</TableCell>
                                <TableCell align="left">
                                    <div className="user-cell">
                                        <img src={row.host?.img} className="user-img" alt="Host" />
                                        {row.host?.name}
                                    </div>
                                </TableCell>
                                <TableCell align="left">{formatDateRange(row.checkin, row.checkout)}</TableCell>
                                <TableCell align="left">
                                    <div className="user-cell">
                                        <img src={row.user?.img} className="user-img" alt="User" />
                                        {row.user?.name}
                                    </div>
                                </TableCell>
                                <TableCell align="left">${row.price}</TableCell>
                                <TableCell align="left" className={`status-${row.status.toLowerCase()}`}>
                                    {row.status}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* ----------- 2) All Trips ----------- */}
            <h2>All Trips</h2>
            <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="All Trips Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Destination</TableCell>
                            <TableCell align="left">Host</TableCell>
                            <TableCell align="left">Dates</TableCell>
                            <TableCell align="left">Booked By</TableCell>
                            <TableCell align="left">Total Price</TableCell>
                            <TableCell align="left">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedAll.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell>{row.location.city}, {row.location.country}</TableCell>
                                <TableCell align="left">
                                    <div className="user-cell">
                                        <img src={row.host?.img} className="user-img" alt="Host" />
                                        {row.host?.name}
                                    </div>
                                </TableCell>
                                <TableCell align="left">{formatDateRange(row.checkin, row.checkout)}</TableCell>
                                <TableCell align="left">
                                    <div className="user-cell">
                                        <img src={row.user?.img} className="user-img" alt="User" />
                                        {row.user?.name}
                                    </div>
                                </TableCell>
                                <TableCell align="left">${row.price}</TableCell>
                                <TableCell align="left" className={`status-${row.status.toLowerCase()}`}>
                                    {row.status}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    )
}
