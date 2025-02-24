import { eventBus } from '../services/event-bus.service'
import { useState, useEffect, useRef } from 'react'

export function UserMsg() {
    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef(null)

    useEffect(() => {
        // Create the subscription
        const unsubscribe = eventBus.on('show-msg', (msg) => {
            setMsg(msg)
            
            // Clear any existing timeout
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current)
            }
            
            // Set new timeout to clear message
            timeoutIdRef.current = setTimeout(() => {
                setMsg(null)
            }, 3000)
        })

        // Cleanup on unmount
        return () => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current)
            }
            unsubscribe()
        }
    }, [])

    if (!msg) return null

    return (
        <section className={`user-msg ${msg.type} visible`}>
            {msg.txt}
            <button onClick={() => setMsg(null)}>×</button>
        </section>
    )
}