import React from 'react';

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

            this.setState({
                dateWatered: dateWatered,
                dateClickedStart: dateClickedStart,
                points

            })
        })
    };
    changePoints() {

        const dbRef = firebase.database().ref(this.props.userKey);

        const timeDifference = Date.now() - this.state.dateClickedStart
        // console.log(timeDifference);
        if (timeDifference < 10000) {
            dbRef.update({ points: this.state.points + 10 })
        } else {
            dbRef.update({ points: this.state.points - 10 })
        }

        const timeDifferenceWatered = Date.now() - timeDifference

        if (timeDifferenceWatered < 10000) {
            dbRef.update({ points: this.state.points - 10 })
        }
        console.trace(this.state.points)
        // dbRef.update({ points: this.state.points + 10 })
        dbRef.update({ dateWatered: Date.now() })
        // if user clicks water me again before 10 seconds have passed, 
        // decrease points by 10

    }
    render() {
        return (
            <section>
                <img src="public/images/plantPlaceholder5.png" alt="placeholder image" />
                {/* <PlantImage /> */}
                <button onClick={this.changePoints}>WATER ME!</button>
                <p>Points:{this.state.points}</p>
            </section>
        )
    }
}

// class PlantImage extends React.Component {

// }

export default PlantPage;