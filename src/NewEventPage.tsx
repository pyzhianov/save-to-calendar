import React from "react"
import { insertEvent } from "./gapi"

export interface NewEventPageProps {
    title: string | null
    more: string | null
}

export function NewEventPage(props: NewEventPageProps) {
    const [userTitle, setTitle] = React.useState("")
    const [errorMessage, setErrorMessage] = React.useState("")
    const [successMessage, setSuccessMessage] = React.useState("")
    const [preferredHour, setPreferredTime] = React.useState(8)

    const title = props.title || userTitle
    const more = props.more || ""
    const moreIsUrl = more && more.match(/^https?:\/\//)

    React.useEffect(() => {
        if (successMessage) {
            setTimeout(() => setSuccessMessage(""), 2000)
        }
    }, [successMessage])

    const createEvent = () =>
        insertEvent(title, more, new Date())
            .then(() => {
                setSuccessMessage("Event created!")
                window.history.replaceState(null, "", "/")
                window.history.go()
            })
            .catch(() => {
                setErrorMessage("Something went wrong :(")
            })

    const titleElement = props.title ? (
        <p>
            <strong>{props.title}</strong>
        </p>
    ) : (
        <input
            className="input"
            value={userTitle}
            placeholder="Enter the title"
            onChange={e => setTitle(e.target.value)}
        />
    )

    const moreElement =
        more && moreIsUrl ? (
            <a href={more} target="_blank" rel="noopener noreferrer">
                {more}
            </a>
        ) : more ? (
            <p>{more}</p>
        ) : null

    return (
        <>
            <div className="section">
                <div className="container">
                    <div className="field">
                        {errorMessage ? (
                            <div className="notification is-warning">
                                {errorMessage}
                            </div>
                        ) : successMessage ? (
                            <div className="notification is-success">
                                {successMessage}
                            </div>
                        ) : (
                            <div className="box">
                                {titleElement}
                                {moreElement}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="section">
                <div className="container">
                    <div className="field">
                        <label htmlFor="day-select" className="label">
                            Select day:
                        </label>
                        <div className="select">
                            <select name="Day" id="day-select">
                                <option value="">Tomorrow</option>
                                <option value="">In two days</option>
                                <option value="">In a week</option>
                                <option value="">In a month</option>
                                <option value="">In a year</option>
                            </select>
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="time-input" className="label">
                            Select time
                        </label>
                        <input
                            id="time-input"
                            className="input"
                            type="number"
                            min={0}
                            max={23}
                            value={preferredHour}
                            onChange={e => {
                                setPreferredTime(parseInt(e.target.value))
                            }}
                        />
                    </div>
                </div>
            </div>

            <footer className="footer has-background-white">
                <div className="container has-text-centered">
                    <button
                        className="button is-primary"
                        disabled={!title}
                        onClick={createEvent}
                    >
                        Save for later
                    </button>
                </div>
            </footer>
        </>
    )
}
