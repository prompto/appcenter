import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget, DragDropContextProvider } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';

class TargetBox extends Component {

    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired,
        accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
        onDrop: PropTypes.func,
        style: PropTypes.object
    };

   render() {
        const { canDrop, isOver, connectDropTarget, droppedPreview } = this.props;
        const state = droppedPreview ? "PREVIEW" : (canDrop && isOver) ? "ACTIVE" : "READY";
        return connectDropTarget(
            <div style={this.props.style}>
                { state==="PREVIEW" && <img src={droppedPreview} style={{ maxWidth: "98%", maxHeight: "98%", width: "auto", height: "auto" }} alt={""}/> }
                { state==="ACTIVE" && 'Release to drop' }
                { state==="READY" && 'Drag file here' }
            </div>,
        );
    }

}

const boxTarget = {
    drop(props, monitor) {
        if (props.onDrop) {
            props.onDrop(props, monitor);
        }
    },
};

const boxCollect = function(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    };
}


const DroppableBox = DropTarget( NativeTypes.FILE , boxTarget, boxCollect)(TargetBox);

export default class DroppedFileWidget extends Component {

    constructor(props) {
        super(props);
        this.handleFileDrop = this.handleFileDrop.bind(this);
        this.readDroppedContent = this.readDroppedContent.bind(this);
        this.state = { droppedFile: this.props.droppedFile || null, droppedPreview: this.props.image || null };
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
            this.setState({ droppedFile: null, droppedPreview: this.props.image || null });
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
        const { droppedPreview } = this.state;

        return (
            <DragDropContextProvider backend={HTML5Backend}>
                <DroppableBox style={this.props.style} accepts={[FILE]} onDrop={this.handleFileDrop} droppedPreview={droppedPreview}/>
            </DragDropContextProvider>
        );
    }
}