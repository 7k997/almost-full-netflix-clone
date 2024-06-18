import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";
// import { useNavigate } from "react-router-dom"

function Navbar({ setSignIn, signIn }: any) {
  const router = useRouter();
  const { data: currentUser, mutate } = useCurrentUser();
  const [show, handleShow] = useState(true)
  // const navigate = useNavigate ()
  const transitionNavbar = () => {
    if (window.scrollY < 100) {
      handleShow(true)
    } else {
      handleShow(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar)
    return () => window.removeEventListener("scroll", transitionNavbar)
  }, [])

  return (
    <>
      {show &&
        <div className="fixed flex justify-between items-center w-full h-20 p-6 z-[60] md:px-32 xl:px-60">
          <div onClick={() => router.push("/movies")} style={{ width: "89px", height: "24px", position: "relative", }}>
            <Image style={{ objectFit: 'cover' }} fill className="cursor-pointer text-netflix_red" src="/image.svg" alt="" />
          </div>
          {!currentUser &&
            <button onClick={() => { !signIn ? setSignIn(true) : setSignIn(false) }} className="text-white py-1.5 px-4 text-sm font-bold bg-netflix_red rounded transition duration delay-200">{!signIn ? "Sign In" : "Home"}</button>
          }
          {currentUser &&
            <div onClick={() => router.push("/plans")} className="relative h-full w-[32px]">
              <Image style={{ objectFit: 'contain' }} fill className="cursor-pointer rounded-md" src="/avatar_default_1.png" alt="avatar_default_1" />
            </div>
          }
        </div>
      }
    </>
  )
}

export default Navbar