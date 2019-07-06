import React from "react"
import { initGapiClient } from "./gapi"
import { NewEventPage } from "./NewEventPage"
import { SomethingWrongPage } from "./SomethingWrongPage"
import { TipPage } from "./TipPage"
import { InstallPage, InstallEvent } from "./InstallPage"
import { LoginPage } from "./LogInPage"
import { UnablePage } from "./UnablePage"

const APP_MODE = matchMedia("(display-mode: standalone)").matches

function App() {
    const [isAppMode, setIsAppMode] = React.useState<boolean>(APP_MODE)
    const [wasInstalled, setWasInstalled] = React.useState(false)
    const [href, setHref] = React.useState(window.location.href)
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null)
    const [
        installEvent,
        setInstallPromptEvent,
    ] = React.useState<InstallEvent | null>(null)

    React.useEffect(() => {
        window.addEventListener("appinstalled", () => setWasInstalled(true))
    }, [])

    React.useEffect(() => {
        window.addEventListener("beforeinstallprompt", e => {
            setInstallPromptEvent(e as InstallEvent)
        })
    }, [])

    React.useEffect(() => {
        window.addEventListener("popstate", () => setHref(window.location.href))
    }, [])

    React.useEffect(initGapiClient(setIsLoggedIn), [])

    const { searchParams } = new URL(href)
    const title = searchParams.get("title") || undefined
    const url = searchParams.get("text") || searchParams.get("url") || undefined

    if (isAppMode) {
        if (!isLoggedIn) {
            return <LoginPage isLoggedIn={isLoggedIn} />
        } else if (!title && !url) {
            return <TipPage />
        } else if (title) {
            return <NewEventPage title={title} url={url} />
        } else {
            return <SomethingWrongPage />
        }
    } else {
        if (isLoggedIn) {
            return <TipPage />
        } else if (wasInstalled) {
            return <LoginPage isLoggedIn={isLoggedIn} />
        } else if (installEvent) {
            return (
                <InstallPage
                    installEvent={installEvent}
                    onInstall={success => {
                        if (success) {
                            setIsAppMode(true)
                        }
                        setInstallPromptEvent(null)
                    }}
                />
            )
        } else {
            return <UnablePage />
        }
    }
}

export default App
