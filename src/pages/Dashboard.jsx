import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button, Box } from '@mui/material';
import { ReservationStatus } from '../cmps/ReservationStatus'
import { ResevationListing } from '../cmps/ResevationListing'
import { RevenewMonth } from '../cmps/RevenewMonth'

// Function to generate random reservations
function generateRandomReservations(count) {
    function getRandomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    }

    function formatDate(date) {
        return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    }

    const guestNames = ['Isaac', 'Sophia', 'Liam', 'Emma', 'Oliver', 'Ava', 'Noah', 'Mia', 'Ethan', 'Luna']
    const hosts = ['John Doe', 'Emily Smith', 'James Johnson', 'Sophia Davis', 'Michael Brown', 'Emma Wilson']
    const listings = ['Barcelona', 'Paris', 'New York', 'London']
    const statuses = ['PENDING', 'APPROVED', 'DECLINED']

    return Array.from({ length: count }, () => {
        const guest = guestNames[Math.floor(Math.random() * guestNames.length)]
        const host = hosts[Math.floor(Math.random() * hosts.length)]
        const listing = listings[Math.floor(Math.random() * listings.length)]
        const checkinDate = getRandomDate(new Date(2023, 0, 1), new Date()) // Random date from Jan 2023 to today
        const checkoutDate = new Date(checkinDate)
        checkoutDate.setDate(checkinDate.getDate() + Math.floor(Math.random() * 14) + 1) // Stay between 1-14 days
        const totalPrice = `$${Math.floor(Math.random() * (5000 - 200 + 1)) + 200}` // Price between $200-$5000
        const status = statuses[Math.floor(Math.random() * statuses.length)]

        return {
            guest: guest,
            checkin: formatDate(checkinDate),
            checkout: formatDate(checkoutDate),
            booked: host,
            listing: listing,
            totalPrice: totalPrice,
            status: status,
        }
    })
}

export function Dashboard() {
    const reserves = generateRandomReservations(50)

    return (
        <section className="dashboard">
            <div className="dashboard-header">Reservations</div>

            {/* Stats Section with Three Cards */}
            <section className="dashboard-stats">
                <div className="stat-card">
                    <h3>Revenue / month</h3>
                    <RevenewMonth reserves={reserves} />
                </div>
                <div className="stat-card">
                    <h3>Reservations status </h3>
                    <ReservationStatus reserves={reserves}/>
                </div>
                <div className="stat-card">
                    <h3>Reservations / listing</h3>
                    <ResevationListing reserves={reserves}/>
                </div>
            </section>

            {/* Reservations Table */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="reservation table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Guest</TableCell>
                            <TableCell align="right">Check-in</TableCell>
                            <TableCell align="right">Check-out</TableCell>
                            <TableCell align="right">Booked</TableCell>
                            <TableCell align="right">Listing</TableCell>
                            <TableCell align="right">Total Price</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="center">Todo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reserves.map((row, index) => {
                            const statusClass = `status-${row.status.toLowerCase()}`
                            return (
                                <TableRow key={index}>
                                    <TableCell>{row.Guest}</TableCell>
                                    <TableCell align="right">{row.checkin}</TableCell>
                                    <TableCell align="right">{row.checkout}</TableCell>
                                    <TableCell align="right">{row.booked}</TableCell>
                                    <TableCell align="right">{row.listing}</TableCell>
                                    <TableCell align="right">{row.totalPrice}</TableCell>
                                    <TableCell align="right" className={statusClass}>{row.status}</TableCell>
                                    <TableCell align="center" >
                                        <Button className="approved-btn">approved</Button>
                                        <Button className="decline-btn">Decline</Button>
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
