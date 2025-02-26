import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { formatDateRange } from '../services/util.service'

export function ReserveStatusTablePreview({ data }) {
    return (
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
                    {data.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell>{row.location.city}, {row.location.country}</TableCell>
                            <TableCell align="left">
                                <div className="user-cell">
                                    <img src={row.host?.img} className="user-img" alt="Host" />
                                    <span>{row.host?.name ?
                                        row.host.name.charAt(0).toUpperCase() + row.host.name.slice(1).toLowerCase()
                                        : ""
                                    }</span>
                                </div>
                            </TableCell>
                            <TableCell align="left">{formatDateRange(row.checkin, row.checkout)}</TableCell>
                            <TableCell align="left">
                                <div className="user-cell">
                                    <img src={row.user?.img} className="user-img" alt="User" />
                                    <span>{
                                        row.user?.name
                                            ? row.user.name.charAt(0).toUpperCase() + row.user.name.slice(1).toLowerCase()
                                            : ""
                                    }</span>
                                </div>
                            </TableCell>
                            <TableCell align="left">{row.price ? `$${row.price}` : "N/A"}</TableCell>
                            <TableCell align="left" className={`status-${row.status.toLowerCase()}`}>
                                {row.status}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
