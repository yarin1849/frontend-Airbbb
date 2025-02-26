import { ReserveStatusTablePreview } from './ReserveStatusTablePreview'

export function ReserveStatusTable({ sortedUpcoming, sortedAll }) {
    return (
        <>
            <h1>Trips</h1>
            {/* ----------- 1) Upcoming Trips ----------- */}
            <h2>Upcoming Trips</h2>
            <ReserveStatusTablePreview data={sortedUpcoming} />
            {/* ----------- 2) All Trips ----------- */}
            <h2>All Trips</h2>
            <ReserveStatusTablePreview data={sortedAll} />
        </>
    )
}