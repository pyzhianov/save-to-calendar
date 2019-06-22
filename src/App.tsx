import React from "react"
import "./App.css"

declare var gapi: any

const CLIENT_ID =
    "937378615319-bd1gsu5ltfh92kk7lbc9pej2pn3o44dd.apps.googleusercontent.com"
const API_KEY = "AIzaSyDVbDOW8bCQcfTnpSdsWZ6XFxn2qg0rgP0"
const SCOPES = "https://www.googleapis.com/auth/calendar.events"
const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
]

function getEvent(title?: string, description?: string) {
    return {
        summary: title || "Go read",
        description: description || "You should really be reading that article",
        end: {
            dateTime: new Date(Date.now() + 86400000 + 3600000).toISOString(),
            timeZone: "gmt",
        },
        start: {
            dateTime: new Date(Date.now() + 86400000).toISOString(),
            timeZone: "gmt",
        },
    }
}

function initClient(
    updateSigninStatus: (is: boolean) => void,
    displayError: Function,
) {
    gapi.client
        .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
        })
        .then(
            function() {
                // Listen for sign-in state changes.
                gapi.auth2
                    .getAuthInstance()
                    .isSignedIn.listen(updateSigninStatus)

                // Handle the initial sign-in state.
                updateSigninStatus(
                    gapi.auth2.getAuthInstance().isSignedIn.get(),
                )
            },
            function(error: Error) {
                displayError(JSON.stringify(error, null, 2))
            },
        )
}

function App() {
    const [signedIn, setSignIn] = React.useState(false)
    const [error, setError] = React.useState<any>(null)
    const [status, setStatus] = React.useState("")

    const { searchParams } = new URL(window.location.href)
    const title = searchParams.get("title") || undefined
    const text = searchParams.get("text") || undefined
    const url = searchParams.get("url") || undefined
    const body = searchParams.get("body") || undefined

    React.useEffect(() => {
        const gapiScript = document.createElement("script")
        gapiScript.src = "https://apis.google.com/js/api.js?onload=onGapiLoad"
        ;(window as any).onGapiLoad = function onGapiLoad() {
            gapi.load("client:auth2", () => initClient(setSignIn, setError))
        }
        document.body.appendChild(gapiScript)
    }, [])

    return (
        <div>
            {status && <div>{status}</div>}
            {error && <div>{error}</div>}

            <div>
                <p>title: {title}</p>
                <p>url: {url}</p>
                <p>text: {text}</p>
                <p>body: {body}</p>
            </div>

            {signedIn && title && (
                <button
                    onClick={() => {
                        gapi.client.calendar.events
                            .insert({
                                calendarId: "primary",
                                resource: getEvent(title, text),
                            })
                            .then((result: any) =>
                                setStatus(JSON.stringify(result)),
                            )
                            .catch((err: any) => setStatus(JSON.stringify(err)))
                    }}
                >
                    Create event
                </button>
            )}

            {!signedIn ? (
                <button onClick={() => gapi.auth2.getAuthInstance().signIn()}>
                    Sign in
                </button>
            ) : (
                <button onClick={() => gapi.auth2.getAuthInstance().signOut()}>
                    Sign Out
                </button>
            )}
        </div>
    )
}

export default App
