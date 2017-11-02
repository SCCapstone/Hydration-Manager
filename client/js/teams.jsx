import { Mongo } from 'meteor/mongo';

export const Teams = new Mongo.Collection('teams');

/* Teams has the following attributes:
  name: string (dropdown box with list of supported sports)
  season: integer
  athleteList: a list of athlete ids
  id: string(alphanumeric) - assigned to team at creation
  userList: a list of authorized user ids
*/