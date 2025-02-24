import { useState } from 'react'
import { useNavigate } from 'react-router'

import { signup } from '../store/actions/user.actions'

import { ImgUploader } from '../cmps/ImgUploader'
import { userService } from '../services/user'

export function Signup() {
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const navigate = useNavigate()

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
    }

    function handleChange(ev) {
        const type = ev.target.type

        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }
    
    async function onSignup(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.username || !credentials.password || !credentials.fullname) return
        
        const user = await signup(credentials)
                if (!user || !user._id) {
                    console.error("❌ Login failed: No user ID returned.")
                    return
                }
                console.log(user._id)
                socketService.emit("set-user-socket", user._id)
        clearState()
         navigate('/')
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }
   
    return (
        <form className="signup-form" onSubmit={onSignup}>
             <header className='auth-header divider'>Sign up</header>
             <label htmlFor="fullname"><span className="astrix">*</span> Fullname</label>
            <input
                type="text"
                name="fullname"
                value={credentials.fullname}
                placeholder="Fullname"
                onChange={handleChange}
                required
            />
            <label htmlFor="userName"><span className="astrix">*</span> Username</label>
            <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Username"
                onChange={handleChange}
                required
            />
            <label htmlFor="password"><span className="astrix">*</span> Password</label>
            <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                required
            />
            <ImgUploader onUploaded={onUploaded} />
            <button>Signup</button>
        </form>
    )
}