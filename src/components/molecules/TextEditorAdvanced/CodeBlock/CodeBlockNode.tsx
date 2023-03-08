import { baseStyles } from "@/utils/inputSelectCss";
import { NodeViewProps } from "@tiptap/core";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { ReactElement, useMemo } from "react";
import Select from "react-select";

const CodeBlockNode = ({ node, updateAttributes, extension, editor }: NodeViewProps): ReactElement => {
    const languages = useMemo(() => {
        return [
            { label: "auto", value: null },
            ...(extension.options.lowlight.listLanguages() as string[]).map((language) => ({
                label: language,
                value: language,
            })),
        ];
    }, []);

    return (
        <NodeViewWrapper className="relative">
            {editor.isEditable ? (
                <div className="absolute top-[5px] right-[5px] w-32">
                    <Select
                        isDisabled={!editor.isEditable}
                        className="rounded-md"
                        isSearchable
                        menuPlacement="auto"
                        onChange={(language) => updateAttributes({ language: (language as { value: string }).value })}
                        options={languages}
                        styles={{
                            ...baseStyles,
                            valueContainer: (provided) => ({
                                ...provided,
                                height: "100%",
                                paddingTop: "2px",
                                paddingBottom: "2px",
                                overflow: "scroll",
                                msOverflowStyle: "none",
                                "&::-webkit-scrollbar": {
                                    display: "none",
                                },
                                scrollbarWidth: "none",
                            }),
                        }}
                        defaultValue={{ label: node.attrs.language, value: node.attrs.language }}
                    />
                </div>
            ) : (
                <div className="absolute top-1.5 right-[5px] bg-neo-bg-B px-4 py-1 rounded-md">
                    {node.attrs.language}
                </div>
            )}
            <pre>
                <NodeViewContent as="code" />
            </pre>
        </NodeViewWrapper>
    );
};

export default CodeBlockNode;
