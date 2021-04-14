import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Home = () => {
    const [news, setNews] = useState();
    useEffect(()=>{
        document.title = 'Home | NBA'
        const func = async () => {
            let result = await axios.get('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/news');
            setNews(result.data.articles)
        }
        func();
    },[])
    return (
        <div id='homepage'>
            {news && news.map(article => {
                return (
                    <div>
                        <img alt='article' style={{maxWidth:'100%',display:'block',height:'auto'}} src={article.images[0].url} />
                        <h2 style={{maxWidth:'60ch',}} fontSize='2em'>{article.description}</h2>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                )
            })}
        </div>
    )
}

export default Home
