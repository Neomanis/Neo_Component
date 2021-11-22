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

Builds the app with rollup to be usable as a node_module in other service

### `yarn husky:setup`

It will setup husky to roll before commit
If you run it multiple times you will add duplicate pre-commit hooks, so if in a doubt simply delete `.husky/` folder and run `yarn husky:setup`

:warn: On windows you could run into some trouble to push your change, if so go to `./.husky/pre-push` and add before `yarn build`:

```bash
if [ -t 1 ]; then
  exec < /dev/tty
fi
```

## How to test the package locally

### Method 1:

First, you need to change the package version and build it with rollup `yarn build`

When the build is done, run `yarn pack` to compile your package in a tgz file

Then go to the project where you want to test it and run `yarn add file:path/to/tgz/file` <br/>
Exemple : `yarn add file:../Neo_Component/neomanis-neo-component-v1.6.6.tgz`

Now it will take your local package

⚠️⚠️⚠️<br/>
Before you commit and push your work in the other project, don't forget to remove the local package from the project and do a proper install <br/>
`yarn remove @neomanis/neo-component`<br/>
`yarn add @neomanis/neo-component`<br/>
⚠️⚠️⚠️

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

## Cypress

[Here some documentations](https://docs.cypress.io/guides/overview/why-cypress)

#### Before all
You should delete your .husky and regenerate it with `yarn husky:setup`
Note also that you should have installed locally a version of chrome and firefox.
For GNU/linux user you can, instead of chrome, use chromium. You should also modify you husky push hook to target this script `ci:storybook:chromium` instead of `ci:storybook:chrome`.

You can use cypress to create e2e testing. To do so simply add a `.spec.js` file in `./cypress/integration/storybook/` and start hacking some e2e tests.

#### Here are several script that you can use during development:

- `cypress:run` -> it will simply launch a test runner like jest, but know that you should have storybook server running in parallel on port 6006
- `cypress:open` -> it will open an electron app to monitor your tests suites

- `ci:<nextcommand>` -> this is only used by husky, so you shouldn't have to use it

