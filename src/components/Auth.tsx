import { FormEvent, useCallback, useRef, useState } from "react";
import Input from "@/components/Input";
import ProvidersSignMethods from "@/components/ProvidersSignMethods";
import axios from "axios";
import { signIn } from "next-auth/react";


function Auth() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    try {
      const userLoggedIn = await signIn('credentials', {
        email,
        password,
        callbackUrl: "/profiles",
      });


    } catch(e: any) {
      alert(e.message)
    }
  }, [email, password]);

  const signup = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    try {
      const userCreated = await axios.post("/api/register", {
        name: username,
        email,
        password,
      })

      signin(e);
    } catch(e: any) {
      alert(e.message)
    }
  }, [email, username, password, signin]);

  const [formVariant, setFormVariant] = useState("signup");
  const toggleFormVariant = useCallback(() => {
    setFormVariant((variant) => variant === "signup" ? "signin" : "signup")
  }, []);
  return (
    <div className="bg-black px-12 py-12 md:px-48 lg:px-64 xl:px-96 2xl:px-[44rem]">
      <form onSubmit={(e) => formVariant === "signup" ? signup(e) : signin(e)}>
        <h1 className="text-3xl mb-8 font-semibold">{formVariant === "signup" ? "Sign up" : "Sign In"}</h1>
        <div className="flex flex-col gap-4">
          {formVariant === 'signup' &&
            <Input id="username" value={username} bg="bg-[#333333]" label="username"  onChange={(ev: any) => setUsername(ev.target.value)} type="text" />
          }
          <Input id="email" value={email} bg="bg-[#333333]" label="email"  onChange={(ev: any) => setEmail(ev.target.value)} type="email" />
          <Input id="password" value={password} bg="bg-[#333333]" label="password" onChange={(ev: any) => setPassword(ev.target.value)} type="password" />
        </div>
        <button className="py-3 bg-netflix_red text-white rounded-md w-full mt-10 hover:bg-red-700 transition" type="submit">{formVariant === "signin" ? "Sign In" : "Sign Up"}</button>

        <ProvidersSignMethods />

        <p className="text-neutral-500 mt-12">
          {formVariant === "signin" ? "First time using Netflix?" : "Already have an account?"}
          <span onClick={toggleFormVariant} className="text-white ml-1 hover:underline cursor-pointer">{formVariant === "signin" ? "Create account" : "Login"}</span>
        </p>
      </form>
    </div>
  )
}

export default Auth