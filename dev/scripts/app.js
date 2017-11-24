import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';

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
      key: ''
    }
    this.addUser = this.addUser.bind(this);
  }
  componentDidMount() {
    const dbRef = firebase.database().ref();
    
    dbRef.on("value", (snapshot) => {
      let plantList = Object.assign(snapshot.val());
      console.log(plantList)
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
      dateWatered: Date.now()
    }
    // console.log(usersItem);
    const dbRef = firebase.database().ref();
    // console.trace(usersItem)
    const userKey = dbRef.push(usersItem).getKey();
    
    this.setState({
      userName: "",
      plantName: "",
      key: userKey
      // userName: user.userName,
      // plantName: user.plantName
    });
    
  }

  render() {
    const plantObject = this.state.plantList
      return (
        <div>
          <Welcome submitForm={this.addUser}/>
          
          {this.state.key ?
          <PlantPage userPoints={this.state.points} userKey={this.state.key}/>
            : 
            <ul>
              <h2>Returning User? Select your plant:</h2>
            {Object.keys(this.state.plantList).map((plant) => {
                return <PlantList plantInfo={plantObject[plant]} />;
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
      console.log(userPlant)
      return (
        <li>
          <button>{userPlant.plantName}</button>
        </li>
      )
    }
  }

class PlantPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      points: 50,
      dateWatered: 0,
      dateClickedStart:0,
      key: ''
    }
    this.changePoints = this.changePoints.bind(this);
  }
  // componentWillReceiveProps(nextProps){
  //   // console.log(nextProps);
  //   this.setState({
  //     points: nextProps.userPoints,
  //     key: nextProps.userKey
  //   })

  // }
  componentDidMount(){

    const dbRef = firebase.database().ref(this.props.userKey);
    

    // const lastWatered = dbRef.snapshot.val();
    dbRef.on("value", (snapshot) => {
      let dateWatered = (snapshot.val().dateWatered);
      let dateClickedStart = (snapshot.val().dateClickedStart);
      let points = (snapshot.val().points);

      this.setState({
        dateWatered: dateWatered,
        dateClickedStart: dateClickedStart,
        points

      })
    })
  };
  changePoints(){

    const dbRef = firebase.database().ref(this.props.userKey);
    
    const timeDifference = Date.now() - this.state.dateClickedStart
    console.log(timeDifference);
    if(timeDifference > 10000) {
      dbRef.update({ points: this.state.points + 10 })
    } else {
      dbRef.update({ points: this.state.points - 10 })
    }
   
    // dbRef.update({ points: this.state.points + 10 })
    dbRef.update({ dateWatered: Date.now() })
   
  
          // if user clicks water me again before 10 seconds have passed, 
    // decrease points by 10


  }

  render(){
    return(
      <section>
        <img src="public/images/plantPlaceholder5.png" alt="placeholder image"/>
        <button onClick={this.changePoints}>WATER ME!</button>
        <p>Points:{this.state.points}</p>
      </section>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
