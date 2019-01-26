import React from 'react';

export default class ImageDisplayer extends React.Component {

    constructor(props) {
        super(props);
        this.loadPreview = this.loadPreview.bind(this);
        this.state = { preview: null};
        this.loadPreview(this.props.file);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.file !== nextProps.file) {
            this.setState({preview: null});
            this.loadPreview(nextProps.file);
        }
    }

    loadPreview(file) {
        if(file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ preview: e.target.result });
            };
            reader.readAsDataURL(file);
        }
    }

    render() {
        const source = this.props.source || this.state.preview;
        const state = source ? "PREVIEW" : "LOADING";
        return <div id="image-display">
            { state==="PREVIEW" && <img src={source} style={{ maxWidth: "98%", maxHeight: "98%", width: "auto", height: "auto" }} alt="" /> }
            { state==="LOADING" && 'Loading...' }
        </div>
    }
}