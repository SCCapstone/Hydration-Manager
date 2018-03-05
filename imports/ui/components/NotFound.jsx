import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotFound extends Component {
  constructor(props){
    super(props)
  }
  getMessage(){
    if(this.props.message)
      return (
        <div>
          <h1>404</h1><h1>{this.props.message}</h1>
        </div>
      )
    else
      return (
        <div>
          <h1>404</h1><h1>Page Not Found</h1>
        </div>
      )
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="mx-auto">
            <center>
              {this.getMessage()}
              <Link to="/login" class="btn btn-lg btm-primary"><i className="fa fa-arrow-left"></i> Back to Login </Link>
            </center>
          </div>
        </div>
      </div>
    )
  }
}

export default NotFound;