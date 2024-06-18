import { useState, useEffect } from 'react'
import Navbar from "@/components/Navbar"
import WelcomeComponent from "@/components/WelcomeComponent"
import TvShowcase from "@/components/TvShowcase"
import MacShowcase from "@/components/MacShowcase"
import OfflineWatch from "@/components/OfflineWatch"
import ProfilesForKids from "@/components/ProfilesForKids"
import Auth from '@/components/Auth'

function HeroSection() {
    const [signIn, setSignIn] = useState(false);
    const [show, handleShow] = useState(true);
    const transitionNavbar = () => {
        if (window.scrollY > 650) {
            handleShow(false)
        } else {
            handleShow(true)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNavbar)
        return () => window.removeEventListener('scroll', transitionNavbar)
    }, [])
    return (<>
        <section id='herosection' className="relative max-h-[50rem] overflow-hidden border-b-8 border-gray-400 bg-zinc-400 bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/31ef2c5c-3d08-47d5-b7a9-f29e4f4f893d/fd9e9476-120c-4999-8dd2-40fafd94a5cd/SI-en-20240506-POP_SIGNUP_TWO_WEEKS-perspective_WEB_4614a722-d0b2-4043-99b5-94517871f362_large.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <Navbar signIn={signIn} setSignIn={setSignIn} />
            <div className="absolute full h-full w-full bg-gradient-to-b from-[#000c] from-0% via-[#3333336e] via-60% to-[#000c] to-100% "></div>
            <div className="relative pt-20 text-white z-20">
                    {signIn ? (
                        <Auth />
                    ) : (
                        <WelcomeComponent />
                    )}
                </div>
        </section>
        <TvShowcase />
        <OfflineWatch />
        <MacShowcase />
        <ProfilesForKids />
    </>)
}

export default HeroSection