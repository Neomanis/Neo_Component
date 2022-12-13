import { classNames, useOnClickOutside } from "@/utils";
import React, { ReactElement, useMemo, useRef, useState } from "react";
import Button from "../Button";
import { ButtonProps } from "../Button/Button";

interface Props<T> {
    array: { label: string; value: T }[];
    selectedItem?: T;
    button: ButtonProps;
    aligneSelect?: "left" | "right";
    selectOne?: boolean;
    onClick: (item: T) => void;
}

export default function ButtonSelect<T>({
    array,
    button,
    aligneSelect,
    selectedItem,
    selectOne,
    onClick,
}: Props<T>): ReactElement {
    const wrapperRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(wrapperRef, () => setShowDropdown(false));

    const [showDropdown, setShowDropdown] = useState(false);

    const showSelect = useMemo(() => {
        if (selectOne) {
            return true;
        }
        if (array.length > 1 && !selectedItem) {
            return true;
        }
        return false;
    }, [selectOne, selectedItem, array]);

    if (showSelect) {
        return (
            <div className="relative group" ref={wrapperRef}>
                <Button
                    {...button}
                    className={classNames("group", button.className)}
                    onClick={() => setShowDropdown(!showDropdown)}
                />
                <ul
                    className={classNames(
                        "absolute mt-2 bg-neo-settings-grey text-white text-xs font-bold rounded z-10 transform min-w-full overflow-hidden",
                        showDropdown ? "block" : "hidden",
                        !aligneSelect && "-translate-x-1/2 left-1/2",
                        aligneSelect === "right" && "right-0",
                        aligneSelect === "left" && "left-0"
                    )}
                    id="button-select-list"
                >
                    {array.map((item, key) => (
                        <li
                            id={`item-option-${item.label}`}
                            data-attribute="item-button-option"
                            key={key}
                            className="hover:bg-neo-settings-lightGrey px-3 py-2 cursor-pointer min-w-max"
                            onClick={() => {
                                setShowDropdown(!setShowDropdown);
                                onClick(item.value);
                            }}
                        >
                            <p>{item.label}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    } else {
        return <Button {...button} onClick={() => onClick(selectedItem ?? array[0].value)} />;
    }
}
