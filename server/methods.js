Meteor.methods({
   addTeam(team){
       Teams.insert({
           NameOfTeam: teamName,
           NameOfSport: sportName,
           Season: SeasonYear,
           createdAt: new Date()
       });
   }
});