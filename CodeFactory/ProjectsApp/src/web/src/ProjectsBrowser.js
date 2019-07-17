import React from 'react';
import { Row } from 'react-bootstrap';
import ProjectWidget from './ProjectWidget';

export default class ProjectsBrowser extends React.Component {

    render() {
        return <Row>
            {this.props.modules.map( module => {
                const dbId = module.value.dbId.value || module.value.dbId;
                return <ProjectWidget key={dbId} root={this.props.root} module={module} />;
            })}
        </Row>;
    }
}
