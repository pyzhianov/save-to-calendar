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
            <div className="hero-body container">
                <p>
                    Now add <strong>Save to Calendar</strong> to your home
                    screen so you can access it from other apps.
                </p>
            </div>
            <div className="hero-body container">
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
                    Add to Home
                </button>
            </div>
        </section>
    )
}
