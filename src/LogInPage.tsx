import React from "react"
import { signIn } from "./gapi"

export function LoginPage() {
    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="field">
                        <button
                            className="button is-big is-primary"
                            onClick={signIn}
                        >
                            Log in with Google Calendar
                        </button>
                    </div>

                    <div className="field">
                        <p className="has-text-grey">
                            (for adding events only)
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
