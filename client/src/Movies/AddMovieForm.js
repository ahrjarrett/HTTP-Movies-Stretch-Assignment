import React from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';


const API_KEY = 'aa71be19e3f94c1686212b7b46b28de9'
//const SEARCH_MOVIE_URL = `http://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`
const CREDITS_URL = 'https://api.themoviedb.org/3/movie/244786/credits?api_key=' + API_KEY
const SEARCH_MOVIE_URL = 'http://www.omdbapi.com/?apikey=ca6d8933&type=movie&s='

const createQuery = id => {
    return 'https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=' + API_KEY
}
const getSuggestionValue = suggestion => suggestion.Title;


const renderSuggestion = suggestion => (
    <div>
        {suggestion.Title}
        </div>
)
class AddMovieForm extends React.Component{
    constructor(){
        super();
        this.state = {
           value: '',
           suggestions:[]

        }
    }
    asyncFetch = (value) =>{
        axios.get(SEARCH_MOVIE_URL+value)
        .then(response => {
            if( response.data.Response === 'True'){
                this.setState({suggestions:response.data.Search})
            }
            else{
                this.setState({suggestions:[]})
            }
        })
    }
    onSuggestionsFetchRequested = ({value}) => {
        this.asyncFetch(value)
       
    }

    onChange = (event) => {
        this.setState({
            value:event.target.value
        })
    }


    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        })
    }

  

    render(){
        const {value,suggestions} = this.state;

        const inputProps = {
            placeholder: 'Enter a movie',
            value,
            onChange: this.onChange
        }
        return (
            <Autosuggest
                suggestions = {suggestions}
                onSuggestionsFetchRequested = {this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested = {this.onSuggestionsClearRequested}
                getSuggestionValue = {getSuggestionValue}
                renderSuggestion = {renderSuggestion}
                inputProps = {inputProps}
                />            
        )
    }
}

export default AddMovieForm;