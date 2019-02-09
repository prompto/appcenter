import React from 'react';

export default class WorkersView extends React.Component {

    constructor(props) {
        super(props);
        this.state = { workers: [] };
    }

    setWorkers(workers) {
        this.setState({ workers: workers });
   }

    render() {
        return <div className="workers">
                <ul>
                    { this.state.workers.map(w=><li key={w.workerId}>{w.name + " (" + w.state + ")"}</li>) }
                </ul>
               </div>;
    }
}