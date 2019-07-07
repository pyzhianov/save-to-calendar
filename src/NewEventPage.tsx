import React from "react"
import { insertEvent } from "./gapi"
import { getDay, getMonth, addMonths, getDate } from "date-fns"

export interface NewEventPageProps {
    title: string
    url: string | null
}

export const NewEventPage: React.FC<NewEventPageProps> = ({ title, url }) => {
    const [errorMessage, setErrorMessage] = React.useState("")
    const [successMessage, setSuccessMessage] = React.useState("")
    const [preferredHour, setPreferredTime] = React.useState(8)

    React.useEffect(() => {
        if (successMessage) {
            setTimeout(() => setSuccessMessage(""), 2000)
        }
    }, [successMessage])

    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <section className="container section">
                    {errorMessage && (
                        <div className="notification is-warning">
                            {errorMessage}
                        </div>
                    )}
                    {successMessage && (
                        <div className="notification is-success">
                            {successMessage}
                        </div>
                    )}
                    {!successMessage && !errorMessage && (
                        <div className="box">
                            <p>
                                <strong>{title}</strong>
                            </p>
                            {url && (
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {url}
                                </a>
                            )}
                        </div>
                    )}
                </section>
                <div className="section container">
                    <div className="field">
                        <label htmlFor="day-select" className="label">
                            Day
                        </label>
                        <div className="select">
                            <select name="Day" id="day-select">
                                <option value="">Today</option>
                                <option value="">Tomorrow</option>
                                <option value="">
                                    Next {getDay(new Date())}
                                </option>
                                <option value="">
                                    On {getDate(new Date())}
                                    {getMonth(addMonths(new Date(), 1))}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="time-input" className="label">
                            Time
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
                    <div className="field">
                        <div className="control">
                            <button
                                className="button is-info"
                                onClick={async () => {
                                    try {
                                        await insertEvent(
                                            title,
                                            url || "",
                                            new Date(),
                                            // o.getStartTime(preferredHour, 14),
                                        )
                                        setSuccessMessage("Done!")
                                        window.history.replaceState(
                                            null,
                                            "",
                                            "/",
                                        )
                                        window.history.go()
                                    } catch (e) {
                                        setErrorMessage("Something went wrong")
                                    }
                                }}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
