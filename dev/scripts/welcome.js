import React from 'react';

class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            plantName: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this)
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    submitForm(e) {
        e.preventDefault()
        this.props.submitForm(this.state)
    }
    componentDidMount() {

    }
    render() {

        return (
            <form onSubmit={this.submitForm}>
                <h1>Welcome to Plant Parenthood!</h1>
                <h2>New user?</h2>
                <label htmlFor="userName">Enter your name:</label>
                <input type="text" onChange={this.handleChange} value={this.state.userName} name="userName" />

                <label htmlFor="plantName">Choose your plant's name:</label>
                <input type="text" onChange={this.handleChange} value={this.state.plantName} name="plantName" />

                <button type="submit">GET PLANT</button>
                
            </form>
        )
    }
}

export default Welcome;