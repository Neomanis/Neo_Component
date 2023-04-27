import { Button } from "@/components/atoms";
import { classNames, createTimeout } from "@/utils";
import { baseStyles } from "@/utils/inputSelectCss";
import { useTranslation } from "@neomanis/neo-translation";
import { NodeViewProps } from "@tiptap/core";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import Select from "react-select";

function LanguageSelector({ editor, extension, updateAttributes, node }: NodeViewProps) {
    const languages = useMemo(() => {
        return [
            { label: "auto", value: null },
            ...(extension.options.lowlight.listLanguages() as string[]).map((language) => ({
                label: language,
                value: language,
            })),
        ];
    }, []);

    if (extension.options.previewOnly) {
        return null;
    }

    if (!editor.isEditable) {
        return (
            <div className="absolute top-1.5 right-[5px] bg-neo-bg-B px-4 py-1 rounded-md">{node.attrs.language}</div>
        );
    }

    return (
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
    );
}

function CopyCodeButton({ content }: { content: string }) {
    const { t } = useTranslation();
    const timer = useRef<ReturnType<typeof createTimeout> | null>(null);

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        return () => {
            timer.current?.clear();
        };
    }, []);

    return (
        <Button
            onClick={async () => {
                await navigator.clipboard.writeText(content);
                timer.current?.clear();
                setClicked(true);
                timer.current = createTimeout(() => {
                    setClicked(false);
                }, 2000);
            }}
            className="absolute bottom-4 right-4 w-28 justify-center"
            variant="secondary"
            size="xs"
            rounded="md"
        >
            {clicked ? t("global.copied") : t("globa.copy")}
        </Button>
    );
}

const CodeBlockNode = (props: NodeViewProps): ReactElement => {
    return (
        <NodeViewWrapper className="relative">
            <LanguageSelector {...props} />
            <CopyCodeButton content={props.node.content.firstChild.text} />
            <pre className={classNames(props.extension.options.previewOnly && "bg-neo-blue-intermediate")}>
                <NodeViewContent as="code" />
            </pre>
        </NodeViewWrapper>
    );
};

export default CodeBlockNode;
