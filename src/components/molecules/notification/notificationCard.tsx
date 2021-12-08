import React, { ReactElement, useState } from "react";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../atoms";
import { CloseLogo } from "../../../img/svg";

interface Props {
    content: string;
    date: string;
    fDeleteNotification: (notificationId: number, userUid: string) => void;
    fReadNotification: (notificationId: number, userUid: string) => void;
    notificationId: number;
    read: boolean;
    userUid: string;
}

const NotificationCard = ({
    content,
    date,
    fDeleteNotification,
    fReadNotification,
    notificationId,
    read,
    userUid,
}: Props): ReactElement => {
    const [isFolded, setIsFolded] = useState<boolean>(true);

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                setIsFolded(!isFolded);
                fReadNotification(notificationId, userUid);
            }}
            className="cursor-pointer min-h-24 mb-7 bg-neo-bg-B bg-opacity-50 flex items-center justify-between py-3 pl-3 rounded-md z-10"
        >
            <div className="flex flex-col text-white w-8/12">
                <p className={`${isFolded ? "line-clamp-2" : ""} mb-3 text-sm`}>{content}</p>
                <div className="flex justify-start w-5/12">
                    <Icon
                        className={`text-xxs ${read ? " text-neo-light-grey opacity-30" : "text-neo-red"}`}
                        fontIcon={faCircle}
                    />
                    <p className="text-xs text-neo-light-grey whitespace-nowrap ml-3">{date}</p>
                </div>
            </div>
            <div
                className="cursor-pointer flex w-8 h-8 z-20"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsFolded(true);
                    fDeleteNotification(notificationId, userUid);
                }}
            >
                <CloseLogo viewBox="10 10 30 30" fill="#778899" />
            </div>
        </div>
    );
};

export default NotificationCard;
