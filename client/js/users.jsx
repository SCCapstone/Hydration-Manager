import { Mongo } from 'meteor/mongo';

export const Users = new Mongo.Collection('users');

/* User has the following attributes:
  emailAddress : string - must be a valid email type
  phoneNumber: string - must be a valid phone number type
  password: string
  id: string(alphanumeric) - assigned to user at creation
  teamList: a list of team ids
  adminStatus: boolean
*/