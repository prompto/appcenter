import axios from 'axios';
import React from 'react';
import DataNavBar from './DataNavBar';
import QueryArea2 from './QueryArea';
import ErrorMessage from './ErrorMessage';
import DataTable from './DataTable';

export default class DataPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { query: "", store: "DATA", headers: null, rows: null, totalRows: 0, page: 1, rowsPerPage: 25, showDbId: false, error: "No data" };
        this.fetchPage = this.fetchPage.bind(this);
        this.fetchFailed = this.fetchFailed.bind(this);
        this.dataFetched = this.dataFetched.bind(this);
        this.showHideDbIdColumn = this.showHideDbIdColumn.bind(this);
        this.showHideDbId = this.showHideDbId.bind(this);
        this.extractValue = this.extractValue.bind(this);
    }

    fetchPage(page) {
        const first = 1 + (page - 1) * this.state.rowsPerPage;
        const last = first + this.state.rowsPerPage - 1;
        if(first.toString()==="NaN" || last.toString()==="NaN") {
            alert("Internal error");
            return;
        }
        const params = new URLSearchParams();
        params.append("format", "list");
        params.append("store", this.state.store);
        params.append("first", first);
        params.append("last", last);
        params.append("query", this.state.query);
        axios.get("/ws/data/fetch", { params: params, responseType: 'json' }
        ).then(response => this.dataFetched(response.data, page)
        ).catch(this.fetchFailed) ;
    }

    dataFetched(response, page) {
        if(response.error)
            this.setState({error: response.error, headers: null, rows: null});
        else {
            const values = response.data.value;
            if(values.length===0)
                this.setState({error: "No data", headers: null, rows: null});
            else {
                const headers = {category: "Text", dbId: this.extractType(values[0].value["dbId"])};
                const rows = this.extractRows(headers, values);
                this.setState({error: null, headers: headers, rows: rows, totalRows: response.data.totalLength, page: page}, this.showHideDbIdColumn);
            }
        }
    }

    showHideDbId(show) {
        this.setState({showDbId: show}, this.showHideDbIdColumn);
    }

    showHideDbIdColumn() {
        const display = this.state.showDbId ? "table-cell" : "None";
        const table = document.getElementById("rows-table");
        if(table) {
            const rows = table.getElementsByTagName("tr");
            Array.from(rows).forEach(row=>row.children[1].style.display=display);
        }
    }

    extractRows(headers, values) {
        return values.map(row => {
            const flatRow = [row.type];
            // read existing headers
            for(let key in headers) {
                if(key==="category")
                    continue;
                let value = row.value[key];
                delete row.value[key];
                value = this.extractValue(headers[key], value);
                flatRow.push(value);
            }
            // read missing headers
            for(let key in row.value) {
                let value = row.value[key];
                headers[key] = this.extractType(value);
                value = this.extractValue(headers[key], value);
                flatRow.push(value);
            }
            // done
            return flatRow;
        }, this);
    }

    extractValue(type, value) {
        if(value===undefined)
            return "";
        else if(Array.isArray(value)) {
            if(type.endsWith("[]"))
                type = type.substring(0, type.length()-2);
            return value.map(val=>this.extractValue(type, val));
        } else if(value instanceof Object) {
            if(value.name)
                return value.name;
            else {
                value = value.value;
                if (value === undefined)
                    return "";
                else if (value instanceof Object)
                    return JSON.stringify(value.value);
                else
                    return value;
            }
        } else
            return value;
    }

    extractType(value) {
        if(value && value.type)
            return value.type;
        else if(typeof(value)===typeof(""))
            return "Text";
        else if(typeof(value)===typeof(1.1))
            return "Decimal";
        else if(typeof(value)===typeof(1))
            return "Integer";
        else if(typeof(value)===typeof(true))
            return "Boolean";
        else
            return "Any";
    }


    fetchFailed(error) {
        alert(error);
    }

    render() {
        return <div>
            <DataNavBar root={this}/>
            <QueryArea2 id="data-container" root={this}/>
            { this.state.error && <ErrorMessage message={this.state.error}/> }
            { this.state.error===null && <DataTable root={this}/> }
        </div>;
    }

}
