import React from "react"
import { signIn } from "./gapi"
import clsx from "clsx"

export interface LoginPageProps {
    isLoggedIn: boolean | null
}

export function LoginPage({ isLoggedIn }: LoginPageProps) {
    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="field">
                        <button
                            className={clsx(
                                "button is-big is-primary",
                                isLoggedIn === null && "is-loading",
                            )}
                            disabled={isLoggedIn === true}
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
