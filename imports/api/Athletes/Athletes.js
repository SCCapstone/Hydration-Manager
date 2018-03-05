// Package Imports
import { Mongo } from 'meteor/mongo';
/*import SimpleSchema from 'simpl-schema';*/
// Custom File Imports


const Athletes = new Mongo.Collection('athletes');
export default Athletes;

/*
Athletes.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});


Athletes.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

Athletes.schema = new SimpleSchema({
    name: {
        type: String,
        label: 'Name of the team',
    },
    baseWeight: {
        type: Number,
        label: 'Default Weight of Athlete',
    },
    height: {
        type: Number,
        label: 'Default Height of Athlete',
    },
    teamId: {
        type: String,
        label: 'The ID of the team that the Athlete belongs to.',
    },
    createdAt: {
        type: Date,
        label: 'The date the Athlete was created.',
    },
    preWeightData: {
        type: Array,
        label: 'PreWeights of the Athlete',
    },
    postWeightData: {
        type: Array,
        label: 'PostWeights of the Athlete'
    }
});
*/
