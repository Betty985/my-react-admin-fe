import { Table } from 'antd';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import React, { useEffect, useRef, useState } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import { data } from './mock';
// Usage
const columns = [
    { title: '标签', dataIndex: 'key', width: 100 },
    { title: '部门', dataIndex: 'key', width: 100 },
    { title: '事件', dataIndex: 'key', width: 220 },
    { title: '时间', dataIndex: 'key', width: 150 },
];
/**
 * 配置
 * @param props
 * @returns
 */
const columnWidths = [200, 100, 440, 150];
const speed = 500;
const VirtualTable = (props: Parameters<typeof Table>[0]) => {
    const { columns, scroll } = props;
    const [tableWidth, setTableWidth] = useState(0);
    const [isScroll, setScroll] = useState(true);
    const child = useRef<any>();
    const wrapper = useRef<any>();
    const widthColumnCount = columns!.filter(({ width }) => !width).length;
    const mergedColumns = columns!.map((column) => {
        if (column.width) {
            return column;
        }

        return {
            ...column,
            width: Math.floor(tableWidth / widthColumnCount),
        };
    });

    const gridRef = useRef<any>();
    const [connectObject] = useState<any>(() => {
        const obj = {};
        Object.defineProperty(obj, 'scrollLeft', {
            get: () => {
                if (gridRef.current) {
                    return gridRef.current?.state?.scrollLeft;
                }
                return null;
            },
            set: (scrollLeft: number) => {
                if (gridRef.current) {
                    gridRef.current.scrollTo({ scrollLeft });
                }
            },
        });

        return obj;
    });

    const resetVirtualGrid = () => {
        gridRef.current?.resetAfterIndices({
            columnIndex: 0,
            shouldForceUpdate: true,
        });
    };

    useEffect(() => resetVirtualGrid, [tableWidth]);
    //TODO:自动滚动
    // useEffect(()=>{
    //     let timer:string | number | NodeJS.Timeout | undefined;
    //     if(isScroll){
    //         timer=setInterval(()=>{
    //             console.log( wrapper.current.scrollHeight);
    //             wrapper.current.scrollTop>=child.current.scrollHeight?(wrapper.current.scrollTop=0):wrapper.current.scrollTop++
    //         },speed)
    //     }
    //     return ()=>clearInterval(timer)
    // },[isScroll])

    const renderVirtualList = (rawData: object[], { scrollbarSize, ref, onScroll }: any) => {
        ref.current = connectObject;

        return (
            <Grid
                ref={gridRef}
                className="virtual-grid"
                columnCount={mergedColumns.length}
                columnWidth={(index: number) => columnWidths[index]}
                height={scroll!.y as number}
                rowCount={rawData.length}
                rowHeight={() => 50}
                width={tableWidth}
                onScroll={({ scrollLeft }: { scrollLeft: number }) => {
                    onScroll({ scrollLeft });
                }}
            >
                {({
                    columnIndex,
                    rowIndex,
                    style,
                }: {
                    columnIndex: number;
                    rowIndex: number;
                    style: React.CSSProperties;
                }) => (
                    <div
                        className={classNames('virtual-table-cell', {
                            'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
                        })}
                        style={style}
                    >
                        {(rawData[rowIndex] as any)[columnIndex]}
                    </div>
                )}
            </Grid>
        );
    };

    return (
        <div  ref={wrapper}>
 <ResizeObserver
            onResize={({ width }) => {
                setTableWidth(width);
            }}
        >
            <Table
                ref={child}
                {...props}
                className="virtual-table"
                columns={mergedColumns}
                pagination={false}
                components={{
                    body: renderVirtualList as any,
                }}
            />
        </ResizeObserver>
        </div>
       
    );
};

export const MyTable: React.FC = () => (
    <VirtualTable columns={columns} dataSource={data} scroll={{ y: 300, x: '100%' }} />
);
