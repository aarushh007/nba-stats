import React, { useEffect, useState } from 'react'
const axios = require('axios')
const qs = require('query-string');

const Teams = () => {
    const [isSearch, setIsSearch] = useState(false);
    useEffect(()=>{
        let query = qs.parse(window.location.search);
        if(query.team_id){
            setIsSearch(true);
            return;
        } else {
            setIsSearch(false);
            return;
        }
    },[])
    return (
        <div>
            {!isSearch && <List></List>}
            {isSearch && <TeamStats></TeamStats>}
        </div>
    )
}

const TeamStats = () => {
    const [teamData, setTeamData] = useState();
    useEffect(()=>{
        const func = async () => {
            let query = qs.parse(window.location.search);
            document.title = `Teams | NBA`;
            let result = await axios.get(`http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${query.team_id}`)
            setTeamData(result.data.team)
        }
        func();
    },[])
    return (
        <div style={{marginTop:'70px'}}>
            {teamData && 
                <div id='team_info'>
                    <div>
                        <img src={teamData.logos[0].href} alt='team_logo' width='200px' />
                        <h1>{teamData.displayName}</h1>
                        <h3>{teamData.record.items[0].summary}</h3>
                        <p>{teamData.standingSummary}</p>
                    </div>
                    <div id='game_container'>
                        <div>
                            {teamData.nextEvent[0].competitions[0].status.type.description === 'Scheduled' && <h2>Next Game: </h2>}
                            {teamData.nextEvent[0].competitions[0].status.type.description === 'Final' && <h2>Last Game: </h2>}
                            {teamData.nextEvent[0].competitions[0].status.type.description === 'In' && <h2>In Game: </h2>}
                        <div id='next_game'>
                            <h2>{teamData.nextEvent[0].name}</h2>
                            <h4>{teamData.nextEvent[0].competitions[0].status.type.description}</h4>
                            <p>{teamData.nextEvent[0].competitions[0].venue.fullName} - {teamData.nextEvent[0].competitions[0].venue.address.city}, {teamData.nextEvent[0].competitions[0].venue.address.state}</p>
                            {teamData.nextEvent[0].competitions[0].status.type.completed !== true && <p>{teamData.nextEvent[0].competitions[0].status.type.detail}</p>}
                            <p>See full match info <a rel="noreferrer" target='_blank' href={teamData.nextEvent[0].links[0].href}>here</a></p>
                            {teamData.nextEvent[0].competitions[0].tickets && (
                                <div>
                                    <p>{teamData.nextEvent[0].competitions[0].tickets[0].summary}. Get tickets <a rel="noreferrer" target='_blank' href={teamData.nextEvent[0].competitions[0].tickets[0].links[0].href}>here</a></p>
                                </div>
                            )}
                            
                        </div>
                        </div>
                    </div>
                </div>
            }
            
        </div>    
    )
}

const List = () => {
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        const func = async () => {
          document.title = `Teams | NBA`;
          let myArr = [];
          for (let i = 1; i <= 30; i++) {
            let curr = await axios.get(
              `http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${i}`
            );
            myArr = [...myArr, {name: curr.data.team.displayName, url: curr.data.team.logos[0].href, id:i}]
            setTeams(myArr)
          }
        }
        func()
    }, [])
    return (
        <div style={{textAlign: 'center'}}>
        <p style={{margin:'auto',marginTop:'10px'}} id='team_count'>{teams.length}/30 teams loaded ✅</p>
        <div style={{marginTop: '70px'}} className='teams_container'>
            {teams.map(team => {
                return (
                    <a href={`/teams?team_id=${team.id}`}>
                    <div className='team_card'>
                    <img alt='logo' src={team.url} width='30px' height='30px'/>
                    <h3>{team.name}</h3>
                    </div>
                    </a>
                    
                )
            })}
        </div>
        <p id='team_count'>{teams.length}/30 teams loaded ✅</p>
        </div>
    )
}

export default Teams
