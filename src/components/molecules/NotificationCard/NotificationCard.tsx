import React, { ReactElement, useState } from "react";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { IconInfo, CloseLogo } from "@/img/svg";
import { Icon } from "@/components/atoms";
import { findAndSplitContentWith, classNames } from "@/utils";

export interface NotificationCardProps {
    className?: string;
    color?: string;
    content: string;
    date: string;
    fDeleteNotification: (notificationId: number, neoId: number) => void;
    fReadNotification: (notificationId: number, neoId: number) => void;
    notificationId: number;
    read: boolean;
    svgColor?: string;
    title?: string;
    neoId: number;
    objectId: string;
    objectType: string;
    navigateTo?: () => void;
}

const NotificationCard = ({
    className,
    color = "text-neo-light-grey",
    content,
    date,
    fDeleteNotification,
    fReadNotification,
    notificationId,
    read,
    svgColor = "#DAE5E5",
    title,
    neoId,
    objectId,
    objectType,
    navigateTo,
}: NotificationCardProps): ReactElement => {
    const [isFolded, setIsFolded] = useState<boolean>(true);

    return (
        <div
            id={`notification-${objectId}-card`}
            onClick={(e) => {
                e.stopPropagation();
                setIsFolded(!isFolded);
                fReadNotification(notificationId, neoId);
            }}
            className={`cursor-pointer flex items-center justify-between rounded-md relative ${className}`}
            data-testid="notifCard-read"
            data-objectid={objectId}
        >
            <div className="flex">
                <div className="flex justify-start relative">
                    <Icon
                        id={`notification-${objectId}-dot`}
                        data-read={read}
                        className={`text-xxs absolute top-0 -right-1 ${read ? "opacity-0" : "text-neo-red"}`}
                        fontIcon={faCircle}
                        testId="notifCard-dot"
                    />
                    <Icon className="w-8" testId="notifCard-svg" svg={<IconInfo fill={svgColor} />} />
                </div>
                <div className={`pl-4 ${color}`} data-testid="notifCard-color-text">
                    <p className="text-xxs" data-testid="notifCard-date">
                        {date}
                    </p>
                    <p
                        className={`${isFolded && "line-clamp-1"} mb-1 text-xs uppercase font-extrabold`}
                        data-testid="notifCard-title"
                    >
                        {title}
                    </p>
                    {findAndSplitContentWith(content, objectId, objectType).objectDisplay === null ? (
                        <p
                            className={classNames("text-xxs", isFolded && "line-clamp-2")}
                            data-testid="notifCard-content-classic"
                        >
                            {content}
                        </p>
                    ) : (
                        <p className={classNames("text-xxs", isFolded && "line-clamp-2")}>
                            {findAndSplitContentWith(content, objectId, objectType).startContent}
                            <span
                                className="text-neo-blue hover:text-neo-pink"
                                onClick={navigateTo}
                                data-testid="notifCard-content-clickable"
                            >
                                {findAndSplitContentWith(content, objectId, objectType).objectDisplay}
                            </span>
                            {findAndSplitContentWith(content, objectId, objectType).endContent}
                        </p>
                    )}
                </div>
            </div>

            <Icon
                id={`notification-${objectId}-close`}
                svg={<CloseLogo fill="#7DAAB7" />}
                className="cursor-pointer w-2 h-2 transform hover:scale-125 absolute right-2 top-5"
                fCallBack={(e) => {
                    e.stopPropagation();
                    setIsFolded(true);
                    fDeleteNotification(notificationId, neoId);
                }}
            />
        </div>
    );
};

export default NotificationCard;
