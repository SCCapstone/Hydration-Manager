
export const SiteUser = new Mongo.Collection('siteuser');

{/* NOTE: where attemping to use the newly created database,
    add the following import statement:

    import {SiteUser} from '../../api/users.jsx'

    |--> using correct directory hierarchy (instead of above), then
         can reference 'SiteUser' e.g. SiteUser.insert({})          -- Jacob
*/}

export const CurrentUser = new Mongo.Collection('currentUser');
