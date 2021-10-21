import React, { ReactElement, useState, Dispatch, SetStateAction } from "react";
import Button from "../../atoms/button";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

interface Props {
    content: string;
    date: string;
    fManageWorkflow: (id: number, value: boolean, errorSetter: Dispatch<SetStateAction<boolean>>) => Promise<void>;
    sender: string;
    workflowErrorText: string;
    workflowId: number;
    workflowRequestText: string;
}

const WorkflowCard = ({
    content,
    date,
    fManageWorkflow,
    sender,
    workflowId,
    workflowErrorText,
    workflowRequestText,
}: Props): ReactElement => {
    const [isFolded, setIsFolded] = useState<boolean>(true);
    const [isError, setIsError] = useState(false);

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                setIsFolded(!isFolded);
            }}
            className="cursor-pointer min-h-24 mb-7 w-full bg-neo_blue bg-opacity-50 flex items-center justify-between py-3 pl-3 rounded-md z-10"
        >
            <div className="flex flex-col text-white w-full">
                <p className={`${isFolded ? "line-clamp-2" : ""} mb-3 text-sm`}>
                    <span className="font-medium" style={{ fontSize: "1.02rem" }}>
                        {sender}{" "}
                    </span>
                    {workflowRequestText}
                    <span style={{ fontSize: "1.02rem" }}> {content}</span>
                </p>
                <div className="flex justify-between w-full">
                    <p className="text-xs text-neo_black-black_05 whitespace-nowrap mt-2">{date}</p>
                    <div className="flex ml-auto mr-2">
                        <Button
                            className={
                                "flex border rounded-full p-1 w-8 h-8  border-neo_green-base hover:bg-neo_green-base text-neo_green-base hover:text-neo_blue transition duration-200 items-center justify-center"
                            }
                            fCallback={async (): Promise<void> => await fManageWorkflow(workflowId, true, setIsError)}
                            fontIcon={faCheck}
                        />
                        <Button
                            className={
                                "flex border rounded-full p-1 ml-2 w-8 h-8 border-neo_orange hover:bg-neo_orange text-neo_orange hover:text-neo_blue transition duration-200 items-center justify-center"
                            }
                            fCallback={async (): Promise<void> => await fManageWorkflow(workflowId, false, setIsError)}
                            fontIcon={faTimes}
                        />
                    </div>
                </div>
                {isError && (
                    <div>
                        <p className={"text-neo_orange"}>{workflowErrorText} </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkflowCard;
