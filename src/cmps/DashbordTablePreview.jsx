import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'
import { formatDateRange } from '../services/util.service'

export function DashbordTablePreview({ data, onStatusChange }) {
    return (
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
                        {data.map((reserve) => (
                            <TableRow key={reserve._id} sx={{ height: "70px" }}>

                                {/* Guest Info */}
                                <TableCell sx={{ padding: "10px", whiteSpace: "nowrap" }}>
                                    <div className="user-cell">
                                        <img src={reserve.user?.img} className="user-img" alt="User" />
                                        <span>{
                                            reserve.user?.name
                                                ? reserve.user.name.charAt(0).toUpperCase() + reserve.user.name.slice(1).toLowerCase()
                                                : ""
                                        }</span>
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
                                        <span>{reserve.host?.name ? 
                                        reserve.host.name.charAt(0).toUpperCase() + reserve.host.name.slice(1).toLowerCase()
                                            : ""
                                    }</span>
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
        </>
    )
}
