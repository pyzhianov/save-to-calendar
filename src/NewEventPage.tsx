import React from "react"
import { urlRegex } from "./utils"
import {
    startOfTomorrow,
    addWeeks,
    addMonths,
    addYears,
    startOfToday,
    setHours,
    getHours,
    parse,
    addDays,
} from "date-fns"
import { insertEvent } from "./gapi"

export interface NewEventPageProps {
    title: string | null
    more: string | null
}

const HOURS = Array(24)
    .fill(0)
    .map((_, i) => i)

const DATES = [
    { text: "Today", value: () => startOfToday() },
    { text: "Tomorrow", value: () => startOfTomorrow() },
    { text: "In two days", value: () => addDays(startOfToday(), 2) },
    { text: "In a week", value: () => addWeeks(startOfToday(), 1) },
    { text: "In a month", value: () => addMonths(startOfToday(), 1) },
    { text: "In a year", value: () => addYears(startOfToday(), 1) },
]

export function NewEventPage(props: NewEventPageProps) {
    const [userTitle, setTitle] = React.useState("")
    const [errorMessage, setErrorMessage] = React.useState("")
    const [successMessage, setSuccessMessage] = React.useState("")
    const [preferredHour, setPreferredHour] = React.useState(
        Math.min(23, getHours(new Date()) + 2),
    )
    const [preferredDate, setPreferredDay] = React.useState(startOfToday())

    const title = props.title || userTitle
    const more = props.more || ""
    const moreIsUrl = more && more.match(urlRegex)

    const createEvent = () =>
        insertEvent(title, more, setHours(preferredDate, preferredHour))
            .then(() => {
                setSuccessMessage("Saved to Calendar!")
                window.history.replaceState(null, "", "/")
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
                            <select
                                name="Day"
                                id="day-select"
                                onChange={e =>
                                    setPreferredDay(parse(e.target.value))
                                }
                            >
                                {DATES.map(({ text, value }) => (
                                    <option
                                        key={text}
                                        value={value().toISOString()}
                                    >
                                        {text}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="time-input" className="label">
                            Select time
                        </label>
                        <div className="select">
                            <select
                                id="time-input"
                                value={preferredHour}
                                onChange={e =>
                                    setPreferredHour(parseInt(e.target.value))
                                }
                            >
                                {HOURS.map(h => (
                                    <option
                                        key={h}
                                        value={h}
                                    >{`${h}:00`}</option>
                                ))}
                            </select>
                        </div>
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
