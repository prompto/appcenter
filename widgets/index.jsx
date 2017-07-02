const DroppedFileWidget = widgets.DroppedFileWidget.default;

const style = {
    display: 'inline-flex',
    border: '1px solid gray',
    height: '300px',
    width: '300px',
    padding: '20px',
    alignItems: 'center',
    justifyContent: 'center'
};

class DropZone extends React.Component {

    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
    }

    render() {
        return <DroppedFileWidget onDrop={this.onDrop} style={style}/>;
    }

    onDrop(file) {
        alert(file.name);
    }

}

$(document).ready(function() {
    ReactDOM.render(<DropZone />, document.getElementById('root'));
});