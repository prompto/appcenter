import React from "react";

export default class TreeItem extends React.Component {

    componentWillUnmount() {
        this.props.parent.removeChild(this);
    }

}