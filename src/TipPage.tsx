import React from "react"
import { signOut } from "./gapi"

export function TipPage() {
    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <p>
                    Use "Share" on any interesting stuff and select Pockendar
                    from the menu to add it to your calendar
                </p>
            </div>
            <div className="hero-foot">
                <button onClick={signOut}>Log out</button>
            </div>
        </section>
    )
}
