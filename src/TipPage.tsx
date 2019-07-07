import React from "react"
import { signOut } from "./gapi"
import { t } from "./utils"

const Text = {
    TIP: t({
        en:
            "Now open the <strong>Share</strong> dialog in any of your apps and select <strong>Save&nbsp;to&nbsp;Calendar</strong>.",
        ru:
            "Теперь вы можете выбрать <strong>Save&nbsp;to&nbsp;Calendar</strong> в меню <strong>Поделиться</strong>  любого приложения и добавить интересный материал в календарь.",
    }),
    LOG_OUT: t({
        en: "Log out of Google Calendar",
        ru: "Отключить Google Calendar",
    }),
}

export function TipPage() {
    // const [isModalOpen, setModalOpen] = React.useState(false)
    // const openModal = React.useCallback(() => setModalOpen(true), [
    //     setModalOpen,
    // ])
    // const closeModal = React.useCallback(() => setModalOpen(false), [
    //     setModalOpen,
    // ])

    return (
        <>
            <div className="hero is-fullheight">
                <div className="hero-body container has-text-centered">
                    <p dangerouslySetInnerHTML={{ __html: Text.TIP }} />
                </div>
                <div className="hero-foot container">
                    <section className="section">
                        <button className="button is-big" onClick={signOut}>
                            {Text.LOG_OUT}
                        </button>
                    </section>
                </div>
            </div>

            {/* <div className={`modal ${isModalOpen ? "is-active" : ""}`}>
                <div className="modal-background" />
                <div className="modal-content">
                    <div className="card">
                        <div className="card-content">
                            <div className="field">
                                <p>
                                    Are you sure you want to stop using the app?
                                </p>
                            </div>
                            <div className="field buttons">
                                <button
                                    className="button is-primary"
                                    onClick={closeModal}
                                >
                                    Keep using
                                </button>
                                <button
                                    className="button"
                                    onClick={() => {
                                        closeModal()
                                        signOut()
                                    }}
                                >
                                    Log out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="modal-close is-large"
                    aria-label="close"
                    onClick={closeModal}
                />
            </div> */}
        </>
    )
}
