
import { Mongo } from 'meteor/mongo';

export const Athletes = new Mongo.Collection('athletes');

/* Athlete has the following attributes:
  name: firstName + lastName (string concatenation)
    name.first: string
    name.last: string
  baseLineWeight: double
  height: double
  id: string(alphanumeric) - assigned to athlete at creation
  teamList: a list of team ids
  weightMap: dictionary -
    key: date: date
    data: preWeight, postWeight
      preWeight: double
      postWeight: double
*/