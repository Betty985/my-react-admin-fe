import React, { FC} from "react";
import EditorForm from "./EditorForm";
const Editor: FC = () => {
    return (
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-xs-12">
                        <EditorForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Editor