import React from 'react';
import ProjectTree from './ProjectTree';

export default class ContentNavigator extends React.Component {

    constructor(props) {
        super(props);
        this.toggleShowLibraries = this.toggleShowLibraries.bind(this);
        this.state = {showLibraries: false}
    }

    render() {
        return <div className="tree">
            <div className="checkbox">
                <label><input type="checkbox" id="show-libs" checked={this.state.showLibraries} onChange={this.toggleShowLibraries} />&nbsp;Show libraries</label>
            </div>
            <ProjectTree ref={ref=>this.projectTree=ref} catalog={this.props.catalog} showLibraries={this.state.showLibraries} root={this.props.root}/>
        </div>;
    }

    toggleShowLibraries(e) {
        this.setState({showLibraries: e.target.checked});
    }

}