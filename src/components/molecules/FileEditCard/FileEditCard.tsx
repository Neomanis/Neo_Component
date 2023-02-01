import React, { ReactElement, useEffect, useState } from "react";
import { faClose, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Icon, Input } from "@/components/atoms";
import { classNames, transformBytes } from "@/utils";
import { useTranslation } from "@neomanis/neo-translation";

interface Props {
    data: { title: string; file: File };
    deleteFile: () => void;
    onChangeInput: (title: string) => void;
    isEmptyCallBack: (isEmpty: boolean) => void;
}

const FileEditCard = ({ data, deleteFile, onChangeInput, isEmptyCallBack }: Props): ReactElement => {
    const { t } = useTranslation();
    const [isEmpty, setIsEmpty] = useState(false);
    const [inputValue, setInputValue] = useState<string>(data.title);

    useEffect(() => onChangeInput(inputValue), [inputValue, data]);

    return (
        <li
            key={data.file.name}
            className={classNames(
                "w-full flex items-center justify-between bg-neo-bg-A rounded",
                isEmpty && "border-neo-red border"
            )}
        >
            <div className="w-[90%] px-4 py-2">
                <div className="flex items-center font-bold mb-2">
                    <p className="text-neo-blue text-sm mr-4 line-clamp-1">{data.file.name}</p>
                    <p className=" text-neo-blue-secondary font-bold">{transformBytes(data.file.size)}</p>
                </div>
                <div className="flex items-end justify-between items-center w-full text-neo-link group">
                    <Icon
                        fontIcon={faPenToSquare}
                        className="text-neo-link group-hover:text-neo-blue transition-all mt-1 mr-4"
                    />
                    <Input
                        refForm="name"
                        typeInput="text"
                        inputClassName="outline-none text-white text-xl font-bold bg-neo-bg-A pr-4"
                        showLabelAndUpdater={false}
                        placeholder={t("global.title")}
                        defaultValue={inputValue}
                        onChange={(e) => {
                            if (e.currentTarget.value === "") {
                                setIsEmpty(true);
                                isEmptyCallBack(true);
                            } else {
                                setIsEmpty(false);
                                isEmptyCallBack(false);
                            }
                            setInputValue(e.currentTarget.value);
                        }}
                    />
                </div>
            </div>
            <Icon
                onClick={() => deleteFile()}
                fontIcon={faClose}
                className="w-[10%] text-4xl text-neo-link hover:text-neo-red hover:scale-105 transition-all cursor-pointer"
            />
        </li>
    );
};

export default FileEditCard;
