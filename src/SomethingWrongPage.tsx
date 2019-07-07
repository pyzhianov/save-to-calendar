import React from "react"

export interface SomethingWrongPageProps {
    info: any
}

export function SomethingWrongPage(props: SomethingWrongPageProps) {
    return (
        <section className="hero is-fullheight is-warning is-bold">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <h1 className="title">
                        Wow! You really screwd this ting up!
                    </h1>
                </div>
            </div>
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="field">
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
                    <div className="field">
                        <p>Some debugging info, sir!</p>
                        <p>{JSON.stringify(props.info)}</p>
                    </div>
                </div>
            </div>
            <div className="hero-foot">
                <div className="container has-text-centered">
                    <div className="section">
                        <button
                            className="button is-big"
                            onClick={() => {
                                window.history.pushState(null, "", "/")
                                window.history.go()
                            }}
                        >
                            When will I learn
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
