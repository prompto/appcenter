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

    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;

        return connectDropTarget(
            <div style={this.props.style}>
                {isActive ?
                    'Release to drop' :
                    'Drag file here'
                }
            </div>,
        );
    }
}

@DragDropContext(HTML5Backend)
export default class DroppedFileWidget extends Component {

    constructor(props) {
        super(props);
        this.handleFileDrop = this.handleFileDrop.bind(this);
        this.state = { droppedFiles: [] };
    }

    handleFileDrop(item, monitor) {
        if (monitor) {
            const droppedFiles = monitor.getItem().files;
            this.setState({ droppedFiles });
        }
    }

    render() {
        const { FILE } = NativeTypes;
        const { droppedFiles } = this.state;

        return (
            <DragDropContextProvider backend={HTML5Backend}>
                <div>
                    <TargetBox style={this.props.style} accepts={[FILE]} onDrop={this.handleFileDrop} />
                </div>
            </DragDropContextProvider>
        );
    }
}