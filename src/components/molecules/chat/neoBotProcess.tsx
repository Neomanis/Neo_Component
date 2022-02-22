import { faCog } from "@fortawesome/free-solid-svg-icons";
import React, { ReactElement } from "react";
import { NeoLogo } from "../../../img/svg";
import { Icon } from "../../atoms";

interface Props {
    className?: string;
    message: string;
    showEllipsis?: boolean;
}

const NeoBotProcess = ({ className, message, showEllipsis = true }: Props): ReactElement => {
    return (
        <div className={`bg-neo-expanded w-full h-full flex text-white ${className}`} data-testid="process-body">
            <div className="m-auto px-5">
                <div className="flex relative w-24 mx-auto" data-testid="process-logo">
                    <NeoLogo viewBox="300 0 400 325" />
                    <div className="absolute -top-8 right-0" data-testid="process-cogs">
                        <Icon className="animate-spinBack text-2xl -mr-6" fontIcon={faCog} />
                        <Icon className="animate-spinSlow" fontIcon={faCog} />
                    </div>
                </div>
                <div
                    data-testid="process-message"
                    className={`flex ${
                        message.length > 28 ? "flex-col" : ""
                    } items-center font-semibold text-center pt-5`}
                >
                    {message}
                    {showEllipsis && (
                        <div className="flex px-1" data-testid="process-ellipsis">
                            <div className="animate-show">.</div>
                            <div className="animate-show" style={{ animationDelay: "300ms" }}>
                                .
                            </div>
                            <div className="animate-show" style={{ animationDelay: "600ms" }}>
                                .
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NeoBotProcess;
