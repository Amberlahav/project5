import React from 'react';

class Donut extends React.Component {
    render(){
        return (
            <h2>{this.props.donutName}</h2>
        )
    }
}

export default Donut;