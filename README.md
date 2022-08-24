## Prerequisite

Exposed Port:

-   6006

Internal Service Name:

-   Neo Component

## Available Scripts

In the project directory, you can run:

### `yarn storybook`

Run the storybook serveur on 6006 port.\
Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

### `yarn build`

Builds the app with vite to be usable as a node_module in other service

### `yarn husky:setup`

It will setup husky to roll before commit
If you run it multiple times you will add duplicate pre-commit hooks, so if in a doubt simply delete `.husky/` folder and run `yarn husky:setup`

:warn: On windows you could run into some trouble to push your change, if so go to `./.husky/pre-push` and add before `yarn build`:

```bash
if [ -t 1 ]; then
  exec < /dev/tty
fi
```

## Local storage

If you are making breaking change to local storage don't forget to update the LOCAL_STORAGE_VERSION in useLocalStorage file

## How to add a new translation

-   First look in the translation files in `src/locales` if your translation already exist
-   Translation are sorted by lexical field
-   If you think some translation could be better sorted, go ahead !
-   Avoid full uppercase translation, use `toUpperCase()` in your javascript
-   Avoid having the name of the previous key in the translation key
    -   `❌ "ticket": { "newTicket": "New ticket"}`
    -   `✅ "ticket": { "new": "New ticket"}`

### Plural

You can add singular and plural translation by having one key with `_one` for singular and `_other` for plural

In your translation file:

```json
"ticket":  {
    "new_one": "New Ticket",
    "new_other": "New Tickets",
}
```

In your javascript:

```js
t("ticket.new", { count: 1 }); // New Ticket
t("ticket.new", { count: 326 }); // New Tickets
```

### Variable

You can have some variable injected in your translation using the `{{yourVariable}}` syntax, it works with count or anything

In your translation file:

```json
"ticket":  {
    "withNumber_one": "{{count}} ticket",
    "withNumber_other": "{{count}} tickets",
}
```

In your javascript:

```js
t("ticket.withNumber", { count: 1 }); // 1 ticket
t("ticket.withNumber", { count: 326 }); // 326 tickets
```

### Context

You can add context to your translation, here is a exemple for gender

In your translation file:

```json
"scale":  {
    "low": "Bas",
    "low_female": "Basse",
    "high": "Haut",
    "high_female": "Haute",
}
```

In your javascript:

```js
t("scale.low"); // Bas
t("scale.low", { context: "female" }); // Basse
```

## How to test the package locally

### Method 1:

First, you need to change the package version and build it with rollup `yarn build`

When the build is done, run `yarn pack` to compile your package in a tgz file

Then go to the project where you want to test it and run `yarn add file:path/to/tgz/file` <br/>
Exemple : `yarn add file:../Neo_Component/neomanis-neo-component-v2.26.0.tgz`

Now it will take your local package

⚠️ Before you commit and push your work in the other project, don't forget to remove the local package from the project and do a proper install <br/>
`yarn remove @neomanis/neo-component`<br/>
`yarn add @neomanis/neo-component`<br/>

### Method 2 (using yarn link):

#### For standart library (js/ts)

First run:

-   `cd ../Your-Local-Package`
-   `yarn build`
-   `yarn link` (this will print out a Success message with the yarn command to use later on)
-   `yarn install`

Then:

-   `cd ../path/to/Your-React-Project`
-   `yarn link Your-Local-Package-alias`

And it's all good.

#### For React library only (Neo_Component)

First run:

-   `cd ../Your-Local-Package`
-   `yarn build`
-   `yarn link` (this will print out a Success message with the yarn command to use later on)
-   `yarn install`

Then (still in the same folder) run:

-   `cd ./node_modules/react`
-   `yarn link` wich will create an alias (`react`)
-   `cd ../react-dom`
-   `yarn link` wich will also create an alias (`react-dom`)

Finally:

-   `cd ../path/to/Your-React-Project`
-   `yarn link Your-Local-Package-alias`
-   `yarn link react`
-   `yarn link react-dom`

You'll have to build your local package and restart your react server on every modifications in order to see your updates.

note: If you need to unlink you can run `yarn unlink` in the folder that you desire to remove from aliases
There is no prerequisites before push your work into your branch, since the simlinks are made locally

## Playwright

[Here some documentations](https://playwright.dev/docs/intro)

You should install the playwight vscode extension:
Name: Playwright Test for VSCode
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright

With it you can run your tests directly from vscode.

`yarn test` -> it will run all the tests in the project on different browsers (Chromium, Firefox, WebKit). If any test fails it will open a report in the browser with the results.

## Component generation

You can generate a new component with the following command:
`yarn generate:atoms <name>`
`yarn generate:molecules <name>`
`yarn generate:organism <name>`

You can chain multiple component name like : `yarn generate:atoms Toto Titi Tata`

It will a create a new folder in the corresponding component type with 4 new files:

-   `<name>.tsx` (component)
-   `<name>.spec.tsx` (test)
-   `<name>.stories.tsx` (storybook)
-   `index.ts` (index file to export the component)

It will also add it's export in the corresponding component type index file

## React-Select

### Overriding styles

-   In order to override style in react-select component, you can use the `customStyleOverride` props to set inner elements with custom styles. You can go visite this page to see what and how to use it (https://react-select.com/styles).

-   Here is the base styled from our library:

```js
clearIndicator: (provided, state) => ({
        ...provided,
        display: "bloc",
        padding: 0,
        position: "absolute",
        right: 30,
        top: 10,
        border: "none",
    }),
    container: (provided, state) => ({
        ...provided,
        background: "#0E3864",
        padding: 0,
        margin: 0,
        color: "#DAE5E5",
    }),
    control: (provided, state) => ({
        ...provided,
        width: "100%",
        color: "#DAE5E5",
        background: "#0E3864",
        border: "none",
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        display: "bloc",
        padding: 0,
        position: "absolute",
        right: 5,
        top: 10,
        border: "none",
    }),
    indicatorSeparator: (provided, state) => ({
        ...provided,
        display: "none",
    }),
    input: (provided, state) => ({
        ...provided,
        color: "#DAE5E5",
        margin: 0,
    }),
    menu: (provided, state) => ({
        ...provided,
        background: "#0E3864",
    }),
    multiValue: (provided, state) => ({
        ...provided,
        color: "#DAE5E5",
        background: "#FF1166",
        margin: 1,
    }),
    multiValueLabel: (provided, state) => ({
        ...provided,
        background: "#152535",
        color: "#DAE5E5",
    }),
    noOptionsMessage: (provided, state) => ({
        ...provided,
        background: "#0E3864",
        borderRadius: 10,
        margin: 0,
    }),
    option: (provided, state: { isSelected }) => ({
        ...provided,
        "&:hover": {
            background: "#366688",
            cursor: "pointer",
        },
        background: "#0E3864",
        color: state.isSelected ? "#FF1166" : "#DAE5E5",
        padding: 10,
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: "#DAE5E5",
    }),
```

