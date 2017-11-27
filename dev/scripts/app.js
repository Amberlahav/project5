import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome.js';
import PlantPage from './plantPage.js';
import PlantList from './plantList.js'
import Scroll from 'react-scroll'; 

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
      key: '',
      showPopup: false
    }
    this.addUser = this.addUser.bind(this);
    this.startReturningUser = this.startReturningUser.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
  }
  componentDidMount() {
    const dbRef = firebase.database().ref();
    // accessing the information from firebase:
    dbRef.on("value", (snapshot) => {
      let plantList = Object.assign(snapshot.val());

      this.setState({
        plantList
      })

    })
    
  }
  // method for when a user clicks "get plant" (pushes their information to firebase):
  addUser(user) {

    const usersItem = {
      userName: user.userName,
      plantName: user.plantName,
      points: 50,
      dateClickedStart: Date.now(),
      dateWatered: Date.now(),
      firstWatered: true
    }

    const dbRef = firebase.database().ref();
//  pushing the infor and getting the key:
    const userKey = dbRef.push(usersItem).getKey();

    
    this.setState({
      userName: "",
      plantName: "",
      key: userKey

    });
   
  }
// method for when a user clicks their plant's name through the list, that records the time they clicked it and pulls up their plant info using their key:
  startReturningUser(e) {
    e.preventDefault();
    this.setState({
      key: e.target.id,
    })
    const dbRef = firebase.database().ref(e.target.id);
    dbRef.update({ dateClickedStart: Date.now() })
    
    dbRef.on("value", (snapshot) => {
      let plantName = (snapshot.val().plantName);
      let userName = (snapshot.val().userName);
      let points = (snapshot.val().points);
      
      this.setState({
        plantName,
        userName,
        points

      })
    })

  }
  // method for instruction popup modal:
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    const plantObject = this.state.plantList
      return (
          <div className="mainApp">
            <header>
              <h1>Plant Parenthood</h1>
              {/* popup trigger button: */}
              <button onClick={this.togglePopup}><p className="instructions">Instructions</p></button>
            </header>
            {this.state.showPopup ?
            // instruction information inside popup modal:
              <Popup className="popUp"
                text='Begin by typing in your user name and choosing a name for your new plant. Click "GET PLANT" to start your plant growing journey. Your plant starts off with 50 points. Every time you water your plant, you will receive 10 points and your plant will grow! You must remember to water your plant once every 24 hours so your plant can grow and flourish. If you water your plant more than once before 24 hours have passed, you will lose 10 points for every click and your plant will start to decay. Also, if you forget to water your plant after 48 hours have passed, you will lose 10 points for each day that passes and your plant will start to decay. When your points reach zero, the game will end. When your points reach 100, your plant is fully grown and you are ready to be a plant parent! '
                closePopup={this.togglePopup.bind(this)}
              />
              : null
            }
            {<Welcome className="welcome" submitForm={this.addUser} />}
            {/* conditional render, if the user inputs their info which pushes to the db and gets a key, then render the plant page, else render the plant list: */}
            {this.state.key ?
              <div className="plantPage">
                {/* conditional render, if the user selects their plant from the list (meaning there is a name and plant name to be chosen), display this welcome message, else display other message: */}
                {this.state.userName && this.state.plantName ?
                <h3>Welcome back {`${this.state.userName}`}, {`${this.state.plantName}`} has been waiting to see you!</h3>
                  : <h3>Your plant is ready to be watered!</h3>}
                {<PlantPage userPoints={this.state.points} userKey={this.state.key} />}
              </div>
              : <section className="plantList">
              <h2>Returning User? Select your plant:</h2>
                <ul>
                  {/* turning the object into an aray to map through so we can get the information back: */}
                {Object.keys(this.state.plantList).map((plant) => {
                  return <PlantList plantkey={plant} startReturningUser={this.startReturningUser} plantInfo={plantObject[plant]} />;
                })}
              </ul></section>
            }

            </div>


      )
    }
  }

class Popup extends React.Component  {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          {<p>{this.props.text}</p>}
          <button onClick={this.props.closePopup}>Close</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
