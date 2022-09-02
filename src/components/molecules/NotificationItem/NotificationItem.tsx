import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "@neomanis/neo-translation";
import { CloseLogo } from "@/img/svg";
import { Icon, Title, Button } from "@/components/atoms";

export interface NotificationItemProps {
    content: string;
    date?: string;
    fDeleteNotification?: (notificationId: number, userNeoId: number) => void;
    fManageApproval?: (
        id: number,
        value: boolean,
        ticketUid: string,
        errorSetter: Dispatch<SetStateAction<boolean>>
    ) => Promise<void>;
    fReadNotification?: (notificationId: number, userNeoId: number) => void;
    notificationId?: number;
    outageDate?: { startAt: string; endAt?: string };
    read?: boolean;
    sender?: string;
    svg: ReactElement;
    textColor?: string;
    ticketUid?: string;
    title?: string;
    userNeoId?: number;
    approvalId?: number;
}

const NotificationItem = ({
    content,
    date,
    fDeleteNotification,
    fManageApproval,
    fReadNotification,
    notificationId,
    outageDate,
    read,
    sender,
    svg,
    textColor = "text-neo-light-grey",
    ticketUid,
    title,
    userNeoId,
    approvalId,
}: NotificationItemProps): ReactElement => {
    const { t } = useTranslation();

    const [isFolded, setIsFolded] = useState<boolean>(true);
    const [isError, setIsError] = useState(false);

    async function sendApproval(value: boolean): Promise<void> {
        fManageApproval && (await fManageApproval(approvalId, value, ticketUid, setIsError));
    }
    return (
        <div
            onClick={(e) => {
                fReadNotification && e.stopPropagation();
                fReadNotification && fReadNotification(notificationId, userNeoId);
                setIsFolded(!isFolded);
            }}
        >
            <div className="flex justify-between w-full cursor-pointer">
                <div className="flex">
                    <div className="mt-1 relative">
                        {fReadNotification && (
                            <Icon
                                className={`text-xxs absolute top-0 right-0
                    ${read ? " text-neo-light-grey opacity-30" : "text-neo-red"}`}
                                fontIcon={faCircle}
                            />
                        )}
                        {svg}
                    </div>
                    <div className={`${textColor} pl-4`}>
                        {(sender || date) && (
                            <div className="text-xs flex">
                                {sender && <p className="mr-2 font-bold">{sender}</p>}
                                {date && <p>{date}</p>}
                            </div>
                        )}
                        {title && <Title type="h3" data={title} className=" text-base uppercase font-bold" />}
                        {outageDate && outageDate.startAt && (
                            <p className="text-xxs font-bold">
                                {outageDate.startAt} {outageDate.endAt && "- " + outageDate.endAt}
                            </p>
                        )}
                        <p className={`${isFolded && "line-clamp-2"} text-xxs mt-1`}>{content}</p>
                    </div>
                </div>
                {fDeleteNotification && (
                    <div className="flex items-center mr-1 cursor-pointer">
                        <Icon
                            svg={<CloseLogo fill="#7DAAB7" />}
                            className="w-3 h-3"
                            fCallBack={(e) => {
                                e.stopPropagation();
                                setIsFolded(true);
                                userNeoId && fDeleteNotification(notificationId, userNeoId);
                            }}
                        />
                    </div>
                )}
            </div>
            {fManageApproval &&
                (!isError ? (
                    <div className="flex w-full justify-around mt-4 text-white text-xs">
                        <Button
                            className="bg-neo-link hover:bg-neo-green rounded uppercase font-bold py-2 w-24"
                            onClick={(e) => {
                                e.stopPropagation();
                                sendApproval(true);
                            }}
                            variant="none"
                            size="none"
                            rounded="none"
                        >
                            {t("global.validate")}
                        </Button>
                        <Button
                            className="bg-neo-link hover:bg-neo-red rounded uppercase font-bold py-2 w-24"
                            onClick={(e) => {
                                e.stopPropagation();
                                sendApproval(false);
                            }}
                            variant="none"
                            size="none"
                            rounded="none"
                        >
                            {t("global.refuse")}
                        </Button>
                    </div>
                ) : (
                    <p className={"text-neo-orange pt-1 text-sm font-bold text-center"}>{t("error.approval")}</p>
                ))}
        </div>
    );
};

export default NotificationItem;
