import React from 'react';

class PlantList extends React.Component {
    render() {
        let userPlant = this.props.plantInfo

        return (
            <li>
                <button onClick={this.props.startReturningUser} id={this.props.plantkey}>{userPlant.plantName}</button>
            </li>
        )
    }
}

export default PlantList;