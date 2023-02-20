import React, { ReactElement } from "react";
import { Button } from "@/components/atoms";
import { classNames } from "@/utils";
import {
    faAlignCenter,
    faAlignJustify,
    faAlignLeft,
    faAlignRight,
    faBold,
    faItalic,
    faListOl,
    faListUl,
    faStrikethrough,
    faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor } from "@tiptap/react";

export type MenuButtons =
    | "heading-1-button"
    | "heading-2-button"
    | "heading-3-button"
    | "heading-4-button"
    | "bold-button"
    | "italic-button"
    | "underline-button"
    | "strikethrough-button"
    | "bullet-list-button"
    | "ordered-list-button"
    | "align-left-button"
    | "align-center-button"
    | "align-right-button"
    | "align-justify-button";

interface TipTapButton {
    icon?: ReactElement;
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    content?: ReactElement;
    id: MenuButtons;
}
interface Props {
    editor: Editor | null;
    menuButtonsFilter?: MenuButtons[];
}

const TipTapMenu = ({ editor, menuButtonsFilter }: Props) => {
    const menuButtons: TipTapButton[] = [
        {
            onClick: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: editor?.isActive("heading", { level: 1 }),
            content: <span className="text-lg">H1</span>,
            id: "heading-1-button",
        },
        {
            onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: editor?.isActive("heading", { level: 2 }),
            content: <span className="text-lg">H2</span>,
            id: "heading-2-button",
        },
        {
            onClick: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: editor?.isActive("heading", { level: 3 }),
            content: <span className="text-lg">H3</span>,
            id: "heading-3-button",
        },
        {
            onClick: () => editor?.chain().focus().toggleHeading({ level: 4 }).run(),
            isActive: editor?.isActive("heading", { level: 4 }),
            content: <span className="text-lg">H4</span>,
            id: "heading-4-button",
        },
        {
            icon: <FontAwesomeIcon icon={faBold} />,
            onClick: () => editor?.chain().focus().toggleBold().run(),
            disabled: !editor?.can().chain().focus().toggleBold().run(),
            isActive: editor?.isActive("bold"),
            id: "bold-button",
        },
        {
            icon: <FontAwesomeIcon icon={faItalic} />,
            onClick: () => editor?.chain().focus().toggleItalic().run(),
            disabled: !editor?.can().chain().focus().toggleItalic().run(),
            isActive: editor?.isActive("italic"),
            id: "italic-button",
        },
        {
            icon: <FontAwesomeIcon icon={faUnderline} />,
            onClick: () => editor?.chain().focus().toggleUnderline().run(),
            disabled: !editor?.can().chain().focus().toggleUnderline().run(),
            isActive: editor?.isActive("underline"),
            id: "underline-button",
        },
        {
            icon: <FontAwesomeIcon icon={faStrikethrough} />,
            onClick: () => editor?.chain().focus().toggleStrike().run(),
            disabled: !editor?.can().chain().focus().toggleStrike().run(),
            isActive: editor?.isActive("strike"),
            id: "strikethrough-button",
        },
        {
            icon: <FontAwesomeIcon icon={faListUl} />,
            onClick: () => editor?.chain().focus().toggleBulletList().run(),
            disabled: !editor?.can().chain().focus().toggleBulletList().run(),
            isActive: editor?.isActive("bulletList"),
            id: "bullet-list-button",
        },
        {
            icon: <FontAwesomeIcon icon={faListOl} />,
            onClick: () => editor?.chain().focus().toggleOrderedList().run(),
            disabled: !editor?.can().chain().focus().toggleOrderedList().run(),
            isActive: editor?.isActive("orderedList"),
            id: "ordered-list-button",
        },
        {
            icon: <FontAwesomeIcon icon={faAlignLeft} />,
            onClick: () => editor?.chain().focus().setTextAlign("left").run(),
            isActive: editor?.isActive({ textAlign: "left" }),
            id: "align-left-button",
        },
        {
            icon: <FontAwesomeIcon icon={faAlignCenter} />,
            onClick: () => editor?.chain().focus().setTextAlign("center").run(),
            isActive: editor?.isActive({ textAlign: "center" }),
            id: "align-center-button",
        },
        {
            icon: <FontAwesomeIcon icon={faAlignRight} />,
            onClick: () => editor?.chain().focus().setTextAlign("right").run(),
            isActive: editor?.isActive({ textAlign: "right" }),
            id: "align-right-button",
        },
        {
            icon: <FontAwesomeIcon icon={faAlignJustify} />,
            onClick: () => editor?.chain().focus().setTextAlign("justify").run(),
            isActive: editor?.isActive({ textAlign: "justify" }),
            id: "align-justify-button",
        },
        // TODO: Create a custom tiptap node for hyperlink
    ];

    if (!editor) {
        return null;
    }

    return (
        <div className="flex bg-neo-bg-B gap-1 px-4 rounded-t-md">
            {menuButtons
                .filter((button) => menuButtonsFilter?.includes(button.id) ?? true)
                .map(({ icon, disabled, isActive, onClick, content, id }, key) => (
                    <Button
                        id={id}
                        key={key}
                        startIcon={icon ?? null}
                        variant="none"
                        size="none"
                        rounded="none"
                        onClick={onClick}
                        disabled={disabled}
                        className={classNames(
                            "h-12 w-8 flex items-center justify-center",
                            isActive ? "text-neo-blue" : "text-white"
                        )}
                    >
                        {content}
                    </Button>
                ))}
        </div>
    );
};

export default TipTapMenu;
