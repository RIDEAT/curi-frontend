import React, { useRef, DragEvent, ReactNode, RefObject, FC } from "react";

interface DraggableListItemProps {
  draggable?: boolean;
  index: number;
  accessKey?: string;
  onDragStart?: (index: number) => void;
  onDrop: (index: number) => void;
  onItemClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  children: ReactNode;
}

const DraggableListItem: FC<DraggableListItemProps> = ({
  draggable = true,
  index,
  accessKey,
  onDragStart,
  onDrop,
  children,
  onItemClick,
}) => {
  const itemRef: RefObject<HTMLLIElement> = useRef(null);

  const onDragStartHandle = (e: DragEvent) => {
    // e.dataTransfer.effectAllowed = "move";
    // e.dataTransfer.setDragImage(e.target as HTMLElement, 50000, 50000);

    // let ghostNode = (e.target as HTMLElement).cloneNode(true) as HTMLElement;
    // ghostNode.style.position = "absolute";
    // ghostNode.style.top =
    //   e.pageY - (e.target as HTMLElement).offsetHeight / 2 + "px";
    // ghostNode.style.left =
    //   e.pageX - (e.target as HTMLElement).offsetWidth / 2 + "px";
    // ghostNode.style.height = (e.target as HTMLElement).offsetHeight + "px";
    // ghostNode.style.width = (e.target as HTMLElement).offsetWidth + "px";
    // ghostNode.style.opacity = "0.8";
    // ghostNode.style.pointerEvents = "none";
    // ghostNode.id = "ghostNode";
    // document.body.prepend(ghostNode);
    itemRef.current?.classList.add("dragstart");

    onDragStart && onDragStart(index);
  };

  const onDrag = (e: DragEvent) => {
    // let ghostNode = document.querySelector("#ghostNode") as HTMLElement;
    // ghostNode.style.top =
    //   e.pageY - (e.target as HTMLElement).offsetHeight / 2 + "px";
    // ghostNode.style.left =
    //   e.pageX - (e.target as HTMLElement).offsetWidth / 2 + "px";
  };

  const onDragEnd = () => {
    document.querySelector("#ghostNode")?.remove();
    itemRef.current?.classList.remove("dragstart");
  };

  const onDragEnter = () => itemRef.current?.classList.add("dragover");

  const onDragLeave = () => itemRef.current?.classList.remove("dragover");

  const onDragOver = (e: DragEvent) => e.preventDefault();

  const onDropHandle = () => {
    itemRef.current?.classList.remove("dragover");
    onDrop(index);
  };

  return (
    <li
      accessKey={accessKey}
      ref={itemRef}
      className="draggable-list__item cursor-pointer hover:opacity-50 "
      draggable={draggable}
      onDragStart={onDragStartHandle}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDropHandle}
      onClick={onItemClick}
    >
      {children}
    </li>
  );
};

export { DraggableListItem };
