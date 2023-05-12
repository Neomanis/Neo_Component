import React, { ReactElement } from "react";
import { MembershipInfo, NeomanisUser } from "@neomanis/neo-types";
import { IconEdit, IconGroup, SquareCross, IconUserTile } from "@/img/svg";
import { classNames } from "@/utils";
import { useTranslation } from "@neomanis/neo-translation";
import { DefaultUserPicture } from "@/img/png";

export interface UserTileProps {
    type: "user" | "group";
    user?: NeomanisUser;
    group?: MembershipInfo;
    selectedId: number;
    showName?: boolean;
    tileClassName?: string;
    textClassName?: string;
    onSelectCallback: (information: NeomanisUser | MembershipInfo) => void;
}

const UserTile = ({
    type,
    user,
    group,
    selectedId,
    showName = true,
    tileClassName,
    textClassName,
    onSelectCallback,
}: UserTileProps): ReactElement => {
    const isSelected = user ? user.neoId === selectedId : group ? group.id === selectedId : false;
    const { t } = useTranslation();

    return type === "user" ? (
        <div className="relative group flex flex-col items-center" onClick={() => onSelectCallback(user)}>
            <div
                className={classNames(
                    tileClassName ?? "h-[128px] w-[128px]",
                    "relative rounded-full flex justify-center bg-neo-bg-B",
                    isSelected && "border-4 border-neo-blue",
                    !user && "hover:bg-neo-blue"
                )}
            >
                {user ? (
                    <img className="z-10 rounded-full" src={user.avatar ?? DefaultUserPicture} alt="User avatar" />
                ) : (
                    <SquareCross
                        className={classNames(
                            "w-[30%] h-auto rotate-45",
                            isSelected ? "fill-white" : "fill-neo-link",
                            !user && "group-hover:fill-white"
                        )}
                    />
                )}

                <div
                    className={classNames(
                        "absolute top-0 z-20 rounded-full h-full w-full bg-neo-blue flex items-center justify-center opacity-0 hover:cursor-pointer",
                        user && "hover:opacity-80"
                    )}
                >
                    <IconEdit className="fill-white w-[30%] h-auto" />
                </div>
                <IconUserTile className="z-30 absolute -bottom-[20%] w-[30%] h-auto fill-white" />
            </div>
            {showName && (
                <p className={classNames(textClassName ?? "mt-6 text-white")}>
                    {user ? `${user.firstname} ${user.lastname}` : t("global.add")}
                </p>
            )}
        </div>
    ) : (
        <div className="relative flex flex-col items-center" onClick={() => onSelectCallback(group)}>
            <div
                className={classNames(
                    tileClassName ?? "h-[128px] w-[128px] text-[24px]",
                    "relative group rounded-md flex justify-center items-center",
                    isSelected && "border-4 border-neo-blue",
                    group ? "bg-neo-expanded" : "bg-neo-bg-B hover:bg-neo-blue"
                )}
            >
                <div
                    className={classNames(
                        "relative z-10 h-full w-full flex items-center justify-center font-bold text-white",
                        isSelected && "-m-1"
                    )}
                >
                    {group ? (
                        group.name
                            .match(/\b(\w)/g)
                            .splice(0, 2)
                            .join("")
                            .toUpperCase()
                    ) : (
                        <SquareCross
                            className={classNames(
                                "w-[30%] h-auto rotate-45",
                                isSelected ? "fill-white" : "fill-neo-link",
                                !user && "group-hover:fill-white"
                            )}
                        />
                    )}
                </div>
                <div
                    className={classNames(
                        "absolute top-0 z-20 h-full w-full bg-neo-blue flex items-center justify-center opacity-0",
                        group && "hover:opacity-80"
                    )}
                >
                    <IconEdit className="fill-white w-[30%] h-auto" />
                </div>
                <IconGroup className="z-30 absolute -bottom-[22%] w-[35%] h-auto fill-white" />
            </div>
            {showName && (
                <p className={classNames(textClassName ?? "mt-6 text-white")}>{group ? group.name : t("global.add")}</p>
            )}
        </div>
    );
};

export default UserTile;
