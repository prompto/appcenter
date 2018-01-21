const { Table } = ReactBootstrap;

class DataTable extends React.Component {

    render() {
        this.row = 0;
        const state = this.props.root.state;
        const headers = Object.getOwnPropertyNames(state.headers);
         return <Table id="rows-table" striped>
            <thead>
                <tr>
                    { headers.map(h=><th key={h}>{h}</th>) }
                </tr>
            </thead>
             <tbody>
                    { state.rows.map(this.renderRow, this) }
             </tbody>
        </Table>;
    }

    renderRow(row) {
        let i = 0;
        return <tr key={this.row++}>
                { row.map(v=><td key={i++}>{v}</td>) }
            </tr>;
    }
}