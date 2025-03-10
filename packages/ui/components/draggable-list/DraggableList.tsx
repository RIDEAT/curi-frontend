import React, { useState, FC } from "react";
import { DraggableListItem } from "./DraggableListItem";

import "./draggable-list.css";

interface DraggableListProps {
  data: any[];
  renderItemContent: any;
  onItemClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const DraggableList: FC<DraggableListProps> = ({
  data: initialData,
  renderItemContent,
  onItemClick,
}) => {
  const [data, setData] = useState(initialData);
  const [dragStartIndex, setDragStartIndex] = useState<number | null>(null);

  const onDragStart = (index: number) => setDragStartIndex(index);

  const onDrop = (dropIndex: number) => {
    const dragItem = data[dragStartIndex as number];
    let list = [...data];
    list.splice(dragStartIndex as number, 1);

    if (dragStartIndex! < dropIndex) {
      setData([
        ...list.slice(0, dropIndex - 1),
        dragItem,
        ...list.slice(dropIndex - 1),
      ]);
    } else {
      setData([
        ...list.slice(0, dropIndex),
        dragItem,
        ...list.slice(dropIndex),
      ]);
    }
  };

  return (
    <div className="w-full h-[210px] draggable-list overflow-scroll scrollbar-hide p-2 pt-0">
      {data.map((item, index) => (
        <DraggableListItem
          key={index}
          index={index}
          accessKey={item.id}
          onDragStart={onDragStart}
          onDrop={onDrop}
          onItemClick={onItemClick}
        >
          {renderItemContent(item.type, item.title)}
        </DraggableListItem>
      ))}
      <DraggableListItem
        key={data.length}
        index={data.length}
        draggable={false}
        onDrop={onDrop}
      >
        {<div></div>}
      </DraggableListItem>
    </div>
  );
};

export { DraggableList };
