import React from "react"

export function SomethingWrongPage() {
    const backHome = React.useCallback(
        () => window.history.pushState(null, "", "/"),
        [],
    )

    return (
        <section className="hero is-fullheight is-warning is-bold">
            <div className="hero-body container">
                <h1 className="title has-text-centered">
                    Wow! You really screwd this ting up!
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
                <button className="button is-large" onClick={backHome}>
                    When will I learn
                </button>
            </div>
        </section>
    )
}
