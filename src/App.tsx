import React from "react"
import { initGapiClient } from "./gapi"
import { NewEventPage } from "./NewEventPage"
import { SomethingWrongPage } from "./SomethingWrongPage"
import { TipPage } from "./TipPage"
import { InstallPage, InstallEvent } from "./InstallPage"
import { LoginPage } from "./LogInPage"
import "bulma/css/bulma.css"
import "normalize.css"

const WAS_INSTALLED = matchMedia("(display-mode: standalone)").matches

function App() {
    const [isInstalled, setIsInstalled] = React.useState<boolean>(WAS_INSTALLED)
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null)
    const [
        installEvent,
        setInstallPromptEvent,
    ] = React.useState<InstallEvent | null>(null)

    React.useEffect(() => {
        window.addEventListener("appinstalled", () => setIsInstalled(true))
    }, [])

    React.useEffect(() => {
        window.addEventListener("beforeinstallprompt", e => {
            setInstallPromptEvent(e as InstallEvent)
        })
    }, [])

    React.useEffect(initGapiClient(setIsLoggedIn), [])

    const { searchParams } = new URL(window.location.href)
    const title = searchParams.get("title") || undefined
    const url = searchParams.get("text") || undefined

    if (isLoggedIn === null) {
        return null
    }

    if (!isLoggedIn) {
        return <LoginPage isLoggedIn={isLoggedIn} />
    }

    if (!isInstalled) {
        return (
            <InstallPage
                installEvent={installEvent}
                onInstall={success => {
                    if (success) {
                        setIsInstalled(true)
                    }
                    setInstallPromptEvent(null)
                }}
            />
        )
    }

    if (!title && !url) {
        return <TipPage />
    }

    if (title && url) {
        return <NewEventPage title={title} url={url} />
    }

    return <SomethingWrongPage />
}

export default App
