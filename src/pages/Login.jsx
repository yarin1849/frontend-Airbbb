import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { userService } from '../services/user'
import { login } from '../store/actions/user.actions'
import { Loading } from '../cmps/Loading'
import { socketService } from '../services/socket.service'

export function Login() {
    const [users, setUsers] = useState([])
    const [credentials, setCredentials] = useState({ username: '', password: '' })

    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    }, [])


    async function loadUsers() {
        const users = await userService.getUsers()
        setUsers(users)
    }



    async function onLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        const user = await login(credentials)
        if (!user || !user._id) {
            console.error("❌ Login failed: No user ID returned.")
            return
        }
        console.log(user._id)
        socketService.emit("set-user-socket", user._id)
        navigate('/')
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value

        setCredentials({ ...credentials, [field]: value })
    }

    async function onDemoUser() {
        credentials.username = 'hoshen'
        credentials.password = 'hoshen'
        const user = await login(credentials)
        if (!user || !user._id) {
            console.error("❌ Login failed: No user ID returned.")
            return
        }
        console.log(user._id)
        socketService.emit("set-user-socket", user._id)
        navigate('/')
    }


    const [gradient, setGradient] = useState("linear-gradient(90deg, #FF3366, #E61E6E)")
    const [isHovering, setIsHovering] = useState(false)

    const handleMouseMove = (ev) => {
        if (!isHovering) setIsHovering(true)

        const { left, top, width, height } = ev.currentTarget.getBoundingClientRect()
        const xPos = ((ev.clientX - left) / width) * 100
        const yPos = ((ev.clientY - top) / height) * 100

        setGradient(`radial-gradient(circle at ${xPos}% ${yPos}%, rgb(255, 51, 102), #E61E6E)`)
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
        setGradient("linear-gradient(90deg, #FF3366, #E61E6E)")
    }
    return (

        <div className='form-container'>
            <div className="login-signup">
                <header className='auth-header divider'>Log in</header>
                <form>
                    <label htmlFor="username"><span className="astrix">*</span> Username</label>
                    <input type="text" name='username' onChange={handleChange} value={credentials.username} />
                    <label htmlFor="password"><span className="astrix">*</span> Password</label>
                    <input type="password" name='password' onChange={handleChange} value={credentials.password} />
                </form>

                <button
                    className="reserve-button"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onClick={onLogin}
                    style={{ background: gradient }}>
                    Login
                </button>

                <div className='or'>Or</div>
                <button className='btn-login signup-btn' onClick={onDemoUser}>Demo User</button>
                <button className='btn-login signup-btn' onClick={() => navigate('/signup')}>Sign Up</button>
            </div>
        </div>

    )

}
