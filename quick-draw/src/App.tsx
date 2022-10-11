import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App () {
  const [playerInfo, setPlayerInfo] = useState({
    playerRedTime: 0,
    playerBlueTime: 0,
    playerRedColour: '#c77d7d',
    playerBlueColour: '#8c8dde',
    playerRedArea: '#c77d7d',
    playerBlueArea:'#8c8dde',
  });

  const [win, setWin] = useState({
    winner:'',
    finished: false,
  });

  const handleUserKeyPress = (event: KeyboardEvent) => {
    
    if (event.key === 'Shift') {
      console.log('RED fires!', Date.now());
      setPlayerInfo(prev => ({
        ...prev,
        playerRedTime: Date.now()
      }));

      if (!win.winner) {
        setPlayerInfo(prev => ({
          ...prev,
          playerBlueArea: prev.playerRedColour,
        }));

        setWin({
          winner:'red',
          finished: false,
        });
      }
    }

    if (event.key === 'Enter') {
      console.log('BLUE fires!', Date.now());
      setPlayerInfo(prev => ({
        ...prev,
        playerBlueTime: Date.now()
      }));

      if (!win.winner) {
        setPlayerInfo(prev => ({
          ...prev,
          playerRedArea: prev.playerBlueColour,
        }));

        setWin({
          winner:'blue',
          finished: false,
        });
      }
    }

    if (playerInfo.playerRedTime != 0 && playerInfo.playerBlueTime != 0) {
      setWin(prev => ({
        ...prev,
        finished: true
      }));
    }

  };

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  });

  return (
      <div>
          <h1>{win.winner ? `${win.winner} wins` : 'welcome to the showdown'}</h1>
          {win.finished &&
          <h2>
            Time difference is: {Math.abs(playerInfo.playerRedTime - playerInfo.playerBlueTime)}
          </h2>} 
          <div className='areas-container'>
            <div className='p1-area' style={{backgroundColor: playerInfo.playerRedArea}}><p>RED player</p><br /><p>Press `SHIFT` to fire first!</p></div>
            <div className='p2-area' style={{backgroundColor: playerInfo.playerBlueArea}}><p>BLUE player</p><br /><p>Press `ENTER` to fire first!</p></div>
          </div>
      </div>
  );
};

export default App;
