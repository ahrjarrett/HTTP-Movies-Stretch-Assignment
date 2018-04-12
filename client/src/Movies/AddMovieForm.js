import React from 'react';
import axios from 'axios';

class AddMovieForm extends React.Component{
    constructor(){
        super();
        this.state = {
            title: '',
            metascore: '',
            stars: '',
            director: ''
        }
    }

    

    handleOnSubmit  = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3333/api/movies',{
            title:this.state.title,
            metascore: parseInt(this.state.metascore),
            stars: this.state.stars.split(','),
            director: this.state.director
        })
        .then(() => {
            window.location = '/'
        })
    }

    handleInputChange = e => {
       
        const {target}  = e
        let obj = {}
        obj[target.name] = target.value
        console.log(obj)
        this.setState(obj)
    }


    render(){
        return (
            <div>
                <form id = "addMovie" onSubmit = {this.handleOnSubmit}>
                <input onChange = {this.handleInputChange} value = {this.state.title} type = "text" name = "title" placeholder = "title"/>
                <input onChange = {this.handleInputChange} value = {this.state.metascore} type = "text" name = "metascore" placeholder = "metascore"/>
                <input onChange = {this.handleInputChange} value = {this.state.stars} type = "text" name = "stars" placeholder = "stars - separate by value"/>
                <input onChange = {this.handleInputChange} value = {this.state.director} type = "text" name = "director" placeholder = "director"/>
                <button type ="submit" form ="addMovie">Send</button>
                </form>
            </div>
        )
    }
}

export default AddMovieForm;