import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget, DragDropContext, DragDropContextProvider } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';

const boxTarget = {
    drop(props, monitor) {
        if (props.onDrop) {
            props.onDrop(props, monitor);
        }
    },
};

@DropTarget(props => props.accepts, boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))

class TargetBox extends Component {

    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired,
        accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
        onDrop: PropTypes.func,
        style: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { canDrop, isOver, connectDropTarget, droppedFile, droppedPreview } = this.props;
        const state = droppedPreview ? "PREVIEW" : (canDrop && isOver) ? "ACTIVE" : "READY";
        return connectDropTarget(
            <div style={this.props.style}>
                { state==="PREVIEW" && <img src={droppedPreview} style={{ "max-width": "98%", "max-height": "98%", width: "auto", height: "auto" }}/> }
                { state==="ACTIVE" && 'Release to drop' }
                { state==="READY" && 'Drag file here' }
            </div>,
        );
    }

}

@DragDropContext(HTML5Backend)
export default class DroppedFileWidget extends Component {

    constructor(props) {
        super(props);
        this.handleFileDrop = this.handleFileDrop.bind(this);
        this.readDroppedContent = this.readDroppedContent.bind(this);
        this.state = { droppedFile: this.props.droppedFile || null, droppedPreview: null };
    }

    handleFileDrop(item, monitor) {
        if (monitor) {
            const droppedFiles = monitor.getItem().files;
            const droppedFile = droppedFiles.length ? droppedFiles[0] : 0;
            this.readDroppedContent(droppedFile);
            if(this.props.onDrop)
                this.props.onDrop(droppedFile);
        }
    }

    readDroppedContent(droppedFile) {
        if(!droppedFile)
            this.setState({ droppedFile: null, droppedPreview: null });
        else {
            this.setState({ droppedFile: droppedFile, droppedPreview: null });
            if(droppedFile.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.setState({droppedFile: droppedFile, droppedPreview: e.target.result});
                };
                reader.readAsDataURL(droppedFile);
            }
        }
    }


    render() {
        const { FILE } = NativeTypes;
        const { droppedFile, droppedPreview } = this.state;

        return (
            <DragDropContextProvider backend={HTML5Backend}>
                <TargetBox style={this.props.style} accepts={[FILE]} onDrop={this.handleFileDrop} droppedPreview={droppedPreview}/>
            </DragDropContextProvider>
        );
    }
}