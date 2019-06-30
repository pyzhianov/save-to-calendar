import React from "react"
import { storiesOf } from "@storybook/react"
import { InstallPage, InstallEvent } from "./InstallPage"
import { action } from "@storybook/addon-actions"
import { LoginPage } from "./LogInPage"
import { NewEventPage } from "./NewEventPage"
import { SomethingWrongPage } from "./SomethingWrongPage"
import { TipPage } from "./TipPage"
import "bulma/css/bulma.css"

const event: InstallEvent = {
    prompt: action("prompt install"),
    userChoice: Promise.resolve({
        outcome: "accepted",
    }),
    ...new Event("beforeinstallprompt"),
}

storiesOf("LoginPage", module)
    .add("logged out", () => <LoginPage isLoggedIn={false} />)
    .add("logged in", () => <LoginPage isLoggedIn={true} />)

storiesOf("InstallPage", module).add("with event", () => (
    <InstallPage onInstall={action("install event")} installEvent={event} />
))

storiesOf("TipPage", module).add("with event", () => <TipPage />)

storiesOf("SomethingWrongPage", module).add("vanilla", () => (
    <SomethingWrongPage />
))

storiesOf("NewEventPage", module).add("logged out", () => (
    <NewEventPage
        title="How Regular Americans Can Help Reunite Migrant Families"
        url="https://medium.com/new-york-times-opinion/how-regular-americans-can-help-reunite-migrant-families-bc72e1c155e5"
    />
))
