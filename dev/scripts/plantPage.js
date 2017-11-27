import React from 'react';


let firstLoaded = true;

class PlantPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: "",
            plantName: "",
            points: this.getPoints(),
            dateWatered: 0,
            dateClickedStart: 0,
            firstWatered: null,
            key: ''
        }
        this.changePoints = this.changePoints.bind(this);
        this.componentWillReceiveProps.bind(this);
        this.getPoints = this.getPoints.bind(this);
    }
    componentWillReceiveProps(nextProps){

      this.setState({
        userName: nextProps.userName,
        plantName: nextProps.plantName,
        
      })

    }
// method that accesses the user's points from the database using their key, and stroring the value in a function with a return:
getPoints(){
    let points=0;
    const dbRef = firebase.database().ref(this.props.userKey);
    dbRef.on("value", (snapshot) => {
         points = (snapshot.val().points);
    })
    
    return points;
}

    componentDidMount() {

        const dbRef = firebase.database().ref(this.props.userKey);
    //  getting all the information including time stamps, points and whether it was first watered from the database and storing in variables:
        dbRef.on("value", (snapshot) => {
            let dateWatered = (snapshot.val().dateWatered);
            let dateClickedStart = (snapshot.val().dateClickedStart);
            let points = (snapshot.val().points);
 
            let firstWatered = (snapshot.val().firstWatered);
        
            let amountToDecrease = 0;
        // conditional statements that decrease the points depending on how much time passed between when the user last watered their plant and when they clicked start again:
            if (firstLoaded){
           
                const timeDifferenceLastWatered = dateClickedStart - dateWatered

                firstLoaded= false;
                
                if (timeDifferenceLastWatered > 100000) {
                    amountToDecrease = 100;
                }
                else if (timeDifferenceLastWatered > 90000) {
                    amountToDecrease = 90;
                }
                else if (timeDifferenceLastWatered > 80000) {
                    amountToDecrease = 80;
                }
                else if (timeDifferenceLastWatered > 70000) {
                    amountToDecrease = 70;
                }
                else if (timeDifferenceLastWatered > 60000) {
                    amountToDecrease = 60;
                }
                else if (timeDifferenceLastWatered > 50000) {
                    amountToDecrease = 50;
                }
                else if (timeDifferenceLastWatered > 40000) {
                    amountToDecrease = 40;
                }
                else if (timeDifferenceLastWatered > 30000) {
                    amountToDecrease = 30;
                }
                else if (timeDifferenceLastWatered > 20000) {
                    amountToDecrease = 20;
                }
                else if (timeDifferenceLastWatered > 10000) {
                    amountToDecrease = 10;
                }
            
            // updating the points in the database:
                dbRef.update({ points: this.state.points - amountToDecrease })                
            }
            this.setState({
                dateWatered: dateWatered,
                dateClickedStart: dateClickedStart,
                points: this.state.points - amountToDecrease,
                firstWatered
            })
        })
    };
    // method that either increases or decreases the user's points based on whether or not they water the plant within the given threshold of time: 
    changePoints() {

        const dbRef = firebase.database().ref(this.props.userKey);

        const timeDifference = Date.now() - this.state.dateWatered
       
        let pointsChange = 0;
        // firstWatered starts off as true automatically, until the user clicks the first time, then it gets set to false
        // first time a user waters their plant when they first get it, points go up. if they water it again before 10 seconds have passed, points go down.
        if (this.state.firstWatered) {
            pointsChange = 10;
            dbRef.update({ firstWatered: false })
           
        } 
        // when user clicks their plant again from the plant list and water it before 10 seconds have passed since the last time they watered it, points go down.
        else if(!this.state.firstWatered&&timeDifference<10000){
            pointsChange=-10;
          
        
        // if the user selects their plant from the plant list and water it after 10 seconds have passed, points go up.  
        }
        else if(!this.state.firstWatered&&timeDifference>10000){
            pointsChange=10;
         
            
        }
        else {
            
        }
        // updating the points and logging the time in the database and setting the state:
        dbRef.update({ points: this.state.points + pointsChange })
       
        dbRef.update({ dateWatered: Date.now() })
        
        this.setState({
            firstWatered: false,
            points: this.state.points + pointsChange
            
            
        })

    }
    render() {
        // conditional rendering based on if the user reached 0 or 100 points, and displaying specific sentences if they did, else display their points and the water me button:
        let show = null;
        if (this.state.points <= 0){
            show = <p className="points">Woah there.. looks like you're not be ready to take care of a plant right now. That's okay, you can always come back later and try again with a new plant.</p>
        } else if (this.state.points === 100) {
            show = <p className="points">Great job! You are now ready to be a plant parent!</p>
        } else {
            show = (
                <div className="waterMe">
                    <button onClick={this.changePoints}>WATER ME!</button>
                    <p className="points">Points:{this.state.points}</p>
                </div>
            )
        }
        // more conditional rendering that changes the image based on the amount of points:
        let showImage = null;
        if (this.state.points === 100) {
            showImage = <img src="public/images/plantImage10.svg" alt="placeholder image" />
        } else if (this.state.points === 90) {
            showImage = <img src="public/images/plantImage9.svg" alt="placeholder image" />
        } else if (this.state.points === 80) {
            showImage = <img src="public/images/plantImage8.svg" alt="placeholder image" />
        } else if (this.state.points === 70) {
            showImage = <img src="public/images/plantImage7.svg" alt="placeholder image" />
        } else if (this.state.points === 60) {
            showImage = <img src="public/images/plantImage6.svg" alt="placeholder image" />
        } else if (this.state.points === 50) {
            showImage = <img src="public/images/plantImage5.svg" alt="placeholder image" />
        } else if (this.state.points === 40) {
            showImage = <img src="public/images/plantImage4.svg" alt="placeholder image" />
        } else if (this.state.points === 30) {
            showImage = <img src="public/images/plantImage3.svg" alt="placeholder image" />
        } else if (this.state.points === 20) {
            showImage = <img src="public/images/plantImage2.svg" alt="placeholder image" />
        } else if (this.state.points === 10) {
            showImage = <img src="public/images/plantImage1.svg" alt="placeholder image" />
        } else if (this.state.points <= 0) {
            showImage = <img src="public/images/plantImage0.svg" alt="placeholder image" />
        }

        return (
            <section>
                {show}
                <div className="imageContainer">{showImage}</div>
            </section>
        )
    }
}


export default PlantPage;