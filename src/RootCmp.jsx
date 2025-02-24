import React from 'react'
import { Routes, Route } from 'react-router'
import { ScrollToTop } from './cmps/ScrollToTop.jsx'

import { HomePage } from './pages/HomePage'
import { AboutUs, AboutTeam, AboutVision } from './pages/AboutUs'
import { StayIndex } from './pages/StayIndex.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

import { StayDetails } from './pages/StayDetails'
import { StayBooking } from './pages/StayBooking.jsx'
import { UserDetails } from './pages/UserDetails'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { AddStay } from './pages/AddStay.jsx'
import { ReserveStatus } from './pages/ReserveStatus.jsx'
import { Dashboard } from './pages/Dashboard.jsx'

export function RootCmp() {
    return (
        <div className="main-container">
            <AppHeader />
            <UserMsg />
            <ScrollToTop />

            <main>
                <Routes>
                    <Route path="" element={<StayIndex />} />
                    <Route path="/details/:stayId" element={<StayDetails />} />
                    <Route path="/reserve-status" element={<ReserveStatus />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/addStay" element={<AddStay />} />
                    <Route path="/:stayId/booking" element={<StayBooking />} />
                    {/* <Route path="user/:id" element={<UserDetails />} /> */}
                    {/* <Route path="review" element={<ReviewIndex />} /> */}
                    {/* <Route path="chat" element={<ChatApp />} /> */}
                    {/* <Route path="admin" element={<AdminIndex />} /> */}
                    <Route path='/login' element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


