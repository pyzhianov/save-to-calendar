import React from "react"
import { initGapiClient, insertEvent, signIn, signOut } from "./gapi"
import startOfTomorrow from "date-fns/start_of_tomorrow"
import setDay from "date-fns/set_day"
import setHours from "date-fns/set_hours"
import startOfToday from "date-fns/start_of_today"
import "bulma/css/bulma.css"
import "normalize.css"

function App() {
    const { searchParams } = new URL(window.location.href)
    const [signedIn, setSignIn] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [successMessage, setSuccessMessage] = React.useState("")
    const [preferredTime, setPreferredTime] = React.useState(8)

    const title = searchParams.get("title") || undefined
    const url = searchParams.get("text") || undefined

    React.useEffect(initGapiClient(setSignIn), [])

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

                {signedIn && (
                    <label>
                        Preferred time
                        <input
                            type="number"
                            min={0}
                            max={23}
                            value={preferredTime}
                            onChange={e => {
                                setPreferredTime(parseInt(e.target.value))
                            }}
                        />
                    </label>
                )}

                {signedIn && title && url && (
                    <>
                        <button
                            className="button is-primary"
                            onClick={async () => {
                                await insertEvent(
                                    title,
                                    url,
                                    setHours(startOfToday(), 14),
                                )
                                setSuccessMessage(
                                    "Reading is good for digestion!",
                                )
                            }}
                        >
                            At lunch
                        </button>
                        <button
                            className="button is-primary"
                            onClick={async () => {
                                await insertEvent(
                                    title,
                                    url,
                                    setHours(startOfTomorrow(), preferredTime),
                                )
                                setSuccessMessage("Tomorrow is the day!")
                            }}
                        >
                            Tomorrow
                        </button>
                        <button
                            className="button is-primary"
                            onClick={async () => {
                                await insertEvent(
                                    title,
                                    url,
                                    setHours(
                                        setDay(startOfToday(), 6),
                                        preferredTime,
                                    ),
                                )
                                setSuccessMessage(
                                    "Remember to go outside as well!",
                                )
                            }}
                        >
                            Weekends
                        </button>
                    </>
                )}

                {!signedIn ? (
                    <button className="button is-primary" onClick={signIn}>
                        Sign in
                    </button>
                ) : (
                    <button className="button" onClick={signOut}>
                        Sign Out
                    </button>
                )}
            </div>
        </section>
    )
}

export default App
