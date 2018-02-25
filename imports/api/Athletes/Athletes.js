// export const Teams = new Mongo.Collection('teams');

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Athletes = new Mongo.Collection('athletes');

export default Athletes;
