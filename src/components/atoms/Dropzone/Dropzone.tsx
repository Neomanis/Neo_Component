import React, { ReactElement } from "react";
import { classNames } from "@/utils";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "@neomanis/neo-translation";
import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import Icon from "../Icon";

export interface Props {
    getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
    getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
    isDragActive: boolean;
}

const Dropzone = ({ getRootProps, getInputProps, isDragActive }: Props): ReactElement => {
    const { t } = useTranslation();
    return (
        <div
            {...getRootProps({
                className: classNames(
                    isDragActive && "border-neo-blue",
                    "dropzone transition-all rounded group cursor-pointer group border border-dashed border-2 border-neo-link hover:border-neo-blue w-full"
                ),
            })}
        >
            <input {...getInputProps()} />
            <div
                className={classNames(isDragActive && "scale-105", "text-center group-hover:scale-105 transition-all")}
            >
                <Icon
                    fontIcon={faUpload}
                    className={classNames(
                        isDragActive && "text-neo-blue",
                        "text-4xl text-neo-link group-hover:text-neo-blue transition-all my-2"
                    )}
                />
                <p
                    className={classNames(
                        isDragActive && "text-neo-blue",
                        "text-neo-link font-bold group-hover:text-neo-blue transition-all mb-2"
                    )}
                >
                    {t("global.dropzoneText")}
                </p>
            </div>
        </div>
    );
};

export default Dropzone;
