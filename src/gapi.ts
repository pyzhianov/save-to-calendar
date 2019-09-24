import formatDate from "date-fns/format"
import addHours from "date-fns/add_hours"

declare const gapi: any
declare global {
    interface Window {
        onGapiLoad: any
    }
}

const CLIENT_ID =
    "937378615319-ismhml4chkkd9let2k6su6o40ip43lor.apps.googleusercontent.com"
const API_KEY = "AIzaSyAAoo9d_gRLhkrbqzdstpsGQ7W93namgeI"
const SCOPES = "https://www.googleapis.com/auth/calendar.events"
const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
]

const utcWithTimezone = "YYYY-MM-DDTHH:mm:ss.SSSZ"

export function initGapiClient(setLoginStatus: (loggedIn: boolean) => void) {
    return () => {
        const gapiScript = document.createElement("script")
        gapiScript.src = "https://apis.google.com/js/api.js?onload=onGapiLoad"

        window.onGapiLoad = () => {
            gapi.load("client:auth2", async () => {
                await gapi.client.init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    discoveryDocs: DISCOVERY_DOCS,
                    scope: SCOPES,
                })

                gapi.auth2.getAuthInstance().isSignedIn.listen(setLoginStatus)

                const isLoggedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
                setLoginStatus(isLoggedIn)
            })
        }

        document.body.appendChild(gapiScript)
    }
}

export function signIn() {
    return gapi.auth2.getAuthInstance().signIn()
}

export function signOut() {
    return gapi.auth2.getAuthInstance().signOut()
}

export function insertEvent(title: string, url: string, start: Date) {
    console.log(title, url, start)

    return gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: {
            summary: title,
            description: url,
            start: {
                dateTime: formatDate(start, utcWithTimezone),
            },
            end: {
                dateTime: formatDate(addHours(start, 1), utcWithTimezone),
            },
        },
    })
}
