import React from "react"

export interface InstallPageProps {
    wasInstalled: boolean
    installEvent: InstallEvent | null
}

export type UserChoiceOutcome = "accepted" | "rejected"

export interface InstallEvent extends Event {
    prompt(): void
    userChoice: Promise<{ outcome: UserChoiceOutcome }>
}

export function InstallPage({ wasInstalled, installEvent }: InstallPageProps) {
    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="field">
                        {wasInstalled && <p>Now start using it!</p>}
                        {!wasInstalled && installEvent && (
                            <p>
                                This will install{" "}
                                <strong>Save to Calendar</strong> a new and
                                awesome way to save content for later.
                            </p>
                        )}
                        {!wasInstalled && !installEvent && (
                            <p>
                                Save to Calendar is already installed or your
                                device is not supported at the moment.
                            </p>
                        )}
                    </div>

                    {!wasInstalled && (
                        <div className="field">
                            <button
                                className="button is-big is-primary"
                                disabled={!installEvent}
                                onClick={() =>
                                    installEvent && installEvent.prompt()
                                }
                            >
                                Get it!
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
