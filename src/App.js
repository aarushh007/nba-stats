import './App.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Home from './Home';
import Players from './Players';
import { useState } from 'react';
import Stats from './Stats';
import Teams from './Teams';
import Games from './Games';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path='/' exact>
          <div>
          <Header></Header>
          <Home />
          </div>
        </Route>
        <Route path='/players' exact>
          <div>
          <Header></Header>
          <Players />
          </div>
        </Route>
        <Route path='/stats' exact>
          <div>
          <Header></Header>
          <Stats />
          </div>
        </Route>
        <Route path='/teams' exact>
          <div>
          <Header></Header>
          <Teams />
          </div>
        </Route>
        <Route path='/games' exact>
          <div>
          <Header></Header>
          <Games />
          </div>
        </Route>
      </Router>
    </div>
  );
}

function Header() {
  const [currSearch, setCurrSearch] = useState('')
  return (
    <header>
      <div id='links'>
        <ul>
          <li id='oof'><a href='/'><i className="fas fa-basketball-ball" style={{color: '#ee6730', fontSize: '3rem'}}></i></a></li>
          <li id='link_home'><a href='/' >Home</a></li>
          <li id='link_players'><a href='/players'>Players</a></li>
          <li id='link_stats'><a href='/stats'>Stats</a></li>
          <li id='link_teams'><a href='/teams'>Teams</a></li>
          <li id='link_games'><a href='/games'>Games</a></li>
        </ul>
      </div>
      <div id='search_nav'>
        <input id='inp' value={currSearch} onChange={(e)=>{setCurrSearch(e.target.value)}} type='text' placeholder='search for players...'></input>
        <a href={`/players?search=${currSearch}`}><button>Search</button></a>
      </div>
    </header>
  )
}

export default App;
