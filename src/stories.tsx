import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { InstallPage, InstallEvent } from "./InstallPage"
import { LoginPage } from "./LogInPage"
import { NewEventPage } from "./NewEventPage"
import { SomethingWrongPage } from "./SomethingWrongPage"
import { TipPage } from "./TipPage"
import "bulma/css/bulma.css"

const installEvent: InstallEvent = {
    ...new Event("appinstalled"),
    prompt: action("open install propmpt"),
    userChoice: Promise.resolve({ outcome: "accepted" }),
}

storiesOf("InstallPage", module)
    .add("no event, wasn't installed", () => (
        <InstallPage wasInstalled={false} installEvent={null} />
    ))
    .add("has event", () => (
        <InstallPage wasInstalled={false} installEvent={installEvent} />
    ))
    .add("was installed", () => (
        <InstallPage wasInstalled={true} installEvent={installEvent} />
    ))

storiesOf("NewEventPage", module)
    .add("perfect example", () => (
        <NewEventPage
            title="How Regular Americans Can Help Reunite Migrant Families"
            more="https://medium.com/new-york-times-opinion/how-regular-americans-can-help-reunite-migrant-families-bc72e1c155e5"
        />
    ))
    .add("non-url more", () => (
        <NewEventPage
            title="How Regular Americans Can Help Reunite Migrant Families"
            more="(read more at Medium)"
        />
    ))
    .add("title only", () => (
        <NewEventPage
            title="How Regular Americans Can Help Reunite Migrant Families"
            more={null}
        />
    ))
    .add("more only", () => (
        <NewEventPage
            title={null}
            more="https://medium.com/new-york-times-opinion/how-regular-americans-can-help-reunite-migrant-families-bc72e1c155e5"
        />
    ))
    .add("nothing", () => <NewEventPage title={null} more={null} />)

storiesOf("SomethingWrongPage", module).add("empty content", () => (
    <SomethingWrongPage info={{ text: "", url: "", title: "" }} />
))

storiesOf("misc pages", module)
    .add("LoginPage", () => <LoginPage />)
    .add("TipPage", () => <TipPage />)
