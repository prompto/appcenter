const { FormGroup, ControlLabel, FormControl, Button, Checkbox, Navbar, Pagination, PaginationButton } = ReactBootstrap;

class QueryArea extends React.Component {

    render() {
        const state = this.props.root.state;
        const first = 1 + (state.page - 1) * state.rowsPerPage;
        let last = first + state.rowsPerPage - 1;
        if(last > state.totalRows)
            last  = state.totalRows;
        const numPages = 1 + Math.trunc( (state.totalRows - 1) / state.rowsPerPage);
        const maxButtons = 7;
        const showFirst = numPages>maxButtons && state.page>4;
        const showLast = numPages>maxButtons && numPages-state.page>3;
        return <Navbar id="query-area" fluid>
                <FormGroup>
                    <ControlLabel>Query:</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="Input your query here" value={state.query} onChange={e=>this.props.root.setState({query: e.target.value})}/>
                </FormGroup>
                <Navbar.Form pullLeft>
                    <Button onClick={()=>this.props.root.fetchPage(1)}>Fetch</Button>
                </Navbar.Form>
            { numPages > 1 &&
                <Navbar.Form pullLeft>
                <Pagination style={{margin: 0}} activePage={state.page} items={numPages} maxButtons={maxButtons} first={showFirst} last={showLast} ellipsis={false} onSelect={p=>this.props.root.fetchPage(p)}/>
                </Navbar.Form>
            }
            { state.totalRows > 0 &&
                <Navbar.Text>{"Records " + first + " to " + last + " of " + state.totalRows}</Navbar.Text>
            }
                <Navbar.Form pullRight>
                    <Checkbox style={{marginTop: "7px"}} checked={state.showDbId} onChange={e=>this.props.root.showHideDbId(e.currentTarget.checked)} inline>Show dbId</Checkbox>
                </Navbar.Form>
            </Navbar>;
    }
}