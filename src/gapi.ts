import formatDate from "date-fns/format"
import addHours from "date-fns/add_hours"

declare const gapi: any
declare global {
    interface Window {
        onGapiLoad: any
    }
}

const CLIENT_ID =
    "937378615319-bd1gsu5ltfh92kk7lbc9pej2pn3o44dd.apps.googleusercontent.com"
const API_KEY = "AIzaSyDVbDOW8bCQcfTnpSdsWZ6XFxn2qg0rgP0"
const SCOPES = "https://www.googleapis.com/auth/calendar.events"
const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
]

const utcWithTimezone = "YYYY-MM-DDTHH:mm:ss.SSSZ"

export function initGapiClient(setSignInStatus: (isLoggedIn: boolean) => void) {
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
                gapi.auth2.getAuthInstance().isSignedIn.listen(setSignInStatus)
                setSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
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
    return gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: {
            summary: title,
            description: url,
            start: {
                dateTime: formatDate(start, utcWithTimezone),
                timeZone: "gmt",
            },
            end: {
                dateTime: formatDate(addHours(start, 1), utcWithTimezone),
                timeZone: "gmt",
            },
        },
    })
}
