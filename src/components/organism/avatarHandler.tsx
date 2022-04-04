import React, { ReactElement, useState } from "react";
import { IAvatar, IUser } from "../../interface";
import AvatarEditor from "../molecules/user/avatarEditor";
import UserInfo from "../molecules/user/userInfo";

interface Props {
    divEditorClassName?: string;
    divInfoClassName?: string;
    dropZoneClassName?: string;
    editorWidth: number;
    fCallBackUploadAvatar: (avatar: IAvatar) => void;
    imageSize?: number;
    nameClassName?: string;
    roleClassName?: string;
    user: IUser;
}

const AvatarHandler = ({
    divEditorClassName,
    divInfoClassName,
    dropZoneClassName,
    editorWidth,
    fCallBackUploadAvatar,
    imageSize,
    nameClassName,
    roleClassName,
    user,
}: Props): ReactElement => {
    const [showAvatarEditor, setShowAvatarEditor] = useState(false);

    return (
        <div className="justify-around">
            <UserInfo
                divInfoClassName={divInfoClassName}
                imageSize={imageSize}
                nameClassName={nameClassName}
                roleClassName={roleClassName}
                setShowAvatarEditor={setShowAvatarEditor}
                user={user}
            />
            {showAvatarEditor && (
                <AvatarEditor
                    divEditorClassName={divEditorClassName}
                    dropZoneClassName={dropZoneClassName}
                    editorWidth={editorWidth}
                    fCallBackUploadAvatar={fCallBackUploadAvatar}
                    setShowAvatarEditor={setShowAvatarEditor}
                    user={user}
                />
            )}
        </div>
    );
};

export default AvatarHandler;
