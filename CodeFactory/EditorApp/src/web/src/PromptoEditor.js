import React from 'react';
import AceEditor from 'react-ace';

/*eslint-disable no-alert, no-console */
import 'brace/theme/eclipse';
import 'brace/mode/text';

export default class PromptoEditor extends React.Component {

    render() {
        return <div className="wrapper">
                <AceEditor name="prompto-editor" theme="eclipse" mode="text"/>
            </div>;
    }

}