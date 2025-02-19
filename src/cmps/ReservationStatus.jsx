

export function ReservationStatus({reserves}) {
    const statusCount = [0, 0, 0]
    countReservsStatus(reserves)
    function countReservsStatus(reserves) {
        reserves.forEach(reserve => {
            if(reserve.status === 'approved') statusCount[0]++
            else if(reserve.status === 'declined') statusCount[1]++
            else statusCount[2]++
        })
    }
    return (
        <div style={{ width: '402px', height: '180px' }} className="reserve-status">
            <div className="approved">Approved: <span>{statusCount[0]}</span></div>
            <div className="declined">Declined: <span>{statusCount[1]}</span></div>
            <div className="pending">Pending: <span>{statusCount[2]}</span></div>
        </div>
    )
}