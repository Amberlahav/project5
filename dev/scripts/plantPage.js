import React from 'react';


let firstLoaded = true;
// let firstWatered;
class PlantPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: "",
            plantName: "",
            points: 50,
            dateWatered: 0,
            dateClickedStart: 0,
            firstWatered: null,
            key: ''
        }
        this.changePoints = this.changePoints.bind(this);
        this.componentWillReceiveProps.bind(this);
    }
    componentWillReceiveProps(nextProps){
    //   console.log(nextProps);
      this.setState({
        userName: nextProps.userName,
        plantName: nextProps.plantName
      })

    }

    componentDidMount() {

        const dbRef = firebase.database().ref(this.props.userKey);
     
        dbRef.on("value", (snapshot) => {
            let dateWatered = (snapshot.val().dateWatered);
            let dateClickedStart = (snapshot.val().dateClickedStart);
            let points = (snapshot.val().points);
            console.log("ccurreent: "+points);
            let firstWatered = (snapshot.val().firstWatered);
            console.log(firstWatered)
            let amountToDecrease = 0;

            if (firstLoaded){
           
                const timeDifferenceLastWatered = dateClickedStart - dateWatered

                firstLoaded= false;
                
                if (timeDifferenceLastWatered > 10000) {
                    amountToDecrease = 10;
                }
                else if (timeDifferenceLastWatered > 20000) {
                    amountToDecrease = 20;
                }
                else if (timeDifferenceLastWatered > 30000) {
                    amountToDecrease = 30;
                }
                else if (timeDifferenceLastWatered > 40000) {
                    amountToDecrease = 40;
                }
                else if (timeDifferenceLastWatered > 50000) {
                    amountToDecrease = 50;
                }
                else if (timeDifferenceLastWatered > 60000) {
                    amountToDecrease = 60;
                }
                else if (timeDifferenceLastWatered > 70000) {
                    amountToDecrease = 70;
                }
                else if (timeDifferenceLastWatered > 80000) {
                    amountToDecrease = 80;
                }
                else if (timeDifferenceLastWatered > 90000) {
                    amountToDecrease = 90;
                }
                else if (timeDifferenceLastWatered > 100000) {
                    amountToDecrease = 100;
                }
                console.log(timeDifferenceLastWatered)
                
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
        // console.log(timeDifference);
        let pointsChange = 0;
        if (this.state.firstWatered) {
            pointsChange = 10;
            dbRef.update({ firstWatered: false })
            // console.log("In if: " +this.state.firstWatered)
            console.log("In if2: " + this.state.firstWatered)
            console.log("first if statement");
        } 
        else if(!this.state.firstWatered&&timeDifference<10000){
            pointsChange=-10;
          
            // console.log("In if2: " + this.state.firstWatered)
            // console.log("In if: " + firstWatered)
            console.log("2nd if statement");
          
        }
        else if(!this.state.firstWatered&&timeDifference>10000){
            pointsChange=10;
         
            // console.log("In if2: " + this.state.firstWatered)
            console.log("In if: " + firstWatered)
            console.log("third if statement");
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
            points: this.state.points + pointsChange,
            firstWatered: false
            
        })

    }
    render() {
        
        let show = null;
        if (this.state.points <= 0){
            show = <p>You lose!!</p>
        } else if (this.state.points >= 100) {
            show = <p>You win!!</p>
        } else {
            show = (
                <div>
                    <button onClick={this.changePoints}>WATER ME!</button>
                    <p>Points:{this.state.points}</p>
                </div>
            )
        }
        let showImage = null;
        if (this.state.points === 100) {
            showImage = <img src="public/images/plantPlaceholder10.png" alt="placeholder image" />
        } else if (this.state.points === 90) {
            showImage = <img src="public/images/plantPlaceholder9.png" alt="placeholder image" />
        } else if (this.state.points === 80) {
            showImage = <img src="public/images/plantPlaceholder8.png" alt="placeholder image" />
        } else if (this.state.points === 70) {
            showImage = <img src="public/images/plantPlaceholder7.png" alt="placeholder image" />
        } else if (this.state.points === 60) {
            showImage = <img src="public/images/plantPlaceholder6.png" alt="placeholder image" />
        } else if (this.state.points === 50) {
            showImage = <img src="public/images/plantPlaceholder5.png" alt="placeholder image" />
        } else if (this.state.points === 40) {
            showImage = <img src="public/images/plantPlaceholder4.png" alt="placeholder image" />
        } else if (this.state.points === 30) {
            showImage = <img src="public/images/plantPlaceholder3.png" alt="placeholder image" />
        } else if (this.state.points === 20) {
            showImage = <img src="public/images/plantPlaceholder2.png" alt="placeholder image" />
        } else if (this.state.points === 10) {
            showImage = <img src="public/images/plantPlaceholder1.png" alt="placeholder image" />
        } else if (this.state.points <= 0) {
            showImage = <img src="public/images/plantPlaceholder0.png" alt="placeholder image" />
        }

        return (
            <section>

            {showImage}
            {show}
            
            </section>
        )
    }
}


export default PlantPage;