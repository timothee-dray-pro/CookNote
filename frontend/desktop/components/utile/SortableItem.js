import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({ id, children, isTarget }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        position: "relative",
        zIndex: isDragging ? 1000 : 1,
        borderRadius: "12px",
        boxShadow: isDragging
            ? "0 10px 25px rgba(0,0,0,0.15)"
            : "none"
    };

    const contentStyle = {
        opacity: isTarget && !isDragging ? 0.15 : 1
    };

    return (
        <div ref={setNodeRef} style={style}>
            {children({ attributes, listeners, contentStyle })}
        </div>
    );
}