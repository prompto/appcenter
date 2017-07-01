const DroppedFileWidget = widgets.DroppedFileWidget.default;

const style = {
    border: '1px solid gray',
    height: '300',
    width: '300',
    padding: '20',
    textAlign: 'center',
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