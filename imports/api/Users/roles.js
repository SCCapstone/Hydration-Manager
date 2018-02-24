const ROLES = {
  ADMIN: 'ADMIN',    // Administrator - complete access
  PUB: 'PUB',        // Publisher - CRUD data, but No Admin Tasks, e.g. cannot create/authorize new users
  VIEW: 'VIEW',      // Viewer - can only view information
  //WENTER: 'WENTER'   // Weight Entry - only allowed to enter weight data 
};

export default ROLES;
