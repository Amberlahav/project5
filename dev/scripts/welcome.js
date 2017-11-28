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
    // componentDidMount() {

    // }
    render() {

        return (
            <section className="welcome wrapper"> 
 
            <form onSubmit={this.submitForm} className="clearfix">
                    <h2>New user?</h2>
                <div className="inputs clearfix">
                    <div className="userName">
                        <label htmlFor="userName">Enter your name:</label>
                        <input type="text" onChange={this.handleChange} value={this.state.userName} name="userName" />
                    </div>

                    <div className="plantName">
                        <label htmlFor="plantName">Choose your plant's name:</label>
                        <input type="text" onChange={this.handleChange} value={this.state.plantName} name="plantName" />
                    </div>
              
                <button className="submit" type="submit">GET PLANT</button>
                </div>
               
            </form>
            </section>
        )
    }
}

export default Welcome;