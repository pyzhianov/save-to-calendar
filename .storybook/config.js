import { configure } from "@storybook/react"

function loadStories() {
    require("../src/stories.tsx")
}

configure(loadStories, module)
