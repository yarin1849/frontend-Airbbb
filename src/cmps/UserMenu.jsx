import { NavLink } from "react-router-dom"

export function UserMenu({ onLogout, user }) {

    return (
        <div className="user-menu">
            <article className="link" >
                {user ? <NavLink to="/trips" className='login'>Hello {user.fullname}</NavLink> : <NavLink to="/login" className='login'>Log in</NavLink>}
            </article>
            {user && <article className="link" >
                <NavLink to="/reserve-status">Trips</NavLink>
            </article>}
            {user && user.isHost && (
                <article className="link">
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </article>
            )}
            {user && <article className="link">
                <NavLink to="/login" className='login' onClick={onLogout}>Log out</NavLink>
            </article >}
        </div>
    )
}

