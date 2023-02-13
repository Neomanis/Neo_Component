import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { useTranslation } from "@neomanis/neo-translation";
import { CautionLogoFull, CloseLogo } from "@/img/svg";
import { Button, Loader } from "@/components/atoms";
import { classNames, getFormatedTimeToNowExtended, getDisplayedTicketUid, findAndSplitContentWith } from "@/utils";
import { Approval, Outage, Notification } from "@neomanis/neo-types";
import { getOutageDateInformation } from "@/utils/dateTools";

export type NotificationItemProps = {
    onDelete?: (notificationId: number, userNeoId: number) => void;
    fManageApproval?: (
        id: number,
        value: boolean,
        ticketUid: string,
        errorSetter: Dispatch<SetStateAction<boolean>>
    ) => Promise<void>;
    userNeoId?: number;
    notification: Notification | Approval | Outage;
    navigateTo?: () => void;
} & NotificationType;

type NotificationType =
    | {
          notificationType: "approval";
          notification: Approval;
          approvalCallHandler: {
              answerApproval: (accepted: boolean, approvalId: number) => void;
              isLoading: boolean;
              isError: boolean;
          };
      }
    | { notificationType: "notification"; notification: Notification; approvalCallHandler?: never }
    | { notificationType: "outage"; notification: Outage; approvalCallHandler?: never };

const NotificationItem = ({
    onDelete,
    notification,
    notificationType,
    approvalCallHandler,
    userNeoId,
    navigateTo,
}: NotificationItemProps): ReactElement => {
    const { t, i18n } = useTranslation();

    const [isFolded, setIsFolded] = useState<boolean>(true);

    if (notificationType === "approval") {
        return (
            <div
                className="text-neo-yellow-sand group-hover:text-neo-bg-B relative"
                data-testid="notifItem-approvalType"
            >
                <div className="text-xxs uppercase mb-2 font-semibold">
                    {getFormatedTimeToNowExtended(notification.createdAt, i18n.language)}
                </div>
                <p className="text-xxs">{notification.content}</p>
                {approvalCallHandler.isLoading && <Loader type="circleOnly" className="absolute top-0 right-0" />}
                {approvalCallHandler.isError && (
                    <CautionLogoFull className="absolute top-0 right-0 w-6 fill-neo-yellow-sand group-hover:fill-neo-bg-B" />
                )}
                <div className="w-full mt-3 text-white text-xs hidden group-hover:flex flex-col space-y-2">
                    {approvalCallHandler.isError && (
                        <div className="text-neo-orange text-sm font-bold">{t("error.approval")}</div>
                    )}
                    <div className="flex space-x-4">
                        <Button
                            className="bg-neo-bg-B rounded uppercase font-bold p-1 text-xxs leading-[15px]"
                            onClick={(e) => {
                                e.stopPropagation();
                                approvalCallHandler.answerApproval(true, notification.id);
                            }}
                            variant="none"
                            size="none"
                            rounded="none"
                            disabled={approvalCallHandler.isLoading}
                            data-testid="notifItem-approvalType-accept"
                        >
                            {t("global.validate")}
                        </Button>
                        <Button
                            className="border-2 border-neo-bg-B text-neo-bg-B rounded uppercase font-bold p-1 text-xxs leading-[15px]"
                            onClick={(e) => {
                                e.stopPropagation();
                                approvalCallHandler.answerApproval(false, notification.id);
                            }}
                            variant="none"
                            size="none"
                            rounded="none"
                            disabled={approvalCallHandler.isLoading}
                            data-testid="notifItem-approvalType-decline"
                        >
                            {t("global.refuse")}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (notificationType === "outage") {
        return (
            <div
                className={classNames(
                    "cursor-pointer",
                    notification.severity === "major" ? "text-neo-urgency-major" : "text-neo-orange"
                )}
                data-testid="notifItem-outageType"
                onClick={() => setIsFolded(!isFolded)}
            >
                <div className="font-bold text-xs uppercase" data-testid="notifItem-outageType-title">
                    {notification.title}
                </div>
                <div className="text-xxs uppercase mb-2 font-semibold">
                    {getOutageDateInformation(
                        { startAt: notification.startAt, endAt: notification.endAt },
                        i18n.language
                    )}
                </div>
                <div
                    className={classNames("text-xxs", isFolded && "line-clamp-2")}
                    dangerouslySetInnerHTML={{ __html: notification.content }}
                />
            </div>
        );
    }
    return (
        <div
            className="text-white cursor-pointer relative"
            onClick={() => setIsFolded(!isFolded)}
            data-testid="notifItem-notifType"
        >
            <div className="font-bold text-xs uppercase">
                {notification.notification.type === "message" ? t("global.message_one") : t("ticket.title_one")}
            </div>
            <div className="text-xxs uppercase mb-2 font-semibold">
                {getFormatedTimeToNowExtended(notification.notification.createdAt, i18n.language)}
            </div>
            {findAndSplitContentWith(notification.notification.content, notification.notification.objectId)
                .ticketUid === null ? (
                <p
                    className={classNames("text-xxs", isFolded && "line-clamp-2")}
                    data-testid="notifItem-content-no-ticketUid"
                >
                    {notification.notification.content}
                </p>
            ) : (
                <p className={classNames("text-xxs", isFolded && "line-clamp-2")} data-testid="notifItem-content">
                    {
                        findAndSplitContentWith(notification.notification.content, notification.notification.objectId)
                            .startContent
                    }
                    <span
                        className="text-neo-blue hover:text-neo-pink"
                        onClick={navigateTo}
                        data-testid="notifItem-span"
                    >
                        {getDisplayedTicketUid(
                            findAndSplitContentWith(
                                notification.notification.content,
                                notification.notification.objectId
                            ).ticketUid
                        )}
                    </span>
                    {
                        findAndSplitContentWith(notification.notification.content, notification.notification.objectId)
                            .endContent
                    }
                </p>
            )}
            <Button
                startIcon={<CloseLogo className="w-[10px] fill-neo-link hidden group-hover:block" />}
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(notification.notification.id, userNeoId);
                }}
                variant="none"
                size="none"
                rounded="none"
                className="absolute -right-3 top-1/2 transform -translate-y-1/2"
                data-testid="notifItem-notif-button"
            />
        </div>
    );
};

export default NotificationItem;
