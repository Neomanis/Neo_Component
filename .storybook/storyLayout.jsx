import React, { useMemo, useState } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/vsDark";

const StoryLayout = ({ children, title, description, name, storySource: { source, locationsMap } }) => {
    const [selectedTab, setSelectedTab] = useState("preview");
    const { lineStart, lineEnd } = useMemo(() => {
        return {
            lineStart: locationsMap[name.toLowerCase().replaceAll(" ", "-")].startLoc.line - 1,
            lineEnd: locationsMap[name.toLowerCase().replaceAll(" ", "-")].endLoc.line - 1,
        };
    });

    return (
        <div className="w-full h-full my-4">
            <h1 className="text-4xl text-base-content font-bold text-neo-light-grey">{title}</h1>
            <p className="text-base-content">{description}</p>
            <div className="flex text-neo-light-grey mt-2">
                <div
                    className={`p-2 cursor-pointer ${selectedTab === "preview" && "bg-neo-blue-extraDark rounded-t"}`}
                    onClick={() => setSelectedTab("preview")}
                >
                    Preview
                </div>
                <div
                    className={`p-2 cursor-pointer ${selectedTab === "html" && "bg-neo-blue-extraDark rounded-t"}`}
                    onClick={() => setSelectedTab("html")}
                >
                    HTML
                </div>
            </div>
            {selectedTab === "preview" ? (
                <div className="flex items-center justify-center bg-neo-blue-extraDark p-4 rounded-b rounded-tr">
                    {children}
                </div>
            ) : (
                <div className="bg-neo-blue-extraDark p-4 rounded-b rounded">
                    <Highlight {...defaultProps} code={source} language="jsx">
                        {({ tokens, getLineProps, getTokenProps }) => (
                            <pre slot="html">
                                {tokens.map((line, i) => {
                                    if (i <= lineStart || i >= lineEnd) {
                                        return null;
                                    }
                                    return (
                                        <div {...getLineProps({ line, key: i })}>
                                            {line.map((token, key) => (
                                                <span {...getTokenProps({ token, key })} />
                                            ))}
                                        </div>
                                    );
                                })}
                            </pre>
                        )}
                    </Highlight>
                </div>
            )}
        </div>
    );
};

export default StoryLayout;
