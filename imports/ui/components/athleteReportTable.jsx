// Package Imports
import React, { Component } from 'react';
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

    getHydration(aDate) {
        preData = this.props.athlete.preWeightData;
        postData = this.props.athlete.postWeightData;
        hydration = null;
        var pre = 0;
        var post = 0;
        for(i = 0; i < preData.length; i++)
        {
            if(preData[i] != undefined)
            {
                if(preData[i].date == aDate)
                {
                    pre = preData[i].weight;
                }
            }
        }
        for(i = 0; i < postData.length; i++)
        {
            if(postData[i] != undefined)
            {
                if(postData[i].date == aDate)
                {
                    post = postData[i].weight;
                }
            }

        }
        if(pre > 0 && post > 0) {
            hydration = (((pre - post)) / pre) * 100;
            if(hydration >= -2 && hydration <=3)
            {
               this.setColor(aDate,'greenStatus');
            }
            else if(hydration >= -4 && hydration <-2)
            {
                //yellow
                this.setColor(aDate,'yellowStatus');
            }
            else if(hydration < -4 || hydration > 3)
            {
                //red
                this.setColor(aDate,'redStatus');
            }
            return hydration;
        }
        else
        {
            return "Please enter missing weight to see hydration status for this day."
        }
    }

    setColor(aDate,aColor) {
        elements = document.getElementsByTagName('tr');
        console.log(aDate);
        for(i=0;i<elements.length;i++)
        {
            console.log(elements[i].keyprop);
            if(elements[i].getAttribute('keyprop') == aDate)
            {
                elements[i].classList.add(aColor);
            }
        }
    }

    render() {
        return(
            <div>
                <Table striped bordered condensed hover responsive>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Weight Loss %</th>
                            <th>PreWeight</th>
                            <th>PostWeight</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.dates.map((date)=><tr key={date} keyprop={date}><td>{date}</td><td>{this.getHydration(date)}</td><td>{this.getDatePreWeight(date)}</td><td>{this.getDatePostWeight(date)}</td></tr>)}
                    </tbody>
                </Table>
            </div>
        )
    }

}