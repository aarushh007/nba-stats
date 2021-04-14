import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Games = () => {
    const [games, setGames] = useState([]);
    useEffect(()=>{
        const func = async () => {
            document.title = `Games | NBA`;
            let result = await axios.get('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard');
            setGames(result.data.events);
        }
        func();
    },[])
    return (
        <div className="games_container" style={{marginTop: '70px'}}>
            {games.map(game => {
                return (
                    <div className='game'>
                        <div className='info_1' >
                        <h4>{game.name}</h4>
                        <h5>{game.status.type.description}</h5>
                        <p>Full game info <a target='_blank' rel="noreferrer" href={game.links[0].href}>here</a></p>
                        </div>
                        <div className='info_2'>
                        <p>{game.status.type.detail}</p>
                        <p>{game.competitions[0].venue.fullName} - {game.competitions[0].venue.address.city}, {game.competitions[0].venue.address.state}</p>
                        {game.competitions[0].tickets && <p>Get tickets <a target='_blank' rel="noreferrer" href={game.competitions[0].tickets[0].links[0].href}>here</a></p>}
                        </div>
                    </div>    
                )
            })}
        </div>
    )
}

export default Games
