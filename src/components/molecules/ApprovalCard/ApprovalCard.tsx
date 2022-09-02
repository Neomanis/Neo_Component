import { Button } from "@/components/atoms";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";

export interface ApprovalCardProps {
    content: string;
    date: string;
    fManageApproval: (
        id: number,
        value: boolean,
        ticketId: number,
        errorSetter: Dispatch<SetStateAction<boolean>>
    ) => Promise<void>;
    sender: string;
    approvalErrorText: string;
    approvalId: number;
    ticketId: number;
    approvalRequestText: string;
}

const ApprovalCard = ({
    content,
    date,
    fManageApproval,
    sender,
    approvalId,
    ticketId,
    approvalErrorText,
    approvalRequestText,
}: ApprovalCardProps): ReactElement => {
    const [isFolded, setIsFolded] = useState<boolean>(true);
    const [isError, setIsError] = useState(false);

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                setIsFolded(!isFolded);
            }}
            className="cursor-pointer min-h-24 mb-7 w-full bg-neo-bg-B bg-opacity-50 flex items-center justify-between py-3 pl-3 rounded-md z-10"
        >
            <div className="flex flex-col text-white w-full">
                <p className={`${isFolded ? "line-clamp-2" : ""} mb-3 text-sm`}>
                    <span className="font-medium" style={{ fontSize: "1.02rem" }}>
                        {sender}
                    </span>
                    {approvalRequestText}
                    <span style={{ fontSize: "1.02rem" }}> {content}</span>
                </p>
                <div className="flex justify-between w-full">
                    <p className="text-xs text-neo-link whitespace-nowrap mt-2">{date}</p>
                    <div className="flex ml-auto mr-2">
                        <Button
                            className={
                                "flex items-center justify-center border p-1 w-8 h-8 border-neo-green hover:bg-neo-green text-neo-green hover:text-neo-bg-B transition duration-200"
                            }
                            variant="none"
                            size="none"
                            rounded="full"
                            onClick={async (): Promise<void> =>
                                await fManageApproval(approvalId, true, ticketId, setIsError)
                            }
                            startIcon={<FontAwesomeIcon icon={faCheck} />}
                        />
                        <Button
                            className={
                                "flex items-center justify-center border p-1 ml-2 w-8 h-8 border-neo-orange hover:bg-neo-orange text-neo-orange hover:text-neo-bg-B transition duration-200"
                            }
                            onClick={async (): Promise<void> =>
                                await fManageApproval(approvalId, false, ticketId, setIsError)
                            }
                            variant="none"
                            size="none"
                            rounded="full"
                            startIcon={<FontAwesomeIcon icon={faTimes} />}
                        />
                    </div>
                </div>
                {isError && (
                    <div>
                        <p className={"text-neo-orange"}>{approvalErrorText} </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApprovalCard;
