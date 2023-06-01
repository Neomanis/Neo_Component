import React, { ReactElement } from "react";
import { MembershipInfo, NeomanisUser } from "@neomanis/neo-types";
import { IconEdit, IconGroup, SquareCross, IconUserTile } from "@/img/svg";
import { classNames } from "@/utils";
import { useTranslation } from "@neomanis/neo-translation";
import { DefaultUserPicture } from "@/img/png";
import Img from "../Img";

export interface UserTileProps {
    type: "user" | "group";
    user?: NeomanisUser;
    group?: MembershipInfo;
    readOnly?: boolean;
    selectedId?: number;
    showName?: boolean;
    tileClassName?: string;
    textClassName?: string;
    onSelect?: (information: NeomanisUser | MembershipInfo) => void;
}

const UserTile = ({
    type,
    user,
    group,
    selectedId,
    showName = true,
    readOnly = false,
    tileClassName,
    textClassName,
    onSelect,
}: UserTileProps): ReactElement => {
    const { t } = useTranslation();
    const isSelected = user ? user.neoId === selectedId : group ? group.id === selectedId : false;

    if (type === "user") {
        return (
            <div
                className={classNames("relative group flex flex-col items-center", !readOnly && "cursor-pointer")}
                onClick={() => !readOnly && onSelect(user)}
            >
                <div
                    className={classNames(
                        tileClassName ?? "h-[128px] w-[128px]",
                        "relative rounded-full flex justify-center bg-neo-bg-B",
                        isSelected && "border-4 border-neo-blue",
                        !user && !readOnly && "hover:bg-neo-blue"
                    )}
                >
                    {user ? (
                        <Img
                            className="z-10 rounded-full"
                            type="imgProfile"
                            data={{ alt: "User avatar", height: 128, src: user.avatar ?? DefaultUserPicture }}
                        />
                    ) : (
                        <SquareCross
                            data-testid="add-user"
                            className={classNames(
                                "w-[30%] h-auto rotate-45",
                                isSelected ? "fill-white" : "fill-neo-link",
                                !user && !readOnly && "group-hover:fill-white"
                            )}
                        />
                    )}

                    <div
                        className={classNames(
                            "absolute top-0 z-20 rounded-full h-full w-full bg-neo-blue flex items-center justify-center opacity-0",
                            user && !readOnly && "hover:opacity-80"
                        )}
                    >
                        <IconEdit className="fill-white w-[30%] h-auto" />
                    </div>
                    <IconUserTile
                        className={classNames(
                            "z-30 absolute w-[42px] h-[42px] fill-white",
                            isSelected ? "-bottom-[29px]" : "-bottom-[25px]"
                        )}
                    />
                </div>
                {showName && (
                    <p className={classNames(textClassName ?? "mt-6 text-white")}>
                        {user ? `${user.firstname ?? ""} ${user.lastname ?? ""}` : t("global.add")}
                    </p>
                )}
            </div>
        );
    }

    return (
        <div
            className={classNames("relative flex flex-col items-center", !readOnly && "cursor-pointer")}
            onClick={() => !readOnly && onSelect(group)}
        >
            <div
                className={classNames(
                    "relative group rounded-md flex justify-center items-center",
                    tileClassName ?? "h-[128px] w-[128px] text-[24px]",
                    isSelected && "border-4 border-neo-blue",
                    group && readOnly ? "bg-neo-expanded" : "bg-neo-bg-B hover:bg-neo-blue"
                )}
            >
                <div
                    className={classNames(
                        "relative z-10 h-full w-full flex items-center justify-center font-bold text-white",
                        isSelected && "-m-1"
                    )}
                >
                    {group ? (
                        getGroupInitials(group.name)
                    ) : (
                        <SquareCross
                            data-testid="add-group"
                            className={classNames(
                                "w-[30%] h-auto rotate-45",
                                isSelected ? "fill-white" : "fill-neo-link",
                                !group && !readOnly && "group-hover:fill-white"
                            )}
                        />
                    )}
                </div>
                <div
                    className={classNames(
                        "absolute top-0 z-20 h-full w-full bg-neo-blue flex items-center justify-center opacity-0 rounded-md",
                        group && !readOnly && "hover:opacity-80"
                    )}
                >
                    <IconEdit className="fill-white w-[30%] h-auto" />
                </div>
                <IconGroup
                    className={classNames(
                        "z-30 absolute w-[42px] h-[42px] fill-white",
                        isSelected ? "-bottom-[29px]" : "-bottom-[25px]"
                    )}
                />
            </div>
            {showName && (
                <p className={classNames(textClassName ?? "mt-6 text-white")}>{group ? group.name : t("global.add")}</p>
            )}
        </div>
    );
};

export default UserTile;

function getGroupInitials(name: string) {
    return name
        .match(/\b(\w)/g)
        .splice(0, 2)
        .join("")
        .toUpperCase();
}
