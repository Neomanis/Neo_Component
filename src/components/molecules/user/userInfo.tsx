import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { Role, User } from "@neomanis/neo-types";
import { DefaultUserPicture } from "../../../img/png";
import { IconAdd } from "../../../img/svg";
import { Icon, Img } from "../../atoms";
import { getHexColorFromTailwindColor } from "../../utils";
import { useTranslation } from "@neomanis/neo-translation";

interface Props {
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
}: Props): ReactElement => {
    const { t } = useTranslation();
    const [isHovered, setIsHovered] = useState(false);
    const imageSizeStyle = "w-" + imageSize + " h-" + imageSize + " ";

    return (
        <div className={divInfoClassName} data-testid="global-div-info-user">
            <div
                className={imageSizeStyle + "mr-6 relative cursor-pointer"}
                data-testid="user-image-zone"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setShowAvatarEditor(true)}
            >
                <Img
                    type="imgProfile"
                    data={{
                        src: user.avatar && user.avatar.encodedAvatar ? user.avatar.encodedAvatar : DefaultUserPicture,
                        alt: user.avatar ? user.avatar.originalname : "default img",
                    }}
                    data-testid="profileImg-with-data-body"
                    className={imageSizeStyle + "rounded-full"}
                />
                <div className="absolute top-0 right-0 z-50 bg-neo-bg-A rounded-full">
                    <Icon svg={<IconAdd width={20} fill={getHexColorFromTailwindColor("neo-link")} />} />
                </div>
                {isHovered && (
                    <div
                        className={imageSizeStyle + "rounded-full absolute top-0 flex items-center"}
                        data-testid="hover-bubble"
                    >
                        <div className="opacity-80 border-2 bg-black w-full h-full rounded-full absolute"></div>
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
