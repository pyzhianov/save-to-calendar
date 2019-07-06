import React from "react"

export interface InstallPageProps {
    onInstall(result: boolean): void
    installEvent: InstallEvent | null
}

export interface InstallEvent extends Event {
    prompt(): void
    userChoice: Promise<{ outcome: "accepted" | "rejected" }>
}

export function InstallPage(props: InstallPageProps) {
    const { installEvent, onInstall } = props

    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="field">
                        <button
                            className="button is-big is-primary"
                            disabled={!installEvent}
                            onClick={() => {
                                if (!installEvent) return
                                installEvent.prompt()
                                installEvent.userChoice.then(choiceResult => {
                                    if (choiceResult.outcome === "accepted") {
                                        onInstall(true)
                                    } else {
                                        onInstall(false)
                                    }
                                })
                            }}
                        >
                            Add to Home Screen
                        </button>
                    </div>

                    <div className="field">
                        <p className="has-text-grey">
                            (so you can{" "}
                            <strong className="has-text-grey">Share</strong>{" "}
                            content with the&nbsp;app)
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
