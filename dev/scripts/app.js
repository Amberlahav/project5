import React from 'react';
import ReactDOM from 'react-dom';
const donuts= ['Sourcream Glazed', 'Honey Dip', 'Boston Cream'];
import Donut from './donut'


class App extends React.Component {
    render() {
      return (
        <div>
          {donuts.map(donut => {
            // map produces a new array with what you are doing with the old array, in this case it's making them a list of h2's
            return (
              // donut represents the value of each iteration
              <Donut donutName={donut}/>
            )
          })}
          <footer>donuts &copy; 2017</footer>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
