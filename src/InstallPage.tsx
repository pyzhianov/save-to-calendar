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
        <section className="hero is-fullheight is-primary is-bold">
            <div className="hero-body">
                <h1 className="heading">Step 2</h1>
                <p>Add the application to your home screen</p>
            </div>
            <div className="hero-foot">
                <button
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
                    Add to Home
                </button>
            </div>
        </section>
    )
}
