import React from "react"
import { signIn } from "./gapi"
import { t } from "./utils"

const Text = {
    CAUTION: t({
        en: "(for adding events only)",
        ru:
            "(приложение ничего не читает и не удаляет, только создает новые события)",
    }),
    LOG_OUT: t({
        en: "Log in with Google Calendar",
        ru: "Войти через Google Calendar",
    }),
}

export function LoginPage() {
    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="field">
                        <button
                            className="button is-big is-primary"
                            onClick={signIn}
                        >
                            {Text.LOG_OUT}
                        </button>
                    </div>

                    <div className="field">
                        <p className="has-text-grey">{Text.CAUTION}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
