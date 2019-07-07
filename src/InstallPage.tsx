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
    CHROME: t({
        en: "Get Google Chrome",
        ru: "Установить Google Chrome",
    }),
    CHROME_TIP: t({
        en:
            "(opening this site in Google Chrome might help if you are on Android)",
        ru: "(еще можно попробовать открыть этот сайт в Google Chrome)",
    }),
    ALREADY: t({
        en:
            "Looks like we don't support your device at the moment. Or maybe you already have <strong>Save to Calendar</strong> installed, check your apps menu.",
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

                    {!wasInstalled && installEvent && (
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

                    {!wasInstalled && !installEvent && (
                        <>
                            <div className="field">
                                <p className="has-text-grey">
                                    {Text.CHROME_TIP}
                                </p>
                            </div>
                            <div className="field">
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.android.chrome"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className="button is-big"
                                >
                                    {Text.CHROME}
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}
