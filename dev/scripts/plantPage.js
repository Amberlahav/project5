import React from 'react';


let firstLoaded = true;
// let firstWatered;
class PlantPage extends React.Component {
    constructor(props) {
        super(props)
        // let temp = (snapshot.val().points);
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
        // points: nextProps.points
      })

    }

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
     
        dbRef.on("value", (snapshot) => {
            let dateWatered = (snapshot.val().dateWatered);
            let dateClickedStart = (snapshot.val().dateClickedStart);
            let points = (snapshot.val().points);
 
            let firstWatered = (snapshot.val().firstWatered);
      

            let amountToDecrease = 0;

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
    changePoints() {

        const dbRef = firebase.database().ref(this.props.userKey);

        const timeDifference = Date.now() - this.state.dateWatered
       
        let pointsChange = 0;
        if (this.state.firstWatered) {
            pointsChange = 10;
            dbRef.update({ firstWatered: false })
           
        } 
        else if(!this.state.firstWatered&&timeDifference<10000){
            pointsChange=-10;
          
          
          
        }
        else if(!this.state.firstWatered&&timeDifference>10000){
            pointsChange=10;
         
            
            
        }
        else {
            
        }
        dbRef.update({ points: this.state.points + pointsChange })
        // dbRef.update({ points: this.state.points + 10 })
        dbRef.update({ dateWatered: Date.now() })
        // dbRef.update({ firstWatered: false })
        
        // if user clicks water me again before 10 seconds have passed, 
        // decrease points by 10
        this.setState({
            firstWatered: false,
            points: this.state.points + pointsChange
            
            
        })

    }
    render() {
        
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