import { classNames } from "@/utils";
import { NodeViewProps } from "@tiptap/core";
import { NodeViewWrapper } from "@tiptap/react";
import { ReactElement } from "react";

const CustomImageNode = ({ node }: NodeViewProps): ReactElement => {
    return (
        <NodeViewWrapper className={classNames("flex", node.attrs.justifyContent)}>
            <img data-drag-handle {...node.attrs} />
        </NodeViewWrapper>
    );
};

export default CustomImageNode;
