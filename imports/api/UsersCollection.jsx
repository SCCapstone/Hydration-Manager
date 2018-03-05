import { Mongo } from 'meteor/mongo'

export const UsersCollection = new Mongo.Collection("UsersCollection")

if( Meteor.isServer ){
  Meteor.publish("UsersCollection", function(){
    return UsersCollection.find()
  })

  UsersCollection.allow({
    insert: ()=>{return false},
    update: ()=>{return false},
    remove: ()=>{return false}
  })

  UsersCollection.deny({
    insert: ()=>{return true},
    update: ()=>{return true},
    remove: ()=>{return true}
  })

  Meteor.methods({
    'users.insert': function(newUsers){
      newUsers.createAt = new Date()
      newUsers.createdBy = Meteor.userId()
      newUsers.active = true
      return UsersCollection.insert(newUsers)
    },
    'users.delete':function(usersId){
      return UsersCollection.update({_id:usersId}, {$set:{
        active: false
      }})
    }
  })
}




