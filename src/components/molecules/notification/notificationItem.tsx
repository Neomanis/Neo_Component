import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { Button, Icon, Title } from "../../atoms";
import { CloseLogo } from "../../../img/svg";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

interface Props {
    textColor: string;
    title: string;
    date: string;
    content: string;
    svg: ReactElement;
    fDeleteNotification?: (notificationId: number, userUid: string) => void;
    fManageWorkflow: (id: number, value: boolean, errorSetter: Dispatch<SetStateAction<boolean>>) => Promise<void>;
    fReadNotification?: (notificationId: number, userUid: string) => void;
    notificationId?: number;
    workflowErrorText?: string;
    workflowId?: number;
    read?: boolean;
    userUid: string;
}

const NotificationItem = ({
    textColor = "text-neo-light-grey",
    title,
    date,
    content,
    svg,
    fDeleteNotification,
    fManageWorkflow,
    fReadNotification,
    notificationId,
    workflowId,
    workflowErrorText,
    read,
    userUid,
}: Props): ReactElement => {
    const [isFolded, setIsFolded] = useState<boolean>(true);
    const [isError, setIsError] = useState(false);

    async function sendWorkFlow(value: boolean): Promise<void> {
        await fManageWorkflow(workflowId, value, setIsError);
    }
    return (
        <div
            onClick={(e) => {
                fReadNotification && e.stopPropagation();
                fReadNotification && fReadNotification(notificationId, userUid);
                setIsFolded(!isFolded);
            }}
        >
            <div className="flex w-full">
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
                <div className={`${textColor} pl-4 pr-2`}>
                    <p className="text-sm">{date}</p>
                    <Title type="h3" data={title} className=" text-base uppercase font-bold mb-1" />
                    <p className={`${isFolded && "line-clamp-2"} text-xs`}>{content}</p>
                </div>

                {fDeleteNotification && (
                    <div className="flex items-center mr-2">
                        <Icon
                            svg={<CloseLogo fill="#7DAAB7" />}
                            className="w-3 h-3"
                            fCallBack={(e) => {
                                e.stopPropagation();
                                setIsFolded(true);
                                fDeleteNotification(notificationId, userUid);
                            }}
                        />
                    </div>
                )}
            </div>
            {fManageWorkflow &&
                (!isError ? (
                    <div className="flex w-full justify-around mt-4 text-white text-xs">
                        <Button
                            className="bg-neo-link hover:bg-neo-blue-secondary rounded uppercase font-bold py-2 w-24"
                            data="validate"
                            fCallback={(e) => {
                                e.stopPropagation();
                                sendWorkFlow(true);
                            }}
                        />
                        <Button
                            className="bg-neo-link hover:bg-neo-blue-secondary rounded uppercase font-bold py-2 w-24"
                            data="refuse"
                            fCallback={(e) => {
                                e.stopPropagation();
                                sendWorkFlow(false);
                            }}
                        />
                    </div>
                ) : (
                    <p className={"text-neo-orange pt-1 text-sm font-bold text-center"}>
                        {workflowErrorText ? workflowErrorText : "Error !"}
                    </p>
                ))}
        </div>
    );
};

export default NotificationItem;
