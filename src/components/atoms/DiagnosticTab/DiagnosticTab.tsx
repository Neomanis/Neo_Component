import React, { MutableRefObject, ReactElement } from "react";
import { classNames } from "@/utils/tools";
import { getColorFromDiagnosticResult } from "@/utils/diagnosticResultTools";
import { DiagnosticResult } from "@neomanis/neo-types";

export interface DiagnosticTabProps {
    name: string;
    runId: string;
    diagResult: DiagnosticResult;
    isSelected: boolean;
    onClick: (runId: string) => void;
    diagnosticListRefs?: MutableRefObject<HTMLDivElement[]>;
}

const DiagnosticTab = ({
    name,
    diagResult,
    isSelected,
    runId,
    onClick,
    diagnosticListRefs,
}: DiagnosticTabProps): ReactElement => {
    return (
        <div
            className={classNames(
                "relative rounded-full py-2 px-4 flex flex-row items-center cursor-pointer",
                isSelected ? "bg-neo-blue" : "bg-neo-link"
            )}
            onClick={() => onClick(runId)}
            ref={(ref) => diagnosticListRefs && Reflect.set(diagnosticListRefs.current, runId, ref)}
        >
            <div
                data-testid="diagnostic-tab-pill"
                className={classNames(
                    "h-[10px] p-[5px] rounded-full mr-2",
                    getColorFromDiagnosticResult(diagResult, "bg")
                )}
            ></div>
            <p className="text-white text-xs font-bold">{name}</p>
        </div>
    );
};

export default DiagnosticTab;
