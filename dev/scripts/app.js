import React from 'react';
import ReactDOM from 'react-dom';

var config = {
  apiKey: "AIzaSyAnY0sZu5MdoXZq44UIAMUPXzEFdVlohpw",
  authDomain: "virtual-plant.firebaseapp.com",
  databaseURL: "https://virtual-plant.firebaseio.com",
  projectId: "virtual-plant",
  storageBucket: "",
  messagingSenderId: "1073258773152"
};
firebase.initializeApp(config);

class App extends React.Component {

    render() {
      return (
        <div>
          <Welcome />
        </div>
      )
    }
}

class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      plantName: "",
      points: 50
    }
    this.addUser = this.addUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
   
  }
  componentDidMount() {
    const usersRef = firebase.database().ref();

  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
 
  addUser(e) {
    e.preventDefault();
    const usersItem = {
      userName: this.state.userName,
      plantName: this.state.plantName,
      dateClicked: Date.now(),
      points: 50
    }
   console.log(usersItem);
    const dbRef = firebase.database().ref();
    dbRef.push(usersItem);
    this.setState({
      userName: "",
      plantName: ""
    });
  }

  render() {

    return (

      <form onSubmit={this.addUser}>
        <h1>Welcome to Virtual Plant!</h1>

        <label htmlFor="userName">Enter your name:</label>
        <input type="text" onChange={this.handleChange} value={this.state.userName} name="userName" />

        <label htmlFor="plantName">Choose your plant's name:</label>
        <input type="text" onChange={this.handleChange} value={this.state.plantName} name="plantName" />

        <button type="submit">START</button>
      </form>

        )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
