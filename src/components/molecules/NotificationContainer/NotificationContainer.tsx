import React, { Children, ReactElement, ReactNode, useState } from "react";
import { useTranslation } from "@neomanis/neo-translation";
import { Title, Button } from "@/components/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { classNames } from "@/utils";

export interface NotificationContainerProps {
    children: ReactNode;
    clearNotifications?: () => void;
    title: string;
    itemsToShow?: number | "infinite";
    notificationType?: "approval" | "notification" | "outage";
}

const NotificationContainer = ({
    children,
    clearNotifications,
    title,
    itemsToShow = 2,
    notificationType = "notification",
}: NotificationContainerProps): ReactElement => {
    const { t } = useTranslation();
    const childrens = Children.toArray(children);
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between w-full py-1 px-6 mb-1">
                <div className="flex items-center space-x-1 text-lg font-bold whitespace-nowrap">
                    {childrens.length && <p className="text-white">{childrens.length}</p>}
                    <Title data={title} type="h2" className="text-neo-blue-secondary" />
                </div>
                {clearNotifications && (
                    <div className="">
                        <Button
                            onClick={(): void => clearNotifications()}
                            className="uppercase whitespace-nowrap text-xxs py-1"
                            variant="secondary"
                            size="none"
                            rounded="md"
                        >
                            {t("global.clearAll")}
                        </Button>
                    </div>
                )}
            </div>
            <ul>
                {childrens
                    .slice(0, expanded || itemsToShow === "infinite" ? childrens.length : itemsToShow)
                    .map((item, key, arr) => (
                        <li key={key} className="relative">
                            <div
                                className={classNames(
                                    "py-2.5 px-6 group relative peer",
                                    notificationType === "notification" && "hover:bg-neo-blue-secondary",
                                    notificationType === "approval" && "hover:bg-neo-yellow-sand",
                                    notificationType === "outage" && "hover:bg-neo-bg-B"
                                )}
                            >
                                {item}
                            </div>
                            {arr.length > 1 && key < arr.length - 1 && (
                                <div
                                    className={classNames(
                                        "absolute left-1/2 transform -translate-x-1/2",
                                        "border-b-[1px] border-neo-bg-B w-5/6 peer-hover:hidden"
                                    )}
                                />
                            )}
                        </li>
                    ))}
            </ul>
            {!expanded && childrens.length > itemsToShow && (
                <Button
                    startIcon={<FontAwesomeIcon icon={faEllipsis} />}
                    variant="none"
                    className="text-neo-link text-3xl self-center"
                    onClick={(): void => setExpanded(true)}
                />
            )}
        </div>
    );
};

export default NotificationContainer;
