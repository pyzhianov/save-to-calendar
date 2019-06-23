import React from "react"
import { initClient } from "./gapi"
import get from "lodash.get"
import bulmaCalendar from "bulma-calendar/dist/js/bulma-calendar.min.js"
import "bulma/css/bulma.css"
import "bulma-calendar/dist/css/bulma-calendar.min.css"
import "normalize.css"

declare var gapi: any

function getEvent(
    start: string | null,
    end: string | null,
    title?: string,
    url?: string,
) {
    if (!title || !url) {
        throw new Error("No title or url provided")
    }

    if (!start || !end) {
        throw new Error("No start or end provided")
    }

    return {
        summary: title,
        description: url,
        start: {
            dateTime: start,
            timeZone: "gmt",
        },
        end: {
            dateTime: end,
            timeZone: "gmt",
        },
    }
}

function getValues() {
    const { searchParams } = new URL(window.location.href)
    const title = searchParams.get("title") || undefined
    const text = searchParams.get("text") || undefined
    const url = searchParams.get("url") || undefined
    const body = searchParams.get("body") || undefined

    return {
        title,
        url: url || text || body,
    }
}

function App() {
    const [signedIn, setSignIn] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [successMessage, setSuccessMessage] = React.useState("")

    const [startTime, setStartTime] = React.useState<string | null>(null)
    const [endTime, setEndTime] = React.useState<string | null>(null)

    const { title, url } = getValues()

    const endInputRef = React.useRef(null)
    const startInputRef = React.useRef(null)
    const startCal = get(startInputRef, "current.bulmaCalendar")
    const endCal = get(endInputRef, "current.bulmaCalendar")

    React.useEffect(() => {
        const cals = bulmaCalendar.attach('[type="datetime"]')
        console.log(cals)
    }, [])

    React.useEffect(() => {
        if (startCal) {
            startCal.on("select", ({ timeStamp }: any) => {
                setStartTime(new Date(timeStamp).toISOString())
            })
        }
    }, [startCal])

    React.useEffect(() => {
        if (endCal) {
            endCal.on("select", ({ timeStamp }: any) => {
                setEndTime(new Date(timeStamp).toISOString())
            })
        }
    }, [endCal])

    React.useEffect(() => {
        const gapiScript = document.createElement("script")
        gapiScript.src = "https://apis.google.com/js/api.js?onload=onGapiLoad"
        ;(window as any).onGapiLoad = function onGapiLoad() {
            gapi.load("client:auth2", () =>
                initClient(setSignIn, setErrorMessage),
            )
        }
        document.body.appendChild(gapiScript)
    }, [])

    return (
        <section className="section">
            <div className="container">
                <h1>New event</h1>

                {errorMessage && (
                    <div className="notification is-warning">
                        <button
                            className="delete"
                            onClick={() => setErrorMessage("")}
                        />
                        {errorMessage}
                    </div>
                )}

                {successMessage && (
                    <div className="notification is-success">
                        <button
                            className="delete"
                            onClick={() => setSuccessMessage("")}
                        />
                        {successMessage}
                    </div>
                )}

                {!successMessage && !errorMessage && (
                    <div className="box">
                        <p>
                            <strong>{title}</strong>
                        </p>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            {url}
                        </a>
                    </div>
                )}

                <div>
                    <input
                        ref={startInputRef}
                        type="datetime"
                        value={startTime || ""}
                    />
                </div>

                <div>
                    <input
                        ref={endInputRef}
                        type="datetime"
                        value={endTime || ""}
                    />
                </div>

                {signedIn && title && (
                    <button
                        className="button is-primary"
                        onClick={async () => {
                            try {
                                await gapi.client.calendar.events.insert({
                                    calendarId: "primary",
                                    resource: getEvent(
                                        startTime,
                                        endTime,
                                        title,
                                        url,
                                    ),
                                })
                                setSuccessMessage("Tada!")
                            } catch (e) {
                                console.error(e)
                                if (e instanceof Error) {
                                    setErrorMessage(e.message)
                                }
                            }
                        }}
                    >
                        Create event
                    </button>
                )}

                {!signedIn ? (
                    <button
                        className="button is-primary"
                        onClick={() => gapi.auth2.getAuthInstance().signIn()}
                    >
                        Sign in
                    </button>
                ) : (
                    <button
                        className="button"
                        onClick={() => gapi.auth2.getAuthInstance().signOut()}
                    >
                        Sign Out
                    </button>
                )}
            </div>
        </section>
    )
}

export default App
