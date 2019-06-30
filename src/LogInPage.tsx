import React from "react"
import { signIn } from "./gapi"

export interface LoginPageProps {
    isLoggedIn: boolean
}

export function LoginPage({ isLoggedIn }: LoginPageProps) {
    return (
        <section className="hero is-fullheight">
            <div className="hero-body container">
                <p>
                    Log in using your <strong>Google Calendar</strong> account.
                    We only need it to add events on your behalf.
                </p>
            </div>
            <div className="hero-body container">
                <button
                    className="button is-big is-primary"
                    disabled={isLoggedIn === null}
                    onClick={signIn}
                >
                    Log in with Google Calendar
                </button>
            </div>
        </section>
    )
}
