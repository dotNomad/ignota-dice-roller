import React from 'react';
import ReactDOM from 'react-dom';
import Ignota from './Ignota';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Ignota />, div);
  ReactDOM.unmountComponentAtNode(div);
});
