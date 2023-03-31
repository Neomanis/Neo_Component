import React, { ReactElement, useState } from "react";
import { CompleteUser } from "@neomanis/neo-types";
import { UserInfo, AvatarEditor } from "@/components/molecules";

export interface AvatarHandlerProps {
    divEditorClassName?: string;
    divInfoClassName?: string;
    dropZoneClassName?: string;
    editorWidth: number;
    fCallBackUploadAvatar: (avatar: File) => void;
    nameClassName?: string;
    roleClassName?: string;
    user: CompleteUser;
}

const AvatarHandler = ({
    divEditorClassName,
    divInfoClassName,
    dropZoneClassName,
    editorWidth,
    fCallBackUploadAvatar,
    nameClassName,
    roleClassName,
    user,
}: AvatarHandlerProps): ReactElement => {
    const [showAvatarEditor, setShowAvatarEditor] = useState(false);

    return (
        <div className="justify-around">
            <UserInfo
                divInfoClassName={divInfoClassName}
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
                />
            )}
        </div>
    );
};

export default AvatarHandler;
