import React, { ReactElement } from "react";
import { MembershipInfo, NeomanisUser } from "@neomanis/neo-types";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon";
import { IconAdd, IconGroup, IconUserTile } from "@/img/svg";
import { classNames } from "@/utils";
import { useTranslation } from "@neomanis/neo-translation";

export interface UserTileProps {
    type: "user" | "group";
    user?: NeomanisUser;
    group?: MembershipInfo;
    selectedId: number;
    tileSize?: number;
    showName?: boolean;
    onSelectCallback: (information: NeomanisUser | MembershipInfo) => void;
}

const UserTile = ({
    type,
    user,
    group,
    selectedId,
    tileSize = 64,
    showName = true,
    onSelectCallback,
}: UserTileProps): ReactElement => {
    const isSelected = user ? user.neoId === selectedId : group ? group.id === selectedId : false;
    const { t } = useTranslation();

    return type === "user" ? (
        <div className="relative flex flex-col items-center" onClick={() => onSelectCallback(user)}>
            <div
                className={classNames(
                    `relative rounded-full h-[128px] w-[128px] flex justify-center`,
                    isSelected && "border-4 border-neo-blue"
                )}
            >
                <img className="z-10 rounded-full" src={user ? user.avatar : IconAdd} alt="User avatar" />
                <div className="absolute top-0 z-20 rounded-full h-full w-full bg-neo-blue flex items-center justify-center opacity-0 hover:opacity-80 hover:cursor-pointer">
                    <Icon fontIcon={faEdit} className="text-white text-xl" />
                </div>
                <IconUserTile className="z-30 absolute -bottom-[20%] w-[30%] h-auto fill-white" />
            </div>
            {showName && (
                <p className="text-white mt-4">{user ? `${user.firstname} ${user.lastname}` : t("global.add")}</p>
            )}
        </div>
    ) : (
        <div className="relative flex flex-col items-center" onClick={() => onSelectCallback(group)}>
            <div
                className={classNames(
                    "relative rounded-md h-20 w-20 bg-neo-expanded",
                    isSelected && "border-4 border-neo-blue"
                )}
            >
                <div
                    className={classNames(
                        "relative z-10 rounded-md h-20 w-20 rounded-md flex items-center justify-center font-bold text-white",
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
                        <IconAdd className="fill-white w-[20%] h-auto" />
                    )}
                </div>
                <div className="absolute top-0 z-20 h-full w-full bg-neo-blue flex items-center justify-center opacity-0 hover:opacity-80">
                    {/* <IconEdit className="fill-white text-xl" /> */}
                </div>
                <IconGroup className="z-30 absolute -bottom-[25%] w-[35%] h-auto fill-white" />
            </div>
            {group && <p className="mt-4 text-white">{group.name}</p>}
        </div>
    );
};

export default UserTile;
