import React, {useState} from 'react'
import MovieCard from './MovieCard'



function MovieContainer(){

    const [query, setQuery] = useState("")
    const [movieList, setMovieList] = useState([])

    async function searchMovies(e){

            e.preventDefault()
            
            const url = `https://api.themoviedb.org/3/search/movie?api_key=644de5e9d44295560e561228927bfa2a&language=en-US&query=${query}&page=1&include_adult=false`
            
            if(query){
                    try{
                        const res = await fetch(url)
                        const data = await res.json()
                        setMovieList(data.results)
                        console.log(movieList)
                    }catch(err){
                        console.error(err)
                    }
                }
        
        }

    return(
        <>  <header>
                <span>powered by</span>
                <a href="https://www.themoviedb.org/?language=en-US"><img className="logo" src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg' alt="TMBD's logo"/>
                </a>
            </header>
            <div className='title-border'>
            <h1>Movie Searcher</h1>
            </div>
            <form className="form" onSubmit ={searchMovies}>
                <label 
                className="small" 
                htmlFor="query"
                >
                    Search Movies
                </label>
                <input  
                class = 'input'
                type = "text" 
                name= "query" 
                value ={query} 
                onChange= {(e) =>{
                        const {value} = e.target
                        setQuery(value)
                    }}
                placeholder ='i.e. Jurassic Park, The Matrix, etc.'
                />
                <button className = 'button'>Search</button>
            </form>
            <div className = 'collection'>
                {movieList.filter(movie => movie.poster_path)
                    .map(movie => {
                        return(
                            <MovieCard key = {movie.id} movie ={movie}/>
                        )
                    })}
            </div>
        </>
    )    
}

export default MovieContainer