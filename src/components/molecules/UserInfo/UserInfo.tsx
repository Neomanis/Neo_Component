import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { useTranslation } from "@neomanis/neo-translation";
import { User, Role } from "@neomanis/neo-types";
import { DefaultUserPicture } from "@/img/png";
import { IconAdd } from "@/img/svg";
import NeoColors from "@/utils/neoColors";
import { Img, Icon } from "@/components/atoms";

export interface UserInfoProps {
    divInfoClassName?: string;
    imageSize?: number;
    nameClassName?: string;
    roleClassName?: string;
    setShowAvatarEditor: Dispatch<SetStateAction<boolean>>;
    user: User;
}

const UserInfo = ({
    divInfoClassName = "flex w-full justify-between items-center",
    imageSize = 16,
    nameClassName = "text-neo-light-grey text-xl font-extrabold",
    roleClassName = "text-neo-blue font-light",
    setShowAvatarEditor,
    user,
}: UserInfoProps): ReactElement => {
    const { t } = useTranslation();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={divInfoClassName} data-testid="global-div-info-user">
            <div
                className={`${"w-" + imageSize + " h-" + imageSize} mr-6 relative cursor-pointer rounded-full`}
                data-testid="user-image-zone"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setShowAvatarEditor(true)}
            >
                <Icon
                    className="absolute top-0 right-0 z-50 bg-neo-bg-A rounded-full"
                    svg={<IconAdd width={20} fill={NeoColors.link} />}
                />
                <Img
                    type="imgProfile"
                    data={{
                        src: user.avatar && user.avatar.encodedAvatar ? user.avatar.encodedAvatar : DefaultUserPicture,
                        alt: user.avatar ? user.avatar.originalname : "default img",
                    }}
                    data-testid="profileImg-with-data-body"
                    className={`${"w-" + imageSize + " h-" + imageSize} rounded-full`}
                />
                {isHovered && (
                    <div
                        className={`absolute top-0 rounded-full flex items-center w-full h-full opacity-80 bg-black 
                                    ${"w-" + imageSize + " h-" + imageSize}`}
                        data-testid="hover-bubble"
                    >
                        <div className="text-xxs text-white font-bold z-30 w-full text-center">
                            {t("image.changeAvatar").toUpperCase()}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col justify-center  items-start ">
                <p className={nameClassName} data-testid="name-info-user">
                    {`${user.name?.lastName ?? ""} ${user.name?.firstName ?? ""}`}
                </p>
                <p className={roleClassName} data-testid="role-info-user">
                    {user.role ? t(`role.${user.role.toLowerCase() as Role}`).toUpperCase() : ""}
                </p>
            </div>
        </div>
    );
};

export default UserInfo;
