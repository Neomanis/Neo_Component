import React, { ReactElement, useEffect, useState } from "react";
import { ReactComponent as CloseLogo } from "../../../img/svg/nm_ico_close.svg";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../atoms/icon";

interface Props {
    fInitialRender: () => void;
    date: string;
    content: string;
    read: boolean;
    notificationId: number;
    userUid: string;
    fReadNotification: (notificationId: number, userUid: string) => void;
    fDeleteNotification: (notificationId: number, userUid: string) => void;
}

const NotificationCard = ({
    fInitialRender,
    date,
    content,
    read,
    notificationId,
    userUid,
    fDeleteNotification,
    fReadNotification,
}: Props): ReactElement => {
    const [isFolded, setIsFolded] = useState<boolean>(true);

    useEffect(() => {
        fInitialRender();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                setIsFolded(!isFolded);
                fReadNotification(notificationId, userUid);
            }}
            className="cursor-pointer min-h-24 mb-7 bg-neo_blue bg-opacity-50 flex items-center justify-between py-3 pl-3 rounded-md z-10"
        >
            <div className="flex flex-col text-white w-8/12">
                <p className={`${isFolded ? "line-clamp-2" : ""} mb-3 text-sm`}>{content}</p>
                <div className="flex justify-start w-5/12">
                    <Icon
                        className={`text-xxs ${read ? "text-neo_black-black_05 opacity-30" : "text-neo_red"}`}
                        fontIcon={faCircle}
                    />
                    <p className="text-xs text-neo_black-black_05 whitespace-nowrap ml-3">{date}</p>
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
