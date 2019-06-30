import React from "react"

export function SomethingWrongPage() {
    const [wasReported, reportError] = React.useState<boolean>(false)

    return (
        <section className="hero is-fullheight is-warn">
            <div className="hero-body">
                {wasReported ? (
                    <p>Thanks for the report. We are on it!</p>
                ) : (
                    <div>
                        <p>Looks like something just went wrong</p>
                    </div>
                )}
            </div>
            <div className="hero-foot">
                <button
                    disabled={wasReported}
                    onClick={() =>
                        setTimeout(() => {
                            reportError(true)
                        }, Math.random() * 2)
                    }
                >
                    Report the event
                </button>
            </div>
        </section>
    )
}
