import React from "react"
import { signOut } from "./gapi"

export function TipPage() {
    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="level">
                        <p>
                            You have successfully installed{" "}
                            <strong>Save&nbsp;to&nbsp;Calendar</strong>!
                        </p>
                    </div>
                    <div className="level">
                        <p>
                            Now you can <strong>use "Share" button</strong> in
                            any of your apps to create new events in&nbsp;your
                            Google&nbsp;Calendar.
                        </p>
                    </div>
                </div>
            </div>
            <div className="hero-body container">
                <button className="button is-big" onClick={signOut}>
                    Log out of Google Calendar
                </button>
            </div>
        </section>
    )
}
