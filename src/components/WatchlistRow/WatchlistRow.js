import React from 'react';
import '../MovieRow/MovieRow.css';
import './WatchlistRow.css';
import $ from 'jquery';
import Popup from "reactjs-popup";
import MovieDetail from '../MovieDetail/MovieDetail.js';
import {Button} from 'reactstrap';
import {API_KEY,PATH_MOVIE,PATH_BASE} from '../../api/api.js';

class WatchlistRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false ,
      show:""
    };

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)

    this.getMovieGenre();
  }

  getMovieGenre() {

    const movieId = this.props.movie.id
    const urlstr = PATH_BASE+PATH_MOVIE+"/" + movieId + "?api_key="+API_KEY+"&language=en-US"

    $.ajax({
      url: urlstr,
      success: (genreResult) => {

        const results = genreResult.genres
        const genrelist = [];
        var name, namestr = "";

        results.forEach((genre) => {
          genrelist.push(genre.name);

        });

        genrelist.forEach((value, index) => {

          if (index === genrelist.length - 1) {
            namestr += value
          } else {
            namestr += value + ","

          }

        }
        );

        this.setState({ rows: namestr,rating: genreResult.vote_average })

      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }

  openModal (){
    this.setState({ open: true })
    console.log("clicked.......");
  }
  closeModal () {
    this.setState({ open: false })
  }

  removeItem(){
    const watchlist = localStorage.getItem('watchlist');
    const arr = JSON.parse(watchlist);
    const ind = arr
    .map(e => e["id"]).indexOf(this.props.movie.id);
    console.log(ind)
    const unique = arr
            .map(e => e["id"])
     
            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)
        
            // // eliminate the dead keys & store unique objects
            .filter(
                function(i) {
                    return i !== ind
                }
            ).map(e => arr[e]);

    // console.log(unique);
    localStorage.setItem('watchlist', JSON.stringify(unique));
    this.setState({
        show:'none'
    })
    
  }

  render() {
   
    return (

      <div className="card" style={{ display:this.state.show,border: 'none',background:'transparent' }} >

        
        <img alt="no availabel" width="210" height="315" src={this.props.movie.poster_src} 
         />        
        
        <div className="card-img-overlay" onClick={this.openModal}>
          <center>          
          <p className="summary-title" >{this.props.movie.title}</p>
          <p className="summary">{this.props.movie.overview}</p>
          </center>
        </div>    

        <Popup modal
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
          lockScroll
          >
          <MovieDetail movieid ={this.props.movie.id} close = {this.closeModal} genre={this.state.rows}/>
        </Popup>

        <div className="card-body" >
          <p className="title">{this.props.movie.title}</p>
          <div className='row' id="card-info" >
            <div className='col-8'>
              <p className="genre ">Genre:&nbsp;<span>{this.state.rows}</span></p>
            </div>
            <div className='col-4' style={{ textAlign: 'right', paddingRight: 0 }}>
              <p className="year ">Year: <span>{this.props.movie.year}</span></p>
            </div>
          </div>

        </div>

        <div className="rating">
          <p>{this.state.rating}</p>
        </div>
        <Button className="remove" onClick={this.removeItem.bind(this)} style={{backgroundColor:'#50E3C2',color:'#2B3247'}}>
          Remove
        </Button>

      </div>
      

    );

  }
}

export default WatchlistRow