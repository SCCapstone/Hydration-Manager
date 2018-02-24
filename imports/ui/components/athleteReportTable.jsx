import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

export default class AthleteReportTable extends Component{

    constructor(props){
        super(props);
        this.state = {
            dates : [],
        };
        this.getListofDates = this.getListofDates.bind(this);
        this.getDatePreWeight = this.getDatePreWeight.bind(this);
        this.getDatePostWeight = this.getDatePostWeight.bind(this);
    }

    componentDidMount() {
        this.getListofDates();
    }

    getListofDates() {
        curAthlete = this.props.athlete;
        curDates = [];
        for(i = 0; i < curAthlete.preWeightData.length; i++)
        {
            curDates.push(curAthlete.preWeightData[i].date);
        }
        for(i=0; i< curAthlete.postWeightData.length; i++)
        {
            if(curDates.indexOf(curAthlete.postWeightData[i].date) == -1) {
                curDates.push(curAthlete.postWeightData[i].date);
            }
        }
        curDates.sort().reverse();
        this.setState(
            {
                dates : curDates
            });
    }

    getDatePreWeight(aDate) {
        preData = this.props.athlete.preWeightData;
        for(i = 0; i < preData.length; i++)
        {
            if(preData[i].date == aDate)
            {
                return preData[i].weight;
            }
        }
    }
    getDatePostWeight(aDate) {
        postData = this.props.athlete.postWeightData;
        for(i = 0; i < postData.length; i++)
        {
            if(postData[i].date == aDate)
            {
                return postData[i].weight;
            }
        }
    }

    render() {
        return(
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>PreWeight</th>
                            <th>PostWeight</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.dates.map((date)=><tr><td>{date}</td><td>{this.getDatePreWeight(date)}</td><td>{this.getDatePostWeight(date)}</td></tr>)}
                    </tbody>
                </Table>
            </div>
        )
    }

}