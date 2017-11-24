import React from 'react';


let firstLoaded = true;
class PlantPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            points: 50,
            dateWatered: 0,
            dateClickedStart: 0,
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
    componentDidMount() {

        const dbRef = firebase.database().ref(this.props.userKey);

        // const lastWatered = dbRef.snapshot.val();
        dbRef.on("value", (snapshot) => {
            let dateWatered = (snapshot.val().dateWatered);
            let dateClickedStart = (snapshot.val().dateClickedStart);
            let points = (snapshot.val().points);

            let amountToDecrease = 0;
            if (firstLoaded){
                // do the calculation
                const timeDifferenceLastWatered = dateClickedStart - dateWatered

                firstLoaded = false
                if (timeDifferenceLastWatered > 10000) {
                    amountToDecrease = 10;
                    // dbRef.update({ points: this.state.points - 10 })
                } 
                if (timeDifferenceLastWatered > 20000) {
                    amountToDecrease = 20;
                }
                if (timeDifferenceLastWatered > 30000) {
                    amountToDecrease = 30;
                }
                if (timeDifferenceLastWatered > 40000) {
                    amountToDecrease = 40;
                }
                if (timeDifferenceLastWatered > 50000) {
                    amountToDecrease = 50;
                }
                if (timeDifferenceLastWatered > 60000) {
                    amountToDecrease = 60;
                }
                if (timeDifferenceLastWatered > 70000) {
                    amountToDecrease = 70;
                }
                if (timeDifferenceLastWatered > 80000) {
                    amountToDecrease = 80;
                }
                if (timeDifferenceLastWatered > 90000) {
                    amountToDecrease = 90;
                }
                if (timeDifferenceLastWatered > 100000) {
                    amountToDecrease = 100;
                }
                console.log(timeDifferenceLastWatered)
                
                dbRef.update({ points: this.state.points - amountToDecrease })                
            
            }
            this.setState({
                dateWatered: dateWatered,
                dateClickedStart: dateClickedStart,
                points: this.state.points - amountToDecrease
            })
        })
    };
    changePoints() {

        const dbRef = firebase.database().ref(this.props.userKey);

        const timeDifference = Date.now() - this.state.dateWatered
        // console.log(timeDifference);
        let pointsChange = 0;
        if (timeDifference > 10000) {
            pointsChange = 10
        } else {
            pointsChange = -10
        }

        dbRef.update({ points: this.state.points + pointsChange })
        // dbRef.update({ points: this.state.points + 10 })
        dbRef.update({ dateWatered: Date.now() })
        // if user clicks water me again before 10 seconds have passed, 
        // decrease points by 10
        this.setState({
            points: this.state.points + pointsChange
        })

    }
    render() {
        
        let show = null;
        if (this.state.points <= 0){
            show = <p>You lose!!</p>
        } else if (this.state.points > 100) {
            show = <p>You win!!</p>
        } else {
            show = (
                <div>
                    <button onClick={this.changePoints}>WATER ME!</button>
                    <p>Points:{this.state.points}</p>
                </div>
            )
        }

       

        return (
            <section>
                {/* <h3>Hello, {this.state.userName}, {this.state.plantName} is excited to see you!</h3> */}
            <img src="public/images/plantPlaceholder5.png" alt="placeholder image" />
                {/* <PlantImage /> */}
            {show}
            </section>
        )
    }
}

// class PlantImage extends React.Component {

// }

export default PlantPage;