import React from "react"
import { initGapiClient } from "./gapi"
import { NewEventPage } from "./NewEventPage"
import { TipPage } from "./TipPage"
import { InstallPage, InstallEvent } from "./InstallPage"
import { LoginPage } from "./LogInPage"
import { urlRegex } from "./utils"

function getTitleAndMore() {
    const { searchParams } = new URL(window.location.href)
    const title = searchParams.get("title") || ""
    const more = searchParams.get("url") || searchParams.get("text") || ""

    const urlInMore = more && more.match(urlRegex)

    if (more && urlInMore && urlInMore.length > 0) {
        return {
            title: title || more.replace(urlInMore[0], "").trim(),
            more: urlInMore[0],
        }
    } else {
        return { title, more }
    }
}

function App() {
    const isAppMode = matchMedia("(display-mode: standalone)").matches
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null)
    const [wasInstalled, setWasInstalled] = React.useState(false)
    const [installEvent, setInstallEvent] = React.useState<InstallEvent | null>(
        null,
    )

    React.useEffect(() => {
        window.addEventListener("beforeinstallprompt", e => {
            setInstallEvent(e as InstallEvent)
        })
    }, [])

    React.useEffect(() => {
        window.addEventListener("appinstalled", () => setWasInstalled(true))
    }, [])

    React.useEffect(initGapiClient(setIsLoggedIn), [])

    const { title, more } = getTitleAndMore()

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
    } else if (title || more) {
        return <NewEventPage title={title} more={more} />
    } else {
        return <TipPage />
    }
}

export default App
