import React from "react"
import { insertEvent } from "./gapi"
import startOfTomorrow from "date-fns/start_of_tomorrow"
import setDay from "date-fns/set_day"
import setHours from "date-fns/set_hours"
import startOfToday from "date-fns/start_of_today"

const options = [
    {
        text: "At lunch",
        onSuccess: "Reading is good for digestion!",
        getStartTime: (morningHour: number, lunchHour: number) =>
            setHours(startOfToday(), lunchHour),
    },
    {
        text: "Tomorrow",
        onSuccess: "Tomorrow is the day!",
        getStartTime: (morningHour: number, lunchHour: number) =>
            setHours(startOfTomorrow(), morningHour),
    },
    {
        text: "On the weekends",
        onSuccess: "But don't forget to go outside as well!",
        getStartTime: (morningHour: number, lunchHour: number) =>
            setHours(setDay(startOfToday(), 6), lunchHour),
    },
]

export interface NewEventPageProps {
    title: string
    url: string
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
            <div className="hero-body container">
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
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            {url}
                        </a>
                    </div>
                )}
            </div>

            <div className="hero-buttons container">
                <label className="container">
                    Time:
                    <input
                        className="input"
                        type="number"
                        min={0}
                        max={23}
                        value={preferredHour}
                        onChange={e => {
                            setPreferredTime(parseInt(e.target.value))
                        }}
                    />
                </label>
                {options.map(o => (
                    <button
                        key={o.text}
                        className="button is-info"
                        onClick={async () => {
                            try {
                                await insertEvent(
                                    title,
                                    url,
                                    o.getStartTime(preferredHour, 14),
                                )
                                setSuccessMessage(o.onSuccess)
                                window.history.pushState(null, "", "/")
                            } catch (e) {
                                setErrorMessage("Something went wrong")
                            }
                        }}
                    >
                        {o.text}
                    </button>
                ))}
            </div>
        </section>
    )
}
