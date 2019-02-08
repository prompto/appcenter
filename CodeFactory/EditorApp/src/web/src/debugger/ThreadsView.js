import React from 'react';

export default class ThreadsView extends React.Component {

    constructor(props) {
        super(props);
        this.state = { threads: [] };
    }

    setThreads(threads) {
        this.setState({ threads: threads });
   }

    render() {
        return <div className="threads">
                <ul>
                    { this.state.threads.map(t=><li key={t.threadId}>{t.name + " (" + t.state + ")"}</li>) }
                </ul>
               </div>;
    }
}