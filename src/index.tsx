import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './component/Game';

ReactDOM.render(
  <React.StrictMode>
    <Game size={10} winCriteria={5}/>
  </React.StrictMode>,
  document.getElementById('root')
);
