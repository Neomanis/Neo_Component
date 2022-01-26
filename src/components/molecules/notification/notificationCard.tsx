import React, { ReactElement, useState } from "react";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../atoms";
import { CloseLogo, IconInfo } from "../../../img/svg";

interface Props {
    color: string;
    content: string;
    date: string;
    fDeleteNotification: (notificationId: number, userUid: string) => void;
    fReadNotification: (notificationId: number, userUid: string) => void;
    notificationId: number;
    read: boolean;
    svgColor: string;
    title: string;
    userUid: string;
}

const NotificationCard = ({
    color = "text-neo-light-grey",
    content,
    date,
    fDeleteNotification,
    fReadNotification,
    notificationId,
    read,
    svgColor = "#DAE5E5",
    title,
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
            className="cursor-pointer flex items-center justify-between rounded-md w-64 relative"
        >
            <div className="flex">
                <div className="flex justify-start relative">
                    <Icon
                        className={`text-xxs absolute top-0 -right-1 ${read ? "opacity-0" : "text-neo-red"}`}
                        fontIcon={faCircle}
                    />
                    <Icon className="w-8" svg={<IconInfo fill={svgColor} />} />
                </div>
                <div className={`pl-4 ${color}`}>
                    <p className="text-xxs ">{date}</p>
                    <p className={`${isFolded && "line-clamp-1"} mb-1 text-xs uppercase font-extrabold`}>{title}</p>
                    <p className={`${isFolded && "line-clamp-1"} text-xxs `}>{content}</p>
                </div>
            </div>

            <Icon
                svg={<CloseLogo fill="#7DAAB7" />}
                className="cursor-pointer w-2 h-2 transform hover:scale-125 absolute right-0 top-5"
                fCallBack={(e) => {
                    e.stopPropagation();
                    setIsFolded(true);
                    fDeleteNotification(notificationId, userUid);
                }}
            />
        </div>
    );
};

export default NotificationCard;
