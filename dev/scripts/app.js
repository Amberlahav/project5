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
      console.log(snapshot.val());
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
      return (
        <div>
          <Welcome submitForm={this.addUser}/>
          {this.state.key ?
          <PlantPage userPoints={this.state.points} userKey={this.state.key}/>
          : null
          // instead of null, show list of plants (create new component)
          }
        </div>
      )
    }
  }

class plantList extends React.Component {

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
  componentWillReceiveProps(nextProps){
    // console.log(nextProps);
    this.setState({
      points: nextProps.userPoints,
      key: nextProps.userKey
    })

  }
  componentDidMount(){

    const dbRef = firebase.database().ref(this.props.userKey);
    

    // const lastWatered = dbRef.snapshot.val();
    dbRef.on("value", (snapshot) => {
      let dateWatered = (snapshot.val().dateWatered);
      let dateClickedStart = (snapshot.val().dateClickedStart);
      // conditional statements:
      // if(dateWatered > dateClickedStart + 10000){
      //     points: this.state.points - 10
      // }
      console.log(this.setState);
      this.setState({
        dateWatered: dateWatered,
        dateClickedStart: dateClickedStart,
        points: snapshot.val().points 
        // console.log(lastWatered)
      })
    })
  };
  changePoints(){

    const dbRef = firebase.database().ref(this.props.userKey);
    
    const timeDifference = Date.now() - this.state.dateClickedStart
   console.log(timeDifference);
    if(timeDifference > 10000) {
      dbRef.update({ points: this.state.points - 10 })
    } else {
      dbRef.update({ points: this.state.points + 10 })
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
