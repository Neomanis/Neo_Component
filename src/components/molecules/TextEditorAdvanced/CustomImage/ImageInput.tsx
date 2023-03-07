import { Button } from "@/components/atoms";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor } from "@tiptap/react";
import React, { ReactElement, useRef } from "react";
import { handleFiles } from "./dropHandler";

interface Props {
    editor: Editor;
}

const ImageInput = ({ editor }: Props): ReactElement => {
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    return (
        <>
            <input
                type="file"
                ref={inputFileRef}
                className="hidden"
                onChange={(event) => handleFiles(editor.view, event)}
            />
            <Button
                id="image-button"
                startIcon={<FontAwesomeIcon icon={faImage} />}
                variant="none"
                size="none"
                rounded="none"
                onClick={() => inputFileRef.current?.click()}
                className="h-12 w-8 flex items-center justify-center text-white"
            />
        </>
    );
};

export default ImageInput;
