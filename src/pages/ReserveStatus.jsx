import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadReservations } from '../store/actions/reservation.actions'
import { Loading } from '../cmps/Loading'
import { loadUser } from '../store/actions/user.actions'

// Date range helper
function formatDateRange(checkinStr, checkoutStr) {
    const [startYear, startMonth, startDay] = checkinStr.split('-')
    const [endYear, endMonth, endDay] = checkoutStr.split('-')

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ]
    const monthName = months[Number(startMonth) - 1]

    return `${startDay}-${endDay} ${monthName} ${startYear}`
}

// Parse "M/D/YYYY" -> JavaScript Date
function parseDate(dateStr) {
    const [year, month, day] = dateStr.split('-')
    return new Date(+year, +month - 1, +day)
}

// Sort pending first, keep others in original order
function sortByPendingFirst(trips) {
    return [...trips].sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1
        if (b.status === 'pending' && a.status !== 'pending') return 1
        return 0
    })
}

export function ReserveStatus() {
    let reserves = useSelector((storeState) => storeState.reservationModule.reservations)
    const isLoading = useSelector((storeState) => storeState.reservationModule.isLoading)
    const user = useSelector((storeState) => storeState.userModule.user)
    reserves = reserves.filter(reserve => reserve.user && String(reserve.user._id) === String(user._id))
    
    useEffect(() => {
        loadReservations()
    }, [])

    if (isLoading || !reserves) return <Loading />


    // Today's date for comparison
    const today = new Date()

    // Filter for "upcoming" if checkout date >= today
    const upcomingTrips = reserves.filter((row) => {
        const checkoutDate = parseDate(row.checkout)
        return checkoutDate >= today
    })


    // 1) Sort upcoming trips so pending is at the top
    const sortedUpcoming = sortByPendingFirst(upcomingTrips)

    // 2) Sort ALL trips so pending is at the top
    const sortedAll = sortByPendingFirst(reserves)

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
                            <TableCell align="left">Booked</TableCell>
                            <TableCell align="left">Total Price</TableCell>
                            <TableCell align="left">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedUpcoming.map((row) => {
                            const statusClass = `status-${row.status?.toLowerCase()}`
                            return (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">
                                        {row.location.city}, {row.location.country}
                                    </TableCell>
                                    <TableCell align="left" className="user-cell">
                                        <img src={row.host?.img} className="user-img" />{row.host?.name}
                                        </TableCell>
                                    <TableCell align="left">
                                        {formatDateRange(row.checkin, row.checkout)}
                                    </TableCell>
                                    <TableCell align="left" className="user-cell">
                                        <img src={row.user?.img} className="user-img" />
                                        <span>{row.user?.name}</span>
                                    </TableCell>
                                    <TableCell align="left">{row.price}</TableCell>
                                    <TableCell align="left" className={statusClass}>
                                        {row.status}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
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
                            <TableCell align="left">Booked</TableCell>
                            <TableCell align="left">Total Price</TableCell>
                            <TableCell align="left">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedAll.map((row) => {
                            const statusClass = `status-${row.status?.toLowerCase()}`
                            return (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">
                                        {row.location.city}, {row.location.country}
                                    </TableCell>
                                    <TableCell align="left" className="user-cell">
                                        <img src={row.host?.img} className="user-img" />{row.host?.name}</TableCell>
                                    <TableCell align="left">
                                        {formatDateRange(row.checkin, row.checkout)}
                                    </TableCell>
                                    <TableCell align="left" className="user-cell">
                                        <img src={row.user?.img} className="user-img" />
                                        <span>{row.user?.name}</span>
                                    </TableCell>
                                    <TableCell align="left">{row.price}</TableCell>
                                    <TableCell align="left" className={statusClass}>
                                        {row.status}
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
