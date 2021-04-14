import React, { useEffect, useState } from 'react';
const axios = require('axios');
const qs = require('query-string');

const Players = () => {
  const [num_players, setNum_players] = useState(0)  
  const [players, setPlayers] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
    useEffect(() => {
        let query = qs.parse(window.location.search);
        if (query.search){
          document.title = `${query.search} | NBA`
          const func = async () => {
            setIsSearch(true)
            let result = await axios.get(
              `https://www.balldontlie.io/api/v1/players?per_page=100&search=${query.search}`
            );
            let length = result.data.meta.total_pages;
            setNum_players(result.data.meta.total_count)
            let myArr = [];
            for (let i = 1; i <= length; i++) {
              let curr = await axios.get(
                `https://www.balldontlie.io/api/v1/players?page=${i}&per_page=100&search=${query.search}`
              );
              myArr.push(...curr.data.data);
              setPlayers([...myArr]);
            }
          };
          func();
          return;
        }
        const func = async () => {
          document.title = `Players | NBA`;
          setIsSearch(false)
          let result = await axios.get(
            "https://www.balldontlie.io/api/v1/players?per_page=100"
          );
          let length = result.data.meta.total_pages;
          setNum_players(result.data.meta.total_count)
          let myArr = [];
          for (let i = 1; i <= length; i++) {
            let curr = await axios.get(
              `https://www.balldontlie.io/api/v1/players?page=${i}&per_page=100`
            );
            myArr.push(...curr.data.data);
            setPlayers([...myArr]);
            
          }
        };
        func();
        return;
    }, [])
    return (
        <div id='players_main'>
          {isSearch && <a href='/players'><i style={{fontSize:'.8rem'}} className="fas fa-chevron-left"></i> Full players list</a>}
          {players.length===0&&<p>No results found ☹</p>}
          <p id='loaded_count'>{players.length}/{num_players} players loaded <i className="fas fa-check-square" style={{color: 'green'}}></i></p>
            {players && players.map(player => {
                return (<div id='player_card'>
                  <div>
                  <h2>{player.first_name} {player.last_name}</h2>
                  <h4>{player.team.full_name}</h4>
                  
                  </div>
                  
                  <div id='get_stats_btn'>
                  <div>
                  <a href={`/stats?player_id=${player.id}`}><button id='get_stats'>Get player stats</button></a>
                  </div>
                  <div >
                  <p id='player_id'>player id: {player.id}</p>
                  </div>
                  </div>
                </div>)
                
            })}
            
        </div>
    )
}

export default Players
