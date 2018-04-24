import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

export default class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data :  {
                labels: this.getLabels(),
                datasets: [
                    {
                        label: 'Daily Hydration level',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(255,102,102,.4)',
                        borderColor: 'rgba(255,102,102,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(255,102,102,1)',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(255,102,102,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        data: this.getWeightData()
                    },
                    {
                        label: 'Base Weight',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(0,0,0,1)',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(0,0,0,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        data: this.getBaseWeightData()
                    }
                ]
            }
        }
    }

    getLabels() {
        let athlete = this.props.athlete;
        let labels = [];
        let n = 0;
        if (athlete.postWeightData.length > 7) {
            n = 7;
        }
        else {
            n = athlete.postWeightData.length;
        }
        for (let i = 0; i < n; i++) {
            let now = new Date(athlete.postWeightData[n - 1 - i].date);
            let day = now.getDay();
            let month = (now.getMonth() + 1);
            if (month < 10)
                month = "0" + month;
            if (day < 10)
                day = "0" + day;
            labels[i] = month + '-' + day + '-' + now.getFullYear();
        }
        return labels;
    }
    getWeightData() {
        let athlete = this.props.athlete;
        let data = [];
        let n = 0;
        if (athlete.postWeightData.length > 7) {
            n = 7;
        }
        else {
            n = athlete.postWeightData.length;
        }
        for (let i = 0; i < n; i++) {
            data[i] = athlete.preWeightData[n - 1 - i].weight;
        }
        return data;
    }
    getBaseWeightData(){
        let athlete = this.props.athlete;
        let data = [];
        let n = 0;
        if (athlete.postWeightData.length > 7) {
            n = 7;
        }
        else {
            n = athlete.postWeightData.length;
        }
        for(let i = 0; i < n; i++){
            data[i] = Number.parseFloat(athlete.baseWeight).toPrecision(4);
        }
        return data;
    }

    render() {
        return (
            <div>
                <Line data={this.state.data}/>
            </div>
        );
    }
}