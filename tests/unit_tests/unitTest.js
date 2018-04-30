import React, {Component} from 'react';


export default class unitTest extends Component {
    sum(number1, number2) {
        return number1 + number2;
    }

    render() {
        return (
            < div >
            {this.sum(this.props.num1, this.props.num2)
    }
    <
        /div>
    )
        ;
    }
}