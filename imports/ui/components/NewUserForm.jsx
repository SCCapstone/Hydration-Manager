import React, {Component} from 'react';

export default  class NewUserForm extends Component {

    addUser(event){
        event.preventDefault();
        var text = this.ref.resolution.value.trim();

        Users.insert({
            text: text,
            createdAt: new Date()
        })
    }
    render() {(
        <form className="new-user" onSubmit={this.addUser.bind(this)}>
            <input type="text" ref="user" placeholder="Username" />
        </form>
    )}

}