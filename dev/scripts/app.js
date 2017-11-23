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
    // const dbRef = firebase.database().ref();

    // dbRef.on("value", (firebaseData) => {
    //   const usersArray = [];
    //   const usersData = firebaseData.val();

    //   for (let userKey in usersData) {
    //     usersData[userKey].key = userKey
    //     usersArray.push(usersData[userKey])
    //   }
    //   this.setState({
    //     key: usersArray
    //   })
    // });
  }
  addUser(user) {

    const usersItem = {
      userName: user.userName,
      plantName: user.plantName,
      points: 50,
      dateClickedStart: Date.now(),
      dateWatered: 0
    }
    // console.log(usersItem);
    const dbRef = firebase.database().ref();
    
    const userKey= dbRef.push(usersItem).getKey();
    console.log(userKey);
  


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
          <PlantPage userPoints={this.state.points} userKey={this.state.key}/>
        </div>
      )
    }
  }


class PlantPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      points: 50,
      key: ''
    }
    this.changePoints = this.changePoints.bind(this);
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    this.setState({
      points: nextProps.userPoints,
      key: nextProps.userKey
    })

  }
  changePoints(){
  
    this.setState({
      points: this.state.points + 10
    });
    const dbRef = firebase.database().ref(this.state.key);
    dbRef.update({ points: this.state.points + 10 })

    const dbWater = firebase.database().ref(this.state.key);
    dbWater.update({ dateWatered: Date.now() })

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
