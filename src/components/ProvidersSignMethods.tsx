import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

function SignMethods() {
  return (
    <div className="flex items-center gap-4 mt-8 justify-center">
        <div onClick={() => signIn("google", { callbackUrl: "/profiles"})} className="flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer hover:opacity-80">
            <FcGoogle size={30} />
        </div>
        <div onClick={() => signIn("github", { callbackUrl: "/profiles" })} className="flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer hover:opacity-80">
            <FaGithub size={30} color="black" />
        </div>
    </div>
  )
}
export default SignMethods