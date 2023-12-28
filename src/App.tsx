import { Route, Routes } from 'react-router-dom'

import './globals.css'
import SignInForm from './_auth/forms/SignInForm'
import SignUpForm from './_auth/forms/SignUpForm'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetail, Saved, UpdateProfile } from './_root/pages'
import { Toaster } from './components/ui/toaster'
import Profile from './_root/pages/Profile'

export default function App() {
    return (
        <main className='flex min-h-screen bg-dark'>
            <Routes>
                {/* Public router */}
                <Route element={<AuthLayout />}>
                    <Route path='/sign-in' element={<SignInForm />} />
                    <Route path='/sign-up' element={<SignUpForm />} />
                </Route>

                {/* Private router */}
                <Route element={<RootLayout />}>
                    <Route index element={<Home />} />
                    <Route path='/explore' element={<Explore />} />
                    <Route path='/saved' element={<Saved />} />
                    <Route path='/all-users' element={<AllUsers />} />
                    <Route path='/create-post' element={<CreatePost />} />
                    <Route path='/update-post/:id' element={<EditPost />} />
                    <Route path='/posts/:id' element={<PostDetail />} />
                    <Route path='/profile/:id/*' element={<Profile />} />
                    <Route path='/update-profile/:id' element={<UpdateProfile />} />
                </Route>
            </Routes>

            <Toaster />
        </main>
    )
}
