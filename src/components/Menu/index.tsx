import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { menu } from '@/router/config';
const items = menu.map((item, index) => {
    let label = (
        // <Draggable key={item.label} draggableId={item.label} index={index}>
        //     {(provided, snapshot) => (
        //         <div
        //             ref={provided.innerRef}
        //             {...provided.draggableProps}
        //             {...provided.dragHandleProps}
        //             onDragStart={(e: React.DragEvent<any>) =>
        //                 provided.dragHandleProps && provided.dragHandleProps.onDragStart(e as any)
        //             }
        //         >
        <Link to={item.path}>{item.label}</Link>
        //         </div>
        //     )}
        // </Draggable>
    );
    let tmp = Object.assign({},item, { label }) as any;
    return tmp;
}) as any;
const MyMenu = () => {
    const [dragItems, setDragItems] = useState<any[]>(items);
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
        console.log(result)
        const _items = reorder(dragItems, result.source.index, result.destination.index);
        setDragItems(_items);
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {dragItems.map((t, i) => (
                <Draggable draggableId={i+''} key={i} index={i}>
                  {p => (
                    <h1
                      ref={p.innerRef}
                      {...p.draggableProps}
                      {...p.dragHandleProps}
                      key={i+''}
                    >
                      <p>{t.label}</p>
                    </h1>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
        </DragDropContext>
    );
};
export { MyMenu };
