import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {menu} from '@/consts'
const items = menu.map((item, index) => {
    let label = (
        <Draggable key={item.label} draggableId={item.label} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onDragStart={(e: React.DragEvent<any>) =>
                        provided.dragHandleProps && provided.dragHandleProps.onDragStart(e as any)
                    }
                >
                    {item.label}
                </div>
            )}
        </Draggable>
    );
    let tmp = Object.assign({}, item, { label }) as any;
    return tmp;
}) as any;
const MyMenu = () => {
    const [dragItems, setDragItems] = useState<any[]>(items);
    const navigate = useNavigate();
    useEffect(() => {
        setDragItems(items);
    }, [items]);
    const reorder = (list: any, startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };
    const onDragEnd = (result: any) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const _items = reorder(dragItems, result.source.index, result.destination.index);
        setDragItems(_items);
    };
    const onHandleClick = (e: any) => {
        navigate(e.key);
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <Menu  onClick={onHandleClick} items={dragItems} mode="inline" theme='dark'/>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};
export { MyMenu };
