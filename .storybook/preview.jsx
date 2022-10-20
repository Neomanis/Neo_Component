import "../src/styles/tailwind.css";
import "../src/styles/index.css";
import StoryLayout from "./storyLayout";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

export const decorators = [
    (Story, options) => {
        console.log(options);

        return (
            <StoryLayout
                title={options.title}
                description={options.description}
                storySource={options.parameters.storySource}
                name={options.name}
            >
                <Story />
            </StoryLayout>
        );
    },
];

