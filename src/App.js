import React, {Component} from 'react';

import Location from './components/Location';
import Roju from './components/Date';
import Temperature from './components/Temperature';
import './index.css';

const baseURL = "https://api.openweathermap.org/data/2.5/";

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
         data:{},
         cityName: "",
         hasError: false
    }
}

showAlert = (msg) => {

  const div = document.createElement('div');
  div.classList = "show-alert";
  const text = document.createTextNode(msg);
  div.appendChild(text);
  const parent = document.querySelector('.app');
  const insertBeforeEl = document.querySelector('form');
  parent.insertBefore(div, insertBeforeEl);

  setTimeout( () => {
    document.querySelector('.show-alert').remove();
  }, 3000);

   this.setState( {
     cityName: ""
   } ); 
}

handleSubmit = (e) => {
  e.preventDefault();
  const city = e.target.firstChild.value;
  
  if(city === "") {
    return;
  } else {
    this.setState( {
      cityName: city
    } )

   //check if the city name is valid
   let items;
    fetch(`${baseURL}weather?q=${this.state.cityName}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
   .then( (response) => {
     if(response.ok) {
       return response.json();
     }else {
       this.setState( {
         hasError: true
       } );
        this.showAlert("Make sure you enter valid place");
        return Promise.reject(response);
     }
   } )
    //render if cityname is valid
   .then( data => {
     items= data;
     return fetch(`${baseURL}weather?q=${data.name}&units=metric&appid=${process.env.REACT_APP_API_KEY}`);
   } )
   .then( res => {
     this.setState( {
       data: items,
       cityName: "",
       hasError: false
     } );
   } )
   .catch( err => console.log(err) );
  } 
}

handleChange = (e) => {
  this.setState( {
      [e.target.name]: e.target.value 
  } );
}

  render() {
    const res = this.state.data;
    return (
      <div className={((typeof(res.main) === "undefined") || this.state.hasError) ? 
         'app' : ((res.main.temp > 16) ? 'app warm' : 'app cold')     
      }>
                <form onSubmit={this.handleSubmit} className="form">
                    <input 
                    type="text"
                    autoComplete="off"
                    placeholder="Search.."
                    name="cityName"
                    value={this.state.cityName}
                    onChange={this.handleChange}
                    className="searchInp"
                    />
                </form>
            {
              (Object.keys(res).length === 0 || this.state.hasError) ? 
              "" :
              <>
                <Location name={res.name}
                country={res.sys.country}
                />
                <Roju />
                <Temperature temp={res} />
              </>
            }       
      </div>
    );
  }
}

export default App;
