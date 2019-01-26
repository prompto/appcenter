import React from 'react';
import ReactDOM from 'react-dom';
import EditorPage from './EditorPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditorPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
