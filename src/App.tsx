import React from "react"
import { initGapiClient } from "./gapi"
import { NewEventPage } from "./NewEventPage"
import { SomethingWrongPage } from "./SomethingWrongPage"
import { TipPage } from "./TipPage"
import { InstallPage, InstallEvent } from "./InstallPage"
import { LoginPage } from "./LogInPage"

function App() {
    const isAppMode = matchMedia("(display-mode: standalone)").matches
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null)
    const [wasInstalled, setWasInstalled] = React.useState(false)
    const [installEvent, setInstallEvent] = React.useState<InstallEvent | null>(
        null,
    )

    React.useEffect(() => {
        alert("Version 4")
    }, [])

    React.useEffect(() => {
        window.addEventListener("beforeinstallprompt", e => {
            setInstallEvent(e as InstallEvent)
        })
    }, [])

    React.useEffect(() => {
        window.addEventListener("appinstalled", () => setWasInstalled(true))
    }, [])

    React.useEffect(initGapiClient(setIsLoggedIn), [])

    const { searchParams } = new URL(window.location.href)
    const isSharing = searchParams.get("isSharing")
    const title = searchParams.get("title")
    const text = searchParams.get("text")
    const url = searchParams.get("url")

    if (!isAppMode) {
        return (
            <InstallPage
                wasInstalled={wasInstalled}
                installEvent={installEvent}
            />
        )
    } else if (isLoggedIn === null) {
        return null
    } else if (isLoggedIn === false) {
        return <LoginPage />
    } else if (isSharing && title) {
        return <NewEventPage title={title} url={url || text} />
    } else if (isSharing && !title && !text && !url) {
        return <SomethingWrongPage info={{ title, url, text }} />
    } else {
        return <TipPage />
    }
}

export default App
