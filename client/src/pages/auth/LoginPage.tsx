'use client'
import { loginHandler } from '@/services/auth/authHandler'
import Link from 'next/link';
import { useState } from 'react'



const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  return (
    <>
        <h1>Login</h1>
        <p>No account? <Link href="/auth/register" className='text-violet-400'>Register</Link></p>
        <form action="" onSubmit={(e) => {
            e.preventDefault();
            const username = e.target.username.value;
            loginHandler(username, setError);
        }}  >
            <input type="text" placeholder='username' name='username' />
            <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
    </>
  )
}

export default LoginPage