import React from "react"
import { initGapiClient } from "./gapi"
import { NewEventPage } from "./NewEventPage"
import { TipPage } from "./TipPage"
import { InstallPage, InstallEvent } from "./InstallPage"
import { LoginPage } from "./LogInPage"

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

function getTitleAndMore() {
    const { searchParams } = new URL(window.location.href)
    const title = searchParams.get("title") || ""
    const text = searchParams.get("text") || ""
    const url = searchParams.get("url") || ""

    const urlInText = text && text.match(urlRegex)

    if (!title && text && urlInText && urlInText.length > 0) {
        return {
            title: text.replace(urlInText[0], "").trim(),
            more: urlInText[0],
        }
    } else {
        return {
            title: title || "",
            more: url || text || "",
        }
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
