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
import { showSuccessMsg } from '../services/event-bus.service'
import {useIsNarrowScreen, formatDateRange, parseDate, sortByPendingFirst} from '../services/util.service'
import { ReservationStatusIsNarrow } from '../cmps/ReservationStatusIsNarrow'
import { ReserveStatusTable } from '../cmps/ReserveStatusTable'

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
                const emojy = (updatedData.status === 'declined') ? '❌' : '✅'
                const colorStatus = (updatedData.status === 'declined') ? '#ff385c' : '#67c23a'
                const bgc = (updatedData.status === 'declined') ? '#f56c6c' : '#b3e19d'
                showSuccessMsg(<><div>
                    {emojy} Hi {user.fullname}! your Reservation has been updated to:
                    <span style={{ color: colorStatus }}> {updatedData.status}!</span>
                </div></>)
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


    const isNarrow = useIsNarrowScreen()
    if (isLoading || !reservations) return <Loading />

    // ✅ Today's date for filtering upcoming trips
    const today = new Date()

    // ✅ Separate reservations into "Upcoming" & "All"
    const upcomingTrips = reservations.filter(row => parseDate(row.checkout) >= today)
    const sortedUpcoming = sortByPendingFirst(upcomingTrips)
    const sortedAll = sortByPendingFirst(reservations)

    return (
        <section className="reserve-status">
            {isNarrow ? (
                <ReservationStatusIsNarrow sortedUpcoming={sortedUpcoming} sortedAll={sortedAll}/>
            ) : (
                
                <ReserveStatusTable sortedUpcoming={sortedUpcoming} sortedAll={sortedAll}/>
            )}
        </section>
    )
}
