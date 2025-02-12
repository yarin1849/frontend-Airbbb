import { Link } from 'react-router-dom'

export function StayPreview({ stay }) {
    return <article className="preview">
        <header>
            <Link to={`/stay/${stay._id}`}>{stay.type}</Link>
        </header>

        <p>Price: <span>${stay.price}</span></p>
        {stay.host && <p>Host: <span>{stay.host.fullname}</span></p>}

    </article>
}