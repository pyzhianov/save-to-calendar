import React from "react"
import { t } from "./utils"

export interface InstallPageProps {
    wasInstalled: boolean
    installEvent: InstallEvent | null
}

export type UserChoiceOutcome = "accepted" | "rejected"

export interface InstallEvent extends Event {
    prompt(): void
    userChoice: Promise<{ outcome: UserChoiceOutcome }>
}

const Text = {
    PROMO: (title: string) =>
        t({
            en: `This will install <strong>${title}</strong> a new and awesome way to save content for later.`,
            ru: `Установить приложение <strong>${title}</strong>, которое сохраняет статьи "на потом" в ваш календарь.`,
        }),
    TITLE: t({
        en: "Save to Calendar",
        ru: "Save to Calendar",
    }),
    NOW: t({
        en: "Now start using it!",
        ru: "Получилось! 🎉",
    }),
    ALREADY: t({
        en:
            "Sorry, we don't support your device at the moment. Or maybe you already have <strong>Save to Calendar</strong> installed, check your apps menu.",
        ru:
            "Кажется, мы пока не поддерживаем ваше устройство, 😭 но возможно, вы уже установили <strong>Save to Calendar</strong> - поищите среди других приложений. 🤷‍",
    }),
    GET: t({
        en: "Get it!",
        ru: "Установить",
    }),
}

export function InstallPage({ wasInstalled, installEvent }: InstallPageProps) {
    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="field">
                        {wasInstalled && <p>{Text.NOW}</p>}
                        {!wasInstalled && installEvent && (
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: Text.PROMO(Text.TITLE),
                                }}
                            />
                        )}
                        {!wasInstalled && !installEvent && (
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: Text.ALREADY,
                                }}
                            />
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
                                {Text.GET}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
