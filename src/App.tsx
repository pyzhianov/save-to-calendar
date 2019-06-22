import React from "react"
import "./App.css"

declare var gapi: any

const CLIENT_ID =
    "937378615319-bd1gsu5ltfh92kk7lbc9pej2pn3o44dd.apps.googleusercontent.com"
const API_KEY = "AIzaSyDVbDOW8bCQcfTnpSdsWZ6XFxn2qg0rgP0"
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly"
const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
]

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
    const [events, setEvents] = React.useState([])

    React.useEffect(() => {
        const gapiScript = document.createElement("script")
        gapiScript.src = "https://apis.google.com/js/api.js?onload=onGapiLoad"
        ;(window as any).onGapiLoad = function onGapiLoad() {
            gapi.load("client:auth2", () => initClient(setSignIn, setError))
        }
        document.body.appendChild(gapiScript)
    }, [])

    React.useEffect(() => {
        if (signedIn) {
            gapi.client.calendar.events
                .list({
                    calendarId: "primary",
                    timeMin: new Date().toISOString(),
                    showDeleted: false,
                    singleEvents: true,
                    maxResults: 10,
                    orderBy: "startTime",
                })
                .then(function(response: any) {
                    var events = response.result.items
                    setEvents(events)
                })
        }
    }, [signedIn])

    return (
        <div>
            {error && <div>{error}</div>}

            {events.map((event: any) => (
                <p>{event.summary}</p>
            ))}

            {!signedIn ? (
                <button onClick={() => gapi.auth2.getAuthInstance().signIn()}>
                    Authorize
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
