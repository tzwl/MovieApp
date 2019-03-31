import React, { Component } from 'react';
import './App.css';
import { Button } from 'reactstrap';
import $ from 'jquery';
import MovieRow from './components/MovieRow/MovieRow.js';
import { isNull } from 'util';
import { FaStar,FaBars } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import WatchlistRow from './components/WatchlistRow/WatchlistRow.js';
import {API_KEY,PATH_MOVIE,PATH_POPULAR,PATH_TOP_RATED,PATH_UPCOMING,PATH_NOWPLAYING,PATH_BASE,PATH_SEARCH,PATH_POSTER} from './api/api.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { bgColor1: '#2B3247', 
    bgColor2: '#2B3247',
    bgColor3: '#2B3247', 
    bgColor4: '#2B3247',
    bgColor5: '#2B3247',
    bgColor6: '#50E3C2',
    color5:'#8C93AA',
    color6:'#FFFFFF',
    pagetitle: 'All Movies',
    hrwidth: '120px',
    showbutton: 'block',
    searchhome: this.searchChangeHandler.bind(this),
    }
    console.log(API_KEY);

    const showPopularMovie = this.showPopularMovie(); 

  }

  showPopularMovie() {
    // const showAllMovie = this.showAllMovie;
    console.log("show popular movies");
    const urlstr = PATH_BASE+PATH_MOVIE+PATH_POPULAR+"?api_key="+API_KEY+"&language=en-US";

    $.ajax({
      url: urlstr,
      success: (popularresults) => {
        // console.log("Fetched data successfully")

        const results = popularresults.results
        var popularList = []

        results.forEach((movie) => {

          movie.poster_src = PATH_POSTER+"/w185" + movie.poster_path;     //for movie image
          movie.year = new Date(movie.release_date).getFullYear();
          console.log(movie.id);                    //for movie year

          const movielist = <MovieRow key={movie.id} movie={movie} />               //add movie component
          popularList.push(movielist)
        })

        this.setState({
          rows: popularList,
          bgColor1: '#50E3C2', bgColor2: '#2B3247', bgColor3: '#2B3247', bgColor4: '#2B3247',
          color1: '#000', color4: '#fff', color2: '#fff', color3: '#fff'
        })

      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })

  }

  showTopRatedMovie() {
    // const showAllMovie = this.showAllMovie;
    console.log("show top rated movies");
    const urlstr = PATH_BASE+PATH_MOVIE+PATH_TOP_RATED+"?api_key="+API_KEY+"&language=en-US";

    $.ajax({
      url: urlstr,
      success: (toprateresults) => {
        // console.log("Fetched data successfully")

        const results = toprateresults.results
        var topList = []

        results.forEach((movie) => {

          movie.poster_src = PATH_POSTER+"/w185" + movie.poster_path;     //for movie image
          movie.year = new Date(movie.release_date).getFullYear();                      //for movie year

          const movielist = <MovieRow key={movie.id} movie={movie} />               //add movie component
          topList.push(movielist)
        })

        this.setState({
          rows: topList,
          bgColor2: '#50E3C2', bgColor1: '#2B3247', bgColor3: '#2B3247', bgColor4: '#2B3247',
          color2: '#000', color1: '#fff', color4: '#fff', color3: '#fff'
        })

      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })

  }

  showUpcomingMovie() {
    // const showAllMovie = this.showAllMovie;
    console.log("show upcoming movies");
    const urlstr = PATH_BASE+PATH_MOVIE+PATH_UPCOMING+"?api_key="+API_KEY+"&language=en-US";

    $.ajax({
      url: urlstr,
      success: (toprateresults) => {
        // console.log("Fetched data successfully")

        const results = toprateresults.results
        var topList = []

        results.forEach((movie) => {

          movie.poster_src = PATH_POSTER+"/w185" + movie.poster_path;     //for movie image
          movie.year = new Date(movie.release_date).getFullYear();                      //for movie year

          const movielist = <MovieRow key={movie.id} movie={movie} />               //add movie component
          topList.push(movielist)
        })

        this.setState({
          rows: topList,
          bgColor3: '#50E3C2', bgColor2: '#2B3247', bgColor1: '#2B3247', bgColor4: '#2B3247',
          color3: '#000', color1: '#fff', color2: '#fff', color4: '#fff'
        })

      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })

  }

  showNowPlayMovie() {
    // const showAllMovie = this.showAllMovie;
    console.log("show nowplaying movies");
    const urlstr = PATH_BASE+PATH_MOVIE+PATH_NOWPLAYING+"?api_key="+API_KEY+"&language=en-US";

    $.ajax({
      url: urlstr,
      success: (toprateresults) => {
        // console.log("Fetched data successfully")

        const results = toprateresults.results
        var topList = []

        results.forEach((movie) => {

          movie.poster_src = PATH_POSTER+"/w185" + movie.poster_path;     //for movie image
          movie.year = new Date(movie.release_date).getFullYear();                      //for movie year

          const movielist = <MovieRow key={movie.id} movie={movie} />               //add movie component
          topList.push(movielist)
        })

        this.setState({
          rows: topList,
          bgColor4: '#50E3C2', bgColor2: '#2B3247', bgColor3: '#2B3247', bgColor1: '#2B3247',
          color4: '#000', color1: '#fff', color2: '#fff', color3: '#fff'
        })

      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })

  }

  performSearch(searchTerm) {
    // const showAllMovie = this.showAllMovie;
    // console.log("Perform search using moviedb")
    const urlString = PATH_BASE+PATH_SEARCH+PATH_MOVIE+"?api_key="+API_KEY+"&query=" + searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully")
        // console.log(searchResults)
        const results = searchResults.results
        // console.log(results[0])

        var movieRows = []

        results.forEach((movie) => {
          if (!isNull(movie.poster_path)) {
          
          movie.poster_src = PATH_POSTER+"/w185" + movie.poster_path
          movie.year = new Date(movie.release_date).getFullYear();    
          
          // console.log(movie.id+" "+movie.poster_path)
          const movieRow = <MovieRow key={movie.id} movie={movie} />
          movieRows.push(movieRow)
        }
        })

        this.setState({rows: movieRows,bgColor1: '#2B3247',color1: '#fff'})
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }

  //search bar for all movies
  searchChangeHandler(event) {
    // console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    // console.log("SearchTerm "+searchTerm)
    if(event.target.value==""||event.target.value==null){
      // console.log("input is null....")
      const showPopularMovie = this.showPopularMovie()
      
    }else{
      boundObject.performSearch(searchTerm);
    }
    
  }

  //search bar for watchlist
  searchChangeHandler1(event) {
    console.log("search in watchlist")
    if(event.target.value==""||event.target.value==null){
      const watchlist = this.showWatchlist()
    }else{
      const watchlist = localStorage.getItem('watchlist');
      const arr = JSON.parse(watchlist);
      const popularList = []

      var searchQuery = event.target.value.toLowerCase();
      //search data
      var movie = arr.filter(function(el) {
      var searchValue = el.title.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
      });

      console.log(movie);
      if(!isNull(movie)){
        movie.forEach(movie=>{
          console.log(movie)
          movie.poster_src = PATH_POSTER+"/w185" + movie.poster_path;     //for movie image
          movie.year = new Date(movie.release_date).getFullYear();
          console.log(movie.id);                    //for movie year
    
          const movielist = <WatchlistRow key={movie.id} movie={movie} />               //add movie component
          popularList.push(movielist)
        })
      }
      
      this.setState({
        rows:popularList
      })

    }
    
  }

  showAllMovie(){
    const showPopularMovie = this.showPopularMovie(); 
    this.setState({
      bgColor5: '#2B3247',
      bgColor6: '#50E3C2',
      color5: '#8C93AA',
      color6: '#FFFFFF',
      pagetitle: 'All Movies',
      hrwidth: '120px',
      showbutton: 'block',
      searchhome: this.searchChangeHandler.bind(this)
      });
  }

  showWatchlist(){
       
    const watchlist = localStorage.getItem('watchlist');
    const arr = JSON.parse(watchlist);
    const popularList = []
    if(!isNull(arr)){
    arr.forEach(movie=>{
      console.log(movie)
      movie.poster_src = PATH_POSTER+"/w185" + movie.poster_path;     //for movie image
      movie.year = new Date(movie.release_date).getFullYear();
      console.log(movie.id);                    //for movie year

      const movielist = <WatchlistRow key={movie.id} movie={movie} />               //add movie component
      popularList.push(movielist)
    })
    }

    this.setState({
   
      bgColor5: '#50E3C2',
      bgColor6: '#2B3247',
      color5: '#FFFFFF',
      color6: '#8C93AA',
      pagetitle: 'My Watchlist',
      hrwidth: '145px',
      showbutton: 'none',
      searchhome: this.searchChangeHandler1.bind(this),
      rows:popularList
    });
  }
  
     
  render() {
    return (
      <div className='container-fluid'>      
      <div className='row'>
        
        {/* leftside */}
        <div style={{background:'#50E3C2'}} className="leftside">
        <div className='sideicon1'  
        style={{background:this.state.bgColor5,color:this.state.color5,marginTop:'6em'}} 
        onClick={this.showAllMovie.bind(this)}>
        <FaBars size={'40px'} style={{background:'transparent',borderRadius:'0px'}}/>
        </div>
        <div className='sideicon2' 
        style={{background:this.state.bgColor6,color:this.state.color6}} 
        onClick={this.showWatchlist.bind(this)}>
        <FaStar size={'40px'} style={{background:'transparent'}}/>
        </div>
        </div>


        {/* rightside */}
        <div  className="rightside">
        
        <h3 className="pgtitle">{this.state.pagetitle}</h3>
        <hr className="linecopy3" style={{width:this.state.hrwidth}}></hr>

        
        <div className='searchbar' >
          <FaSearch size={'1.2em'} style={{ color: ' #B9BFD1',background:'transparent' }} id='search'/>
          <input className="search" placeholder=" Search..." onChange={this.state.searchhome}/>
        </div>
        <br></br>

        <center style={{display:this.state.showbutton}}>
        <Button
          className="btn btn1"
          onClick={this.showPopularMovie.bind(this)} style={{ backgroundColor: this.state.bgColor1, color: this.state.color1 }}>POPULAR</Button>
        <Button className="btn btn2"
          onClick={this.showTopRatedMovie.bind(this)} style={{ backgroundColor: this.state.bgColor2, color: this.state.color2 }}>TOP RATED</Button>
        <Button className="btn btn3"
          onClick={this.showUpcomingMovie.bind(this)} style={{ backgroundColor: this.state.bgColor3, color: this.state.color3 }}>UPCOMING</Button>
        <Button className="btn btn4"
          onClick={this.showNowPlayMovie.bind(this)} style={{ backgroundColor: this.state.bgColor4, color: this.state.color4 }}>NOW PLAYING</Button>
        </center>
        
        <div className="container-fluid">
          <div className="row">
            {this.state.rows}
          </div>

        </div>
        </div>

      </div>
      </div>

    );
    
  }
}

export default App;
