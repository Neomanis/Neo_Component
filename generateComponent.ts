const fs = require("fs");
const execSync = require("child_process").execSync;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const componentType = process.argv[2];
const componentsNames = process.argv.slice(3).map(capitalizeFirstLetter);

execSync(`npx generate-react-cli component --type=${componentType} ${componentsNames.join(" ")}`);

componentsNames.forEach((componentName) => {
    fs.appendFileSync(
        `./src/components/${componentType}/index.ts`,
        `export { default as ${componentName} } from "./${componentName}";\n`
    );
});
