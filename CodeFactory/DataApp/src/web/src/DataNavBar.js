import React from 'react';
import { Navbar, FormGroup, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';

export default class DataNavBar extends React.Component {

    storeSelected(key) {
        this.props.root.setState({store: key.toUpperCase()});
    }

    render() {
        const store = this.props.root.state.store;
        const title = store.substring(0, 1) + store.substring(1).toLowerCase();
        return <Navbar inverse fluid fixedTop>
            <Navbar.Header>
                <Navbar.Brand pullLeft>
                    <a href="/"><b>Data explorer</b></a>
                </Navbar.Brand>
            </Navbar.Header>
            <Navbar.Collapse>
                <Navbar.Form pullLeft>
                    <FormGroup>
                        <ControlLabel id="store-type-label">Store:&nbsp;</ControlLabel>
                        <DropdownButton id="store-type" title={title}>
                            {["Data", "Apps", "Login"].map(ds =>
                                <MenuItem key={ds} eventKey={ds} active={store === ds.toUpperCase()}
                                          onSelect={this.storeSelected.bind(this)}>{ds}</MenuItem>, this)
                            }
                        </DropdownButton>
                    </FormGroup>
                </Navbar.Form>
            </Navbar.Collapse>
        </Navbar>;
    }


}