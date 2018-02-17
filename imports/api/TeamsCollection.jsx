import { Mongo } from 'meteor/mongo'

export const TeamsCollection = new Mongo.Collection("TeamsCollection")

if( Meteor.isServer ){
  Meteor.publish("TeamsCollection", function(){
    return TeamsCollection.find()
  })

  TeamsCollection.allow({
    insert: ()=>{return false},
    update: ()=>{return false},
    remove: ()=>{return false}
  })

  TeamsCollection.deny({
    insert: ()=>{return true},
    update: ()=>{return true},
    remove: ()=>{return true}
  })

  Meteor.methods({
    'teams.insert': function(newTeams){
      newTeams.createAt = new Date()
      newTeams.createdBy = Meteor.userId()
      newTeams.active = true
      return TeamsCollection.insert(newTeams)
    },
    'teams.delete':function(teamsId){
      return TeamsCollection.update({_id:teamsId}, {$set:{
        active: false
      }})
    }
  })
}




