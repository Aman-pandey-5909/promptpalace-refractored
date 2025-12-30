'use client'
import { useState } from "react"
import { registerHandler } from "@/services/auth/authHandler"

const RegisterPage = () => {
  const [error, setError] = useState('')
  return (
    <>
       <h1>Register</h1>
       <form className='flex flex-col' action="" onSubmit={(e) => {
           e.preventDefault();
           const username = e.target.username.value;
           const email = e.target.email.value;
           registerHandler(username, email, setError);
       }}>
           <input type="text" placeholder='username' name="username" />
           <input type="email" placeholder='email' name="email" />
           <button type="submit">Register</button>
       </form>
       {error && <p>{error}</p>}
    </>
  )
}

export default RegisterPage