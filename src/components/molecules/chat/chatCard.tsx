import React, { ReactElement } from "react";
import { Title, InputSimpleSelect, InputChoice } from "../../atoms";

interface Props {
    datas: { label: string; value: string }[];
    fCallBack: (data: { text: string; value: string }) => void;
    placeholder?: string;
    title: string;
    type: string;
}

const ChatCard = ({ datas, fCallBack, placeholder, title, type }: Props): ReactElement => {
    let option;
    switch (type) {
        case "dropdown":
            option = (
                <>
                    <Title className={"text-white"} type="h3" data={title} />
                    <InputSimpleSelect
                        className={"mt-2"}
                        data={datas}
                        onChangeCallBack={(data) =>
                            fCallBack({
                                value: data,
                                text: datas.find((option) => option.value === data)?.label,
                            })
                        }
                        optionClassName={""}
                        placeholder={placeholder}
                        selectClassName={"text-white border-2"}
                    />
                </>
            );
            break;
        case "single-choice":
            option = (
                <div className="px-4 py-1">
                    <Title className={"text-white"} type="h3" data={title} />
                    <InputChoice
                        className={"my-1"}
                        data={datas}
                        fCallBack={(data) =>
                            fCallBack({
                                value: data,
                                text: datas.find((choice) => choice.value === data)?.label,
                            })
                        }
                    />
                </div>
            );
            break;

        default:
            option = null;
            break;
    }

    return (
        <div className={`rounded-sm bg-neo-bg-B p-2 border-b-2 border-neo-expanded overflow-hidden`}>
            <div>{option}</div>
        </div>
    );
};
export default ChatCard;
