/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

if (
    process.env.REACT_APP_ENV !== "production" &&
    !fs.existsSync("./.husky/pre-commit") &&
    !fs.existsSync("./.husky/pre-push")
) {
    throw new Error("Error: .husky directory or pre-commit file is missing, run yarn husky:setup");
}
