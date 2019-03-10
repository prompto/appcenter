import React from "react";
import { Table } from "react-bootstrap";

class BreakpointRow extends React.Component {

    render() {
        return <tr className="breakpoint-row" onClick={this.props.onClick}>
            <td/>
            <td className="breakpoint-row-name">{this.props.breakpoint.toString()}</td>
        </tr>;
    }
}

export default class BreakpointsView extends React.Component {

    render() {
        let idx = 0;
        return <div className="breakpoints">
            <Table size="sm">
                <thead>
                <tr>
                    <th style={{width: "10px"}}/>
                    <th>Breakpoints</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                { this.props.breakpoints.living().map(b => <BreakpointRow key={idx++} breakpoint={b} onClick={()=>this.props.breakpointSelected(b)}/>, this) }
                { this.renderNoBreakpoint() }
                </tbody>
            </Table>
        </div>;

    }

    renderNoBreakpoint() {
        if(this.props.breakpoints.living().length===0) {
            return <tr className="breakpoint-row">
                <td/>
                <td className="breakpoint-row-name"><i>No breakpoint defined</i></td>
            </tr>;
        }

    }

}