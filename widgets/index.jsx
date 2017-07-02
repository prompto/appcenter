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
    }

    render() {
        return <DroppedFileWidget style={style}/>;
    }

}

$(document).ready(function() {
    ReactDOM.render(<DropZone  />, document.getElementById('root'));
});