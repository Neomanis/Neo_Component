import React, { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/atoms";
import { faPaperclip, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Dropzone from "@/components/atoms/Dropzone";
import { useDropzone } from "react-dropzone";
import FileEditCard from "../FileEditCard";
import { classNames } from "@/utils";
import ShadowBoxWrapper from "../ShadowBoxWrapper";
import { useTranslation } from "@neomanis/neo-translation";

interface Props {
    sendFilesArray: (data: { title: string; file: File }[]) => void;
}

const InputAttachments = ({ sendFilesArray }: Props): ReactElement => {
    const { t } = useTranslation();
    const [files, setFiles] = useState<{ title: string; file: File }[]>([]);
    const [isEmptyArray, setIsEmptyArray] = useState<{ key: number; isEmpty: boolean }[]>([]);

    const oneFieldIsEmpty = useMemo(() => isEmptyArray.find((item) => item.isEmpty === true), [isEmptyArray]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((oldState) => [
            ...oldState,
            ...acceptedFiles.map((file) => {
                const extention = file.name.split(".").at(-1) ?? file.name;
                return { title: file.name.replace("." + extention, ""), file: file };
            }),
        ]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDrop,
        maxSize: 10485760,
    });
    const filesSelect = useMemo(() => Boolean(files.length > 0), [files]);

    function deleteFile(file: { title: string; file: File }) {
        files.splice(
            files.findIndex((item) => item.file.name === file.file.name),
            1
        );
        setFiles([...files]);
    }

    function renameTitleOfFile(title: string, key: number) {
        Reflect.set(files[key], "title", title);
        setFiles([...files]);
    }
    function setIsEmptyTab(key: number, isEmpty: boolean) {
        Reflect.set(isEmptyArray[key], "isEmpty", isEmpty);
        setIsEmptyArray([...isEmptyArray]);
    }

    useEffect(() => {
        setIsEmptyArray(
            files.map((item, key) => {
                return { key: key, isEmpty: item.title === "" };
            })
        );
    }, [files]);

    return (
        <div className="bg-neo-bg-B rounded px-4 py-3 h-full">
            <div className="flex items-center justify-between h-21">
                <button
                    className={classNames(
                        "text-center bg-neo-bg-A p-4 rounded-xl w-[15%]",
                        filesSelect ? "cursor-pointer" : "cursor-default",
                        !oneFieldIsEmpty ? "group" : "text-neo-red"
                    )}
                    onClick={() => {
                        if (filesSelect && !oneFieldIsEmpty) {
                            sendFilesArray(files);
                            setFiles([]);
                        }
                    }}
                >
                    {!filesSelect ? (
                        <>
                            <Icon fontIcon={faPaperclip} className="text-2xl text-neo-link my-2" />
                            <div className="text-center font-extrabold text-neo-blue-secondary text-xs">
                                <p>10 MB</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="group-hover:animate-swing">
                                <Icon
                                    fontIcon={faPaperPlane}
                                    className={classNames(
                                        "text-2xl my-2 transition-all",
                                        !oneFieldIsEmpty &&
                                            "text-neo-link group-hover:text-neo-green group-hover:scale-105"
                                    )}
                                />
                            </div>
                            <p
                                className={classNames(
                                    "font-bold transition-all text-xs",
                                    !oneFieldIsEmpty && "text-neo-link group-hover:text-neo-green"
                                )}
                            >
                                {t("global.validate")}
                            </p>
                        </>
                    )}
                </button>
                <div className="w-[85%] h-full pl-4">
                    <Dropzone getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} />
                </div>
            </div>
            <aside className="h-[81%] mt-2">
                <ShadowBoxWrapper
                    linearGradient={{
                        first: "rgba(14, 56, 100,1)",
                        second: "rgba(14, 56, 100,0.5)",
                    }}
                >
                    {files.map((file, key) => (
                        <div className="my-4" key={`${file.file.name}-${key}`}>
                            <FileEditCard
                                data={file}
                                deleteFile={() => deleteFile(file)}
                                onChangeInput={(data) => renameTitleOfFile(data, key)}
                                isEmptyCallBack={(isEmpty) => setIsEmptyTab(key, isEmpty)}
                            />
                        </div>
                    ))}
                </ShadowBoxWrapper>
            </aside>
        </div>
    );
};

export default InputAttachments;
