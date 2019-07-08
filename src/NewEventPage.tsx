import React from "react"
import { urlRegex, t } from "./utils"
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

const Text = {
    TODAY: t({ en: "Today", ru: "Сегодня" }),
    TOMORROW: t({ en: "Tomorrow", ru: "Завтра" }),
    TWO: t({ en: "In two days", ru: "Через два дня" }),
    WEEK: t({ en: "In a week", ru: "Через неделю" }),
    MONTH: t({ en: "In a month", ru: "Через месяц" }),
    YEAR: t({ en: "In a year", ru: "Через год" }),
    SUCCESS: t({
        en: "Saved to Calendar!",
        ru: "Добавлено в календарь!",
    }),
    FAIL: t({
        en: "Something went wrong :(",
        ru: "Упс, что-то пошло не так :(",
    }),
    ENTER: t({
        en: "Enter a title",
        ru: "Добавьте заголовок",
    }),
    SELECT_DATE: t({
        en: "Pick a day:",
        ru: "Выберите день:",
    }),
    SELECT_TIME: t({
        en: "Pick a time:",
        ru: "Выберите время:",
    }),
    SAVE: t({
        en: "Save",
        ru: "Сохранить",
    }),
}

const DATES = [
    { text: Text.TODAY, value: () => startOfToday() },
    { text: Text.TOMORROW, value: () => startOfTomorrow() },
    { text: Text.TWO, value: () => addDays(startOfToday(), 2) },
    { text: Text.WEEK, value: () => addWeeks(startOfToday(), 1) },
    { text: Text.MONTH, value: () => addMonths(startOfToday(), 1) },
    { text: Text.YEAR, value: () => addYears(startOfToday(), 1) },
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
                window.history.replaceState(null, "", "/")
                setSuccessMessage(Text.SUCCESS)
            })
            .catch(() => {
                setErrorMessage(Text.FAIL)
            })

    React.useEffect(() => {
        setTimeout(() => setSuccessMessage(""), 3000)
    }, [successMessage])

    const titleElement = props.title ? (
        <p>
            <strong>{props.title}</strong>
        </p>
    ) : (
        <input
            className="input"
            value={userTitle}
            placeholder={Text.ENTER}
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
        <div className="hero is-fullheight">
            <div className="section" style={{ height: "30vh" }}>
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
                                <div className="field">{titleElement}</div>
                                <div className="field">{moreElement}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="hero-body">
                <div className="container">
                    <div className="field">
                        <label htmlFor="day-select" className="label">
                            {Text.SELECT_DATE}
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
                            {Text.SELECT_TIME}
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

            <footer className="hero-foot">
                <div className="section container has-text-centered">
                    <button
                        className="button is-primary"
                        disabled={!title}
                        onClick={createEvent}
                    >
                        {Text.SAVE}
                    </button>
                </div>
            </footer>
        </div>
    )
}
