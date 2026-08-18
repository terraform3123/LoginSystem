import { useState } from 'react'
import ReactLogo from '../assets/react.svg'

export function Register() {
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [senha, setSenha] = useState<string>("")
    return (
        <div>
            <div className="card">
                <div className="loginHeader">
                    <img src={ReactLogo} alt="" />
                    <p>Hello Welcome!</p>
                    <p>Sign up to create your account</p>
                </div>
                <div className="contentLogin">
                    <form>
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} placeholder='name' />

                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} placeholder='example@gmail.com' />

                        <label className="form-label">Password</label>
                        <input type="password" value={senha} onChange={(event) => setSenha(event.target.value)} className="form-control last-input" placeholder='' />
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}