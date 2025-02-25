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
import { Loading } from '../cmps/Loading'
import { loadUser } from '../store/actions/user.actions'

// Date range helper
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
    const monthName = months[Number(startMonth) - 1]

    return `${startDay}-${endDay} ${monthName} ${startYear}`
}

// Parse "YYYY-M-D" -> JavaScript Date
function parseDate(dateStr) {
    // console.log()
    if (dateStr.split('/').length === 1) {
        const [year, month, day] = dateStr.split('-')
        console.log(year, month, day)
        return new Date(+year, +month - 1, +day)
    } else {
        const [month, day, year] = dateStr.split('/')
        console.log(year, month, day)
        return new Date(+year, +month - 1, +day)
    }
}

// Sort pending first, keep others in original order
function sortByPendingFirst(trips) {
    return [...trips].sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1
        if (b.status === 'pending' && a.status !== 'pending') return 1
        const dateA = new Date(a.checkout)
        const dateB = new Date(b.checkout)

        // Sort by checkout date descending (newest first)
        return dateA - dateB
    })
}

// ✅ Corrected: Custom Hook for Checking Screen Width
function useIsNarrowScreen() {
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

export function ReserveStatus() {
    let reserves = useSelector((storeState) => storeState.reservationModule.reservations)
    const isLoading = useSelector((storeState) => storeState.reservationModule.isLoading)
    const user = useSelector((storeState) => storeState.userModule.user)

    reserves = reserves.filter(reserve => reserve.user && String(reserve.user._id) === String(user._id))

    const isNarrow = useIsNarrowScreen() // ✅ Corrected Hook Usage
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

            {isNarrow ? (
                <>
                    <h1 className='narrow-header'>Upcoming Trips</h1>
                    <ul className="trip-list">
                        {sortedUpcoming.map((row) => (
                            <li className="trip-item" key={row._id}>
                                <p><strong>Location:</strong> {row.location.city}, {row.location.country}</p>
                                <p><strong>Host:</strong> {row.host?.name}</p>
                                <p><strong>Dates:</strong> {formatDateRange(row.checkin, row.checkout)}</p>
                                <p><strong>status:</strong><span className={row.status}> {row.status}</span></p>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <>
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
                                            <TableCell>{row.location.city}, {row.location.country}</TableCell>
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
                                            <TableCell align="left">${row.price}</TableCell>
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
                                            <TableCell>{row.location.city}, {row.location.country}</TableCell>
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
                                            <TableCell align="left">${row.price}</TableCell>
                                            <TableCell align="left" className={statusClass}>
                                                {row.status}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </section>
    )
}
