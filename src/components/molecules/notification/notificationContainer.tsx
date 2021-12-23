import i18next from "i18next";
import React, { ReactElement, ReactNode, useState } from "react";
import { Button, Title } from "../../atoms";

type Props = {
    children: ReactNode;
    childrenlength?: number;
    clearAllNotifications?: boolean;
    fCallBackClear?: () => void;
    languageUser?: string;
    title: string;
};

const NotificationContainer = ({
    children,
    childrenlength,
    clearAllNotifications,
    fCallBackClear,
    languageUser = "en_US",
    title,
}: Props): ReactElement => {
    const myLanguage = i18next.getFixedT(languageUser);
    const [fullView, setFullView] = useState(false);
    return (
        <div>
            <div className="flex items-center justify-between w-full text-sm uppercase border-b-2 py-1 border-neo-bg-B mb-3">
                <div className="flex items-center text-neo-light-grey">
                    <Title data={title} type="h2" className="mr-2" />
                    {childrenlength && <p>({childrenlength})</p>}
                </div>
                <Button
                    data={"See all"}
                    fCallback={(): void => setFullView(!fullView)}
                    className="flex hover:text-neo-light-grey transition-colors text-neo-link text-sm"
                    iconClassName="ml-2"
                />
            </div>
            <div className={`${!fullView && "h-32 overflow-scroll no-scrollbar"}`}>{children}</div>
            {clearAllNotifications && (
                <div className="w-full flex justify-center py-2">
                    <Button
                        data={myLanguage("notification.clearAll")}
                        fCallback={(): void => fCallBackClear()}
                        className="flex hover:text-neo-light-grey transition-colors text-neo-link mb-1 font-bold text-sm"
                        iconClassName="ml-2"
                    />
                </div>
            )}
        </div>
    );
};

export default NotificationContainer;
