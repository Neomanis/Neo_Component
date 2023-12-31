import React, { ReactElement } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon";
import Title from "../Title";

export interface LoaderProps {
    data?: string;
    type?: "circleOnly";
    className?: string;
}

const Loader = ({ data, type, className }: LoaderProps): ReactElement => {
    switch (type) {
        case "circleOnly":
            return (
                <div className={`animate-spin ${className}`} data-testid="loader-circle-body">
                    <Icon fontIcon={faSpinner} />
                </div>
            );
        default:
            return (
                <div
                    className="flex justify-center items-center bg-neo-red text-white rounded-lg px-4 py-1 shadow-lg"
                    data-testid="loader-default-body"
                >
                    <div className="mx-2">
                        <Title type="h1" data={data ? data : "loading ..."} />
                    </div>
                    <div className="animate-spin text-5xl my-1">
                        <Icon fontIcon={faSpinner} />
                    </div>
                </div>
            );
    }
};

export default Loader;
