import React from 'react';
import { Grid } from 'react-bootstrap';

export default class ErrorMessage extends React.Component {

    render() {
        return <Grid style={{marginLeft: "10px"}}><h3>{this.props.message}</h3></Grid>
    }
}