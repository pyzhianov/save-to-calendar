import React from "react"

export function UnablePage() {
    return (
        <>
            <div className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <p>
                            Sorry, we only support <strong>Android</strong> and{" "}
                            <strong>Chromium</strong>-based browsers
                            at&nbsp;the&nbsp;moment.
                        </p>
                        <p className="section has-text-grey">
                            If you are using both and still seeing this message,
                            try to{" "}
                            <strong className="has-text-grey">
                                refresh the&nbsp;page
                            </strong>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
