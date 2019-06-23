declare var gapi: any

const CLIENT_ID =
    "937378615319-bd1gsu5ltfh92kk7lbc9pej2pn3o44dd.apps.googleusercontent.com"
const API_KEY = "AIzaSyDVbDOW8bCQcfTnpSdsWZ6XFxn2qg0rgP0"
const SCOPES = "https://www.googleapis.com/auth/calendar.events"
const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
]

export function initClient(
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
