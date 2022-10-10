import { Table } from 'antd';
import classNames from 'classnames';
import * as XLSX from 'xlsx';
import ResizeObserver from 'rc-resize-observer';
import React, { useEffect, useRef, useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { VariableSizeGrid as Grid } from 'react-window';
import { data } from './mock';
import { type } from '@/hooks';
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
        <div ref={wrapper}>
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
export const MyTHead: React.FC = () => {
    const sheet2blob = (sheet: any, sheetName: string = 'sheet1') => {
        let workbook: XLSX.WorkBook = {
            SheetNames: [sheetName],
            Sheets: {
                sheetName: sheet,
            },
        };
        let wopts: any = {
            bookType: 'xlsx',
            bookSST: false,
            type: 'binary',
        };
        let wbount = XLSX.write(workbook, wopts);
        function s2ab(s: string): any {
            let buff = new ArrayBuffer(s.length);
            let view = new Uint8Array(buff);
            for (var i = 0; i != s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xff;
                return buff;
            }
        }
        let blob = new Blob([s2ab(wbount)], {
            type: 'application/octet-stream',
        });
        return blob;
    };
    /**
     * @description 创建a标签，利用a标签的download属性下载文件
     * @param url
     * @param saveName
     */
    const openDownloadDialog = (url: any, saveName: string = 'sheet1.xlsx') => {
        if (type(url) === 'blob') {
            url = URL.createObjectURL(url);
        }
        let aLink = document.createElement('a');
        aLink.href = url;
        aLink.download = saveName;
        let event;
        if (window.MouseEvent) {
            event = new MouseEvent('click');
        } else {
            event = document.createEvent('MouseEvent');
        }
        aLink.dispatchEvent(event);
    };
    const handleExportAll = () => {
        const json = data.map((item) => {
            const [tag, department, event, time] = item;
            const status=tag.props.children;
            return {
                tag:status,
                department,
                event,
                time,
            };
        });
        const sheet = XLSX.utils.json_to_sheet(json);
        openDownloadDialog(sheet2blob(sheet, undefined), '虚拟新闻列表.xlsx');
    };
    return (
        <div className="flex justify-between">
            <span >虚拟新闻列表</span>
            <DownloadOutlined onClick={handleExportAll}/>
        </div>
    );
};
