import i18next from "i18next";
import React, { ReactElement, ReactNode, useState, useRef, useEffect } from "react";
import { Button, Title } from "../../atoms";

type Props = {
    children: ReactNode;
    childrenLength?: number;
    clearAllNotifications?: boolean;
    fCallBackClear?: () => void;
    fCallBackSeeAll?: () => void;
    languageUser?: string;
    title: string;
    viewItem?: number;
};

const NotificationContainer = ({
    children,
    childrenLength,
    clearAllNotifications,
    fCallBackClear,
    fCallBackSeeAll,
    languageUser = "en_US",
    title,
    viewItem = 2,
}: Props): ReactElement => {
    const myLanguage = i18next.getFixedT(languageUser);
    const [fullView, setFullView] = useState(false);
    const [heightItem, setHeightItem] = useState(100);
    const refHeight = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        setHeightItem(
            refHeight.current.children[0].getBoundingClientRect().height *
                (viewItem <= childrenLength ? viewItem : childrenLength)
        );
        if (fullView) {
            viewItem + 1 > childrenLength && fCallBackSeeAll();
            viewItem + 1 > childrenLength && setFullView(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewItem, childrenLength]);

    return (
        <div>
            <div className="flex items-center justify-between w-full text-sm uppercase border-b-2 py-1 border-neo-bg-B mb-3">
                <div className="flex items-center text-neo-light-grey">
                    <Title data={title} type="h2" className="mr-2" />
                    {childrenLength && <p>({childrenLength})</p>}
                </div>
                {viewItem < childrenLength && (
                    <Button
                        data={!fullView ? myLanguage("notification.seeAll") : myLanguage("notification.seeLess")}
                        fCallback={(): void => {
                            setFullView(!fullView);
                            fCallBackSeeAll && fCallBackSeeAll();
                        }}
                        className="flex hover:text-neo-light-grey transition-colors text-neo-link text-sm"
                        iconClassName="ml-2"
                    />
                )}
            </div>
            <div
                className={`${!fullView && "overflow-scroll no-scrollbar"} transition-all overflow-hidden`}
                style={
                    !fullView ? { height: heightItem } : { height: refHeight.current.getBoundingClientRect().height }
                }
            >
                <div ref={refHeight}>{children}</div>
            </div>
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
