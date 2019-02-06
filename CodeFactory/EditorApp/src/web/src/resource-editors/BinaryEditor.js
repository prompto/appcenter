import React from 'react';

export default class BinaryEditor extends React.Component {

    constructor(props) {
        super(props);
        this.loadPreview = this.loadPreview.bind(this);
        this.state = { display: "none", preview: null, file: null, source: null, name: "" };
    }

    setContent(content) {
        if(content.type!=="image")
            this.setState({display: "none"});
        else {
            const preview = content.file === this.state.file ? this.state.preview : null;
            this.setState({display: "block", preview: preview, file: content.file, source: content.data, name: content.name}, ()=>{
                if(this.state.file && !this.state.preview)
                    this.loadPreview();
            });
        }
    }

    loadPreview() {
        const file = this.state.file;
        if(file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ preview: e.target.result });
            };
            reader.readAsDataURL(file);
        }
    }

    render() {
        const source = this.state.source || this.state.preview;
        const state = source ? "PREVIEW" : "LOADING";
        const style = {display: this.state.display};
        return <div className="resource-editor-wrapper" style={style} >
                    <div id="image-displayer">
                        { state==="PREVIEW" && <img src={source} style={{ maxWidth: "98%", maxHeight: "98%", width: "auto", height: "auto" }} alt="" /> }
                        { state==="LOADING" && 'Loading...' }
                    </div>
                <div id="resource-name">{this.state.name}</div>
            </div>;
    }
}