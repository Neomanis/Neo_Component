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
