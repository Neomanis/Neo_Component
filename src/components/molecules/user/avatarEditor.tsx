import React, { createRef, Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import { Button } from "../../atoms";
import Dropzone, { DropzoneRef, FileRejection } from "react-dropzone";
import ReactAvatarEditor from "react-avatar-editor";
import { useTranslation } from "react-i18next";
import { IAvatar, IUser, TFileErrorTraductionKey } from "../../../interface";
import { CloseLogo } from "../../../img/svg";

interface Props {
    divEditorClassName?: string;
    dropZoneClassName?: string;
    editorWidth: number;
    fCallBackUploadAvatar: (avatar: IAvatar) => void;
    setShowAvatarEditor: Dispatch<SetStateAction<boolean>>;
    user: IUser;
}

const AvatarEditor = ({
    divEditorClassName = " bg-neo-bg-B mt-4 rounded relative p-5",
    dropZoneClassName = "border-neo-link w-full border-2 rounded-lg border-dashed p-4 text-center text-white flex flex-col items-center",
    editorWidth,
    fCallBackUploadAvatar,
    setShowAvatarEditor,
    user,
}: Props): ReactElement => {
    const { t } = useTranslation();

    const [image, setImage] = useState("");
    const [imageInformation, setImageInformation] = useState<{ mimetype: string; originalname: string }>();
    const [error, setError] = useState<{ messages: string[]; show: boolean }>({ messages: [], show: false });
    const [scale, setScale] = useState(1);

    const dropzoneRef = createRef<DropzoneRef>();
    const avatarEditorRef = createRef<ReactAvatarEditor>();

    const openBrowseFiles = () => {
        if (dropzoneRef.current) {
            dropzoneRef.current.open();
        }
    };

    function reset() {
        setImage("");
        setImageInformation(undefined);
        setScale(1);
        setError({ show: false, messages: [] });
    }

    function handleError(errors: FileRejection[]) {
        const errorMessages: string[] = [];
        errors[0].errors.forEach((error) => {
            errorMessages.push(t(`error.file.${error.code as TFileErrorTraductionKey}`));
        });
        setError({ show: true, messages: errorMessages });
    }

    async function uploadAvatar(): Promise<void> {
        if (imageInformation && user.uid && avatarEditorRef.current) {
            const encodedAvatar = avatarEditorRef.current.getImageScaledToCanvas().toDataURL();
            const avatar = {
                encodedAvatar: encodedAvatar,
                mimetype: imageInformation.mimetype,
                originalname: imageInformation.originalname,
            };
            fCallBackUploadAvatar(avatar);
            reset();
            setShowAvatarEditor(false);
        }
    }

    useEffect(() => {
        setError({ show: false, messages: [] });
        // set props avatarImage
    }, [image]);

    return (
        <div className={divEditorClassName} data-testid="global-div-avatar-editor">
            <div className="absolute -top-0.5 right-0.5 ">
                <Button
                    testId={"close-avatar-editor-button"}
                    svg={<CloseLogo fill="#ffffff" />}
                    svgClassName="w-3"
                    fCallback={() => setShowAvatarEditor(false)}
                />
            </div>
            {image ? (
                <div className="flex flex-col mt-5">
                    <div
                        onWheel={(event) => {
                            if (event.deltaY < 0 && scale < 3) {
                                setScale((oldScale) => (oldScale + 0.2 > 3 ? 3 : oldScale + 0.2));
                            }
                            if (event.deltaY > 0 && scale > 1) {
                                setScale((oldScale) => (oldScale - 0.2 < 1 ? 1 : oldScale - 0.2));
                            }
                        }}
                        className="mx-auto"
                    >
                        <ReactAvatarEditor
                            ref={avatarEditorRef}
                            width={editorWidth}
                            height={editorWidth}
                            borderRadius={250}
                            scale={scale}
                            image={image}
                        />
                    </div>
                    <input
                        type="range"
                        className="mt-2"
                        value={scale * 100}
                        min={100}
                        max={300}
                        step={1}
                        onChange={(event) => setScale(Number(event.target.value) / 100)}
                    />
                    <div className="flex justify-end space-x-4 mt-2">
                        <Button
                            data={t("global.cancel")}
                            testId={"reset-image-button"}
                            className="text-neo-link font-bold hover:underline"
                            fCallback={() => reset()}
                        />
                        <Button
                            data={t("global.apply")}
                            testId={"upload-avatar-button"}
                            className="h-8 w-20 rounded-3xl text-white flex items-center text-sm justify-center font-extrabold"
                            style={{
                                background: "linear-gradient(49.89deg, #FF1166 12.35%, #FF3355 50.76%, #FF5555 87.67%)",
                            }}
                            fCallback={() => uploadAvatar()}
                        />
                    </div>
                </div>
            ) : (
                <div data-testid="div-dropzone">
                    <Dropzone
                        ref={dropzoneRef}
                        accept={["image/png", "image/jpg", "image/svg", "image/svg+xml", "image/jpeg", "image/gif"]}
                        noClick
                        multiple={false}
                        maxSize={2000000}
                        onDropRejected={(errors) => handleError(errors)}
                        onDropAccepted={(acceptedFiles) => {
                            setImage(URL.createObjectURL(acceptedFiles[0]));
                            setImageInformation({
                                mimetype: acceptedFiles[0].type,
                                originalname: acceptedFiles[0].name,
                            });
                        }}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <section className="flex justify-center">
                                <span className={dropZoneClassName} {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div>
                                        <p>{t("image.dragAndDrop")}</p>
                                        <p>({t("image.types")})</p>
                                    </div>
                                    <Button
                                        data={t("global.browseFiles")}
                                        testId={"open-browse-file-button"}
                                        fCallback={() => openBrowseFiles()}
                                        className="h-8 w-36 mt-2 rounded-3xl text-white flex items-center text-sm justify-center font-extrabold"
                                        style={{
                                            background:
                                                "linear-gradient(49.89deg, #FF1166 12.35%, #FF3355 50.76%, #FF5555 87.67%)",
                                        }}
                                    />
                                </span>
                            </section>
                        )}
                    </Dropzone>
                    {error.show && (
                        <div className="text-neo-red font-bold text-xs mt-2">
                            {error.messages.map((errorMessage) => (
                                <div>{errorMessage}</div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AvatarEditor;
