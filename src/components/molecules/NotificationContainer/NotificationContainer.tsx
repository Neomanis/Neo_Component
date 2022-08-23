import React, { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { useTranslation } from "@neomanis/neo-translation";
import { Title, Button } from "@/components/atoms";

export interface NotificationContainerProps {
    children: ReactNode;
    childrenLength?: number;
    clearAllNotifications?: boolean;
    fCallBackClear?: () => void;
    fCallBackSeeAll?: () => void;
    languageUser?: string;
    title: string;
    viewItem?: number;
}

const NotificationContainer = ({
    children,
    childrenLength,
    clearAllNotifications,
    fCallBackClear,
    fCallBackSeeAll,
    title,
    viewItem = 2,
}: NotificationContainerProps): ReactElement => {
    const { t } = useTranslation();

    const [fullView, setFullView] = useState(false);
    const [heightItem, setHeightItem] = useState(50);
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
    }, [viewItem, childrenLength]);

    return (
        <div>
            <div className="flex items-center justify-between w-full text-xs uppercase border-b-2 py-1 border-neo-bg-B mb-3">
                <div className="flex items-center text-neo-light-grey ">
                    <Title data={title} type="h2" className="mr-2 font-bold" />
                    {childrenLength && <p>({childrenLength})</p>}
                </div>
                {viewItem < childrenLength && (
                    <Button
                        data={!fullView ? t("global.seeAll") : t("global.seeLess")}
                        fCallback={(): void => {
                            setFullView(!fullView);
                            fCallBackSeeAll && fCallBackSeeAll();
                        }}
                        className="flex hover:text-neo-light-grey transition-colors text-neo-link text-xxs"
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
                        data={t("global.clearAll")}
                        fCallback={(): void => fCallBackClear()}
                        className="flex hover:text-neo-light-grey transition-colors text-neo-link mb-1 font-bold text-xs"
                        iconClassName="ml-2"
                    />
                </div>
            )}
        </div>
    );
};

export default NotificationContainer;
