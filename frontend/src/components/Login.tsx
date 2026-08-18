import { useEffect, useState } from 'react'
import ReactLogo from '../assets/react.svg'
import api from '../services/api'

interface User {
    id: number;
    email: string;
}

export function Login() {
    const [email, setEmail] = useState<string>("")
    const [senha, setSenha] = useState<string>("")
    const [mensagem, setMensagem] = useState<string>("")

    async function loginUsers(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            const response = await api.post("/login", {
                email,
                senha,
            })

            console.log(response.data)

            setMensagem(response.data)
        } catch (error: any) {
            setMensagem(error.response.data)
        }


    }

    return (
        <div>
            <div className="card">
                <div className="loginHeader">
                    <img src={ReactLogo} alt="React Logo" />
                    <p>WELCOME BACK!</p>
                    <p>Sign in to your account</p>
                </div>
                <div className="contentLogin">
                    <form onSubmit={loginUsers}>
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} placeholder='example@gmail.com' />

                        <label className="form-label">Password</label>
                        <input type="password" value={senha} onChange={(event) => setSenha(event.target.value)} className="form-control" placeholder='12345678' />
                        <button type="submit">Login</button>
                    </form>
                    <p>{mensagem}</p>
                </div>
                <div className="footerLogin">
                </div>

            </div>
            <div className="listUsers">
            </div>
        </div>

    )
}