import React from "react"
import { signIn } from "./gapi"

export interface LoginPageProps {
    isLoggedIn: boolean
}

export function LoginPage({ isLoggedIn }: LoginPageProps) {
    return (
        <section className="hero is-fullheight is-info">
            <div className="hero-body">
                <h1 className="heading">Step 1</h1>
            </div>
            <div className="hero-foot">
                <button
                    disabled={isLoggedIn === null}
                    className="button"
                    onClick={signIn}
                >
                    Log In
                </button>
            </div>
        </section>
    )
}
