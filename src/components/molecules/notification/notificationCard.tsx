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
            className="cursor-pointer w-full bg-neo-bg-B bg-opacity-50 flex items-center justify-between p-3 rounded-md "
        >
            <div className="text-white w-11/12 pr-2">
                <p className={`${isFolded && "line-clamp-2"} mb-3 text-sm`}>{content}</p>
                <div className="flex justify-start">
                    <Icon
                        className={`text-xxs ${read ? " text-neo-light-grey opacity-30" : "text-neo-red"}`}
                        fontIcon={faCircle}
                    />
                    <p className="text-xs text-neo-link ml-3">{date}</p>
                </div>
            </div>
            <div className="w-1/12 flex justify-center">
                <Icon
                    svg={<CloseLogo fill="#7DAAB7" />}
                    className="cursor-pointer w-3 h-3 transform hover:scale-125"
                    fCallBack={(e) => {
                        e.stopPropagation();
                        setIsFolded(true);
                        fDeleteNotification(notificationId, userUid);
                    }}
                />
            </div>
        </div>
    );
};

export default NotificationCard;
