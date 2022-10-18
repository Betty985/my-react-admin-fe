import React, { useEffect, useState } from 'react';
import { Card, Button, Space } from 'antd';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { useSetState } from 'ahooks';
import '@wangeditor/editor/dist/css/style.css';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
enum Output {
    JSON,
    HTML,
    TEXT,
}
export const MyEditor = () => {
    const [editor, setEditor] = useState<IDomEditor | null>(null);
    const [html, setHTML] = useSetState({
        show: false,
        val: '<p>hello editor</p>',
    });
    const [text, setTEXT] = useSetState({
        show: false,
        val: '',
    });
    const [json, setJSON] = useSetState({
        show: false,
        val: null as any,
    });

    //    模拟ajax请求，异步设置html
    useEffect(() => {
        setTimeout(() => {
            setHTML({ val: '<p>hello&nbsp;<strong>world</strong>.</p>' });
        }, 1000);
    }, []);
    const toolbarConfig: Partial<IToolbarConfig> = {};
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入内容。。。',
    };
    // 及时销毁editor
    useEffect(() => {
        return () => {
            if (editor == null) return;
            editor.destroy();
            setEditor(null);
        };
    }, [editor]);
    const print = (type: Output) => {
        if (type === Output.HTML) {
            setHTML((prev) => ({ show: !prev.show }));
        }
        if (type === Output.JSON) {
            setJSON((prev) => ({ show: !prev.show }));
        }
        if (type === Output.TEXT) {
            setTEXT((prev) => ({ show: !prev.show }));
        }
    };
    return (
        <>
            <Card hoverable>
                <Space>
                    <Button onClick={() => print(Output.HTML)}>
                        {html.show ? '隐藏html' : '生成html'}
                    </Button>
                    <Button onClick={() => print(Output.TEXT)}>
                        {text.show ? '隐藏text' : '生成text'}
                    </Button>
                    <Button onClick={() => print(Output.JSON)} disabled>
                        {json.show ? '隐藏json' : '生成json'}
                    </Button>
                </Space>

                <Card>
                    <Toolbar
                        editor={editor}
                        defaultConfig={toolbarConfig}
                        mode="default"
                        style={{ borderBottom: '1px solid #ccc' }}
                        data-w-e-toolbar={true}
                    />
                    <Editor
                        defaultConfig={editorConfig}
                        value={html.val}
                        onCreated={setEditor}
                        onChange={(editor) => {
                            setHTML({ val: editor.getHtml() });
                            setTEXT({ val: editor.getText() });
                            setJSON({ val: editor.children });
                        }}
                        style={{ minHeight: '300px' }}
                        mode="default"
                    />
                </Card>

                <Space>
                    {html.show && <Card title="html">{html.val}</Card>}
                    {text.show && <Card title="text">{text.val}</Card>}
                    {json.show && <Card title="json">{json.val}</Card>}
                </Space>
            </Card>
        </>
    );
};
