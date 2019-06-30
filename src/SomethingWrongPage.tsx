import React from "react"

export function SomethingWrongPage() {
    return (
        <section className="hero is-fullheight is-warning is-bold">
            <div className="hero-body container">
                <h1 className="title has-text-centered">
                    Dude! You really screwd this ting up!
                </h1>
            </div>
            <div className="hero-body container">
                <iframe
                    title="fail-giphy"
                    src="https://giphy.com/embed/StT6DPSOmBIKQ"
                    width="480"
                    height="258"
                    frameBorder="0"
                    className="giphy-embed"
                    allowFullScreen
                />
            </div>
            <div className="hero-body container ">
                <button className="button is-large ">When will I learn</button>
            </div>
        </section>
    )
}
