const express = require("express");
const path = require("path");
const fs = require("fs");
const Role = require("../mongo/role");
const Permission = require("../mongo/permission");
const User = require("../mongo/user");
const { getOrSetCache } = require("../middleware/cachedRedis");

/**controller to create structures, levels of units
 * also management of the units/nodes in the structures
 **/

const orgController = {
  //Task 1 : Creating Structures
  //Task 2 : Creating of Levels
  //Task 3 :  Creation of units and level settings
  /***
 * Task 4 :  Transfer and Updates  nodes among predefined nodes 
 *movement of one node to another along the heirachy 
 *depedending on the nodeslevel and structure created a node must be a supervisor there, others can be 
 a member. for example 
 CREATE
 ZONE,
 AREA,
 PARISH,
 UNITS,
 */
};

module.exports = orgController;
