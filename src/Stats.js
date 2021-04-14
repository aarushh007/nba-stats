import React, { useEffect, useState } from 'react'
const qs = require('query-string')
const axios = require('axios');

const Stats = () => {
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [player_data, setPlayer_data] = useState({});
    const [playerInfo, setPlayerInfo] = useState({})
    const [year, setYear] = useState(2020);
    useEffect(()=>{
        let query = qs.parse(window.location.search);
        if(query.player_id){
            setIsSearch(true);
            const func = async () => {
                document.title = `Stats | NBA`;
                let info = await axios.get(`https://www.balldontlie.io/api/v1/players/${query.player_id}`)
                setPlayerInfo(info.data)
                let result = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${query.player_id}&season=2020`);
                setPlayer_data(result.data.data[0]);
            }
            func();
            return;
        } else {
            document.title = `Stats | NBA`;
            setIsSearch(false);
            return;
        }
    },[]);
    const get = async () => {
        if(document.getElementById('yr').value){
            let query = qs.parse(window.location.search);
            let result = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${query.player_id}&season=${parseInt(document.getElementById('yr').value)}`);
            setPlayer_data(result.data.data[0]);
            setYear(parseInt(document.getElementById('yr').value))
        }
    }
    return (
        <div id='stats_page'>
            {!isSearch ? (
                <div><input value={search} onChange={e => setSearch(e.target.value)} type='number' placeholder='enter player id' />
                <a href={`/stats?player_id=${search}`}><button id='search_btn'>Get Stats</button></a></div>
            ) : (
                <div>
                    <h2>{playerInfo.first_name} {playerInfo.last_name} - {`${year}/${year+1}`}</h2>
                    <div id='search_yr'>
                    <input id='yr' type='number' placeholder='year' />
                    <button id='go' onClick={get}>Go</button>
                    </div>
                    <br></br>
                    <br></br>
                    {player_data && <table>
                        <tr>
                            <th>Games played</th>
                            <th>PPG</th>
                            <th>AST</th>
                            <th>REB</th>
                            <th>STL</th>
                            <th>BLK</th>
                            <th>FT %</th>
                            <th>3P %</th>
                            <th>MIN</th>
                        </tr>
                        <tr>
                            <td>{player_data.games_played}</td>
                            <td>{player_data.pts}</td>
                            <td>{player_data.ast}</td>
                            <td>{player_data.reb}</td>
                            <td>{player_data.stl}</td>
                            <td>{player_data.blk}</td>
                            <td>{player_data.ft_pct}</td>
                            <td>{player_data.fg3_pct}</td>
                            <td>{player_data.min}</td>
                        </tr>
                    </table>}
                    {!player_data && <p>No data available for this year</p>}
                </div>
            )}
        </div>
    )
}

export default Stats;
