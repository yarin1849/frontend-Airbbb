
import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function createData(destination, host, checkin, checkout, booked, totalPrice, status) {
    return { destination, host, checkin, checkout, booked, totalPrice, status }
}

const reserves = [
    createData('Westin Kaanapali KORVN 2BR', 'Puki', '10/30/2023', ' 11/6/2023', 'Puki Norma', '$595', 'PENDING'),
    createData('Barcelona', 'Isaac', '10/30/2023', ' 11/6/2023', 'papa jons', '$422202', 'approved'),
    createData('madrid', 'Puki', '10/30/2023', ' 11/6/2023', 'Ronaldo', '$777', 'declined'),
]

export function ReserveStatus() {

    return (
        <>
            <section className="reserve-status">
                <h1>Trips</h1>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Destination</TableCell>
                                <TableCell align="right">Host</TableCell>
                                <TableCell align="right">Checkin</TableCell>
                                <TableCell align="right">Checkout</TableCell>
                                <TableCell align="right">Booked</TableCell>
                                <TableCell align="right">Total Price</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reserves.map((row) => {
                                const statusClass = `status-${row.status.toLowerCase()}` // Convert to lowercase & add a prefix
                                console.log(statusClass)
                                return (
                                    <TableRow key={row.destination}>
                                        <TableCell component="th" scope="row">
                                            {row.destination}
                                        </TableCell>
                                        <TableCell align="right">{row.host}</TableCell>
                                        <TableCell align="right">{row.checkin}</TableCell>
                                        <TableCell align="right">{row.checkout}</TableCell>
                                        <TableCell align="right">{row.booked}</TableCell>
                                        <TableCell align="right">{row.totalPrice}</TableCell>
                                        <TableCell align="right" className={statusClass}>{row.status}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
        </>
    )
}
