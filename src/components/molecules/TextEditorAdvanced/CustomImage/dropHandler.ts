import { EditorView } from "@tiptap/pm/view";
import { ChangeEvent } from "react";

export function handleFiles(view: EditorView, event: DragEvent | ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    event.stopPropagation();
    const target = "dataTransfer" in event ? event.dataTransfer : event.target;
    const hasFiles = target?.files?.length;
    if (!hasFiles) {
        return;
    }

    const images = Array.from(target.files).filter((file) => /image/i.test(file.type));

    if (images.length === 0) {
        return;
    }

    const { schema, selection } = view.state;
    const coordinates =
        "dataTransfer" in event ? view.posAtCoords({ left: event.clientX, top: event.clientY }) : selection.$anchor;

    if (coordinates) {
        images.forEach((image) => {
            const reader = new FileReader();
            reader.onload = (readerEvent) => {
                const node = schema.nodes.customImage.create({
                    src: readerEvent.target?.result,
                });
                const transation = view.state.tr.insert(coordinates.pos, node);
                view.dispatch(transation);
            };

            reader.readAsDataURL(image);
        });
    }
}
