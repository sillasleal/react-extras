import React, { Component } from 'react';
import './App.css';
/**/
import MapTrack from './components/MapTrack/MapTrack';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carPosition: null
        };
    }

    componentDidMount() {
        setTimeout(() => this.setState({
                carPosition: {lat: -8.0871379, lng: -34.8864042}
            }), 1000);
        setTimeout(() => this.setState({
                carPosition: {lat: -8.0897253, lng: -34.8862729}
            }), 30000);
    }

    render() {
        const destiny = {lat: -8.0990997, lng: -34.8867325};
        /**/
        return (
                <div className="App">
                    <MapTrack 
                        centerHere 
                        googleMapsKey="AIzaSyAzOpUT193DQpsR2xGjwvchvnjTicpMGJI" 
                        width="99%"
                        height="98vh"
                        destiny={destiny}
                        lineRoute="blue"
                        infoWindow="<div>OK</div>"
                        distanceToArrive={50}
                        onArrive={() => alert('chegou')}
                        carPosition={this.state.carPosition}
                        destinyTitle="Minha casa minha vida"
                        zoom={19}/>
                </div>
                );
    }
}

export default App;
