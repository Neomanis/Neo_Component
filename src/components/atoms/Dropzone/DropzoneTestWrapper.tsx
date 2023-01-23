import React, { ReactElement } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "./Dropzone";

const DropzoneTestWrapper = (): ReactElement => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone();
    return <Dropzone getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} />;
};

export default DropzoneTestWrapper;
