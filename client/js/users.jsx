import { Meteor } from 'meteor/meteor';
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
Users.schema = new SimpleSchema({
    // Found these regex's online via stack overflow, googling: regex javascript email
    // and regex javascript phonenumber
  emailAddress: { $regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ } ,
  phoneNumber: { $regex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im },
  password: { $type: "string" },
});

/*
validator:{ $or:
    [
      {emailAddress: { $regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ } },
      {phoneNumber: { $regex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im } },
      {password: { $type: "string" } },
    ]
}
*/