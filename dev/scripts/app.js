import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';
import PlantPage from './plantPage.js';

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
  constructor(){
    super();
    this.state = {
      plantList:{},
      userName: "",
      plantName: "",
      points: 50,
      dateWatered: 0,
      dateClickedStart: 0,
      key: ''
    }
    this.addUser = this.addUser.bind(this);
    this.startReturningUser = this.startReturningUser.bind(this);
  }
  componentDidMount() {
    const dbRef = firebase.database().ref();
    
    dbRef.on("value", (snapshot) => {
      let plantList = Object.assign(snapshot.val());
      // console.log(plantList)
      this.setState({
        plantList
      })

      // turn into an array
      // store it inside the state
      // pass it down to the plantList component as a prop
      // let users select their plant
      // based on that, pull up their plant's data and use it for the conditional statements
    })
    
  }
  addUser(user) {

    const usersItem = {
      userName: user.userName,
      plantName: user.plantName,
      points: 50,
      dateClickedStart: Date.now(),
      dateWatered: Date.now(),
      firstWatered: true
    }
    // console.log(usersItem);
    const dbRef = firebase.database().ref();
    // console.trace(usersItem)
    const userKey = dbRef.push(usersItem).getKey();
    // console.log(userKey);
    
    this.setState({
      userName: "",
      plantName: "",
      key: userKey
      // userName: user.userName,
      // plantName: user.plantName
    });
   
  }

  startReturningUser(e) {
    e.preventDefault();
    this.setState({
      key: e.target.id,
    })
    const dbRef = firebase.database().ref(e.target.id);
    dbRef.update({ dateClickedStart: Date.now() })
    
    dbRef.on("value", (snapshot) => {
      let plantName = (snapshot.val().plantName);
      let userName = (snapshot.val().userName)
      // console.log(plantName)

      this.setState({
        plantName,
        userName
      })
    })
      // if (timeDifferenceLastWatered > 10000) {
      //       dbRef.update({ points: this.state.points - 10 })
      //   } 
  }

  render() {
    const plantObject = this.state.plantList
      return (
        <div>
          <Welcome submitForm={this.addUser} />
          {this.state.key ?
            <div>
              {this.state.userName && this.state.plantName ?
              <h3>Welcome back {`${this.state.userName}`}! {`${this.state.plantName}`} is excited to see you!</h3>
                : <h3>your plant is ready to be watered!</h3>}
              <PlantPage userPoints={this.state.points} userKey={this.state.key} />
            </div>
            : <ul>
              <h2>Returning User? Select your plant:</h2>
              {Object.keys(this.state.plantList).map((plant) => {
                return <PlantList plantkey={plant} startReturningUser={this.startReturningUser} plantInfo={plantObject[plant]} />;
              })
              }
            </ul>
          // instead of null, show list of plants (create new component)
          }
        </div>
      )
    }
  }

class PlantList extends React.Component {
    render(){
      let userPlant = this.props.plantInfo
      // console.log(userPlant)
      return (
        <li>
          <button onClick={this.props.startReturningUser} id={this.props.plantkey}>{userPlant.plantName}</button>
        </li>
      )
    }
  }


ReactDOM.render(<App />, document.getElementById('app'));
