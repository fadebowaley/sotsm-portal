const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const Role = require("../mongo/role");
const Permission = require("../mongo/permission");
const User = require("../mongo/user");
const Church = require("../models/church");
const { getOrSetCache } = require("../middleware/cachedRedis");
const saltRounds = 10;


  const adminController = {
    // Controller to get all users
    getUsers: (req, res) => {
      const currentUser = req.user;
      res.render("admin/user-settings/userlist", {
        users: [], // Placeholder for users, will be populated by the fetch route
        currentUser,
        pageName: "User Management",
      });
    },

    // Controller to fetch all users
    getFetchUsers: async (req, res) => {
      try {
        const cacheKey = "users:all";
        // Use the cache function to get users
        const users = await getOrSetCache(cacheKey, async () => User.find({}));
        res.json(users); // Respond with users in JSON format
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users" });
      }
    },

    // Controller to create a new user
    createUser: async (req, res) => {
      try {
        const { title, firstname, surname, email, phonenumber } = req.body;
        const defaultPassword = "defaultPassword"; // This can be changed later
        const hashedPassword = await bcrypt.hash(defaultPassword, saltRounds);
        const newUser = await User.create({
          title,
          firstname,
          surname,
          email,
          phonenumber,
          password: hashedPassword,
        });
        req.flash("success", "User created successfully");
        res.redirect("/admin/users");
      } catch (err) {
        console.error(err);
        req.flash("error", "Failed to create user");
        res.redirect("/admin/users");
      }
    },

    // Controller to update an existing user
    updateUser: async (req, res) => {
      try {
        const { id, title, firstname, surname, email, phonenumber } = req.body;
        const user = await User.findByPk(id);
        if (user) {
          user.title = title;
          user.firstname = firstname;
          user.surname = surname;
          user.email = email;
          user.phonenumber = phonenumber;
          await user.save();
          req.flash("success", "User updated successfully");
        } else {
          req.flash("error", "User not found");
        }
        res.redirect("/admin/users");
      } catch (err) {
        console.error(err);
        req.flash("error", "Failed to update user");
        res.redirect("/admin/users");
      }
    },

    // Controller to delete a user
    deleteUser: async (req, res) => {
      try {
        const { id } = req.params;
        await User.destroy({ where: { id } });
        req.flash("success", "User deleted successfully");
        res.redirect("/admin/users");
      } catch (err) {
        console.error(err);
        req.flash("error", "Failed to delete user");
        res.redirect("/admin/users");
      }
    },

    // Controller to assign a user to a church
    assignUserToChurch: async (req, res) => {
      try {
        const { userId, churchId } = req.body;
        const user = await User.findByPk(userId);
        if (user) {
          user.employeeId = churchId; // Assuming employeeId is used to link user to church
          await user.save();
          req.flash("success", "User assigned to church successfully");
        } else {
          req.flash("error", "User not found");
        }
        res.redirect("/admin/users");
      } catch (err) {
        console.error(err);
        req.flash("error", "Failed to assign user to church");
        res.redirect("/admin/users");
      }
    },

    renderPermissionsPage: async (req, res) => {
      try {
        res.render("admin/user-settings/permissions", {
          title: "User Permissions",
          user: req.user, // Assuming you want to pass the logged-in user data
        });
      } catch (err) {
        console.error(err);
        req.flash("error", "Failed to load permissions page");
        res.redirect("/admin/users");
      }
    },

    // Controller to create a new role
    createRole: async (req, res) => {
      try {
        const { name, description, usercreated } = req.body;
        const newRole = await Role.create({ name, description, usercreated });
        res.status(201).json({ success: true, data: newRole });
      } catch (err) {
        console.error(err);
        res
          .status(500)
          .json({ success: false, message: "Failed to create role" });
      }
    },

    // Controller to get all roles
    getRoles: async (req, res) => {
      try {
        const roles = await Role.find();
        res.status(200).json({ success: true, data: roles });
      } catch (err) {
        console.error(err);
        res
          .status(500)
          .json({ success: false, message: "Failed to fetch roles" });
      }
    },

    // Controller to update a role
    updateRole: async (req, res) => {
      try {
        const { id } = req.params;
        const { name, description } = req.body;
        const role = await Role.findByIdAndUpdate(
          id,
          { name, description },
          { new: true }
        );
        if (!role) {
          return res
            .status(404)
            .json({ success: false, message: "Role not found" });
        }
        res.status(200).json({ success: true, data: role });
      } catch (err) {
        console.error(err);
        res
          .status(500)
          .json({ success: false, message: "Failed to update role" });
      }
    },

    // Controller to delete a role
    deleteRole: async (req, res) => {
      try {
        const { id } = req.params;
        await Role.findByIdAndDelete(id);
        res
          .status(200)
          .json({ success: true, message: "Role deleted successfully" });
      } catch (err) {
        console.error(err);
        res
          .status(500)
          .json({ success: false, message: "Failed to delete role" });
      }
    },

    // Controller to create a new permission
    createPermission: async (req, res) => {
      try {
        const { route, method, alias, remark, roles } = req.body;
        const newPermission = await Permission.create({
          route,
          method,
          alias,
          remark,
          roles,
        });
        res.status(201).json({ success: true, data: newPermission });
      } catch (err) {
        console.error(err);
        res
          .status(500)
          .json({ success: false, message: "Failed to create permission" });
      }
    },

    // Controller to get all permissions
    getPermissions: async (req, res) => {
      try {
        const permissions = await Permission.find().populate("roles");
        res.status(200).json({ success: true, data: permissions });
      } catch (err) {
        console.error(err);
        res
          .status(500)
          .json({ success: false, message: "Failed to fetch permissions" });
      }
    },

    // Controller to update a permission
    updatePermission: async (req, res) => {
      try {
        const { id } = req.params;
        const { route, method, alias, remark, roles } = req.body;
        const permission = await Permission.findByIdAndUpdate(
          id,
          { route, method, alias, remark, roles },
          { new: true }
        );
        if (!permission) {
          return res
            .status(404)
            .json({ success: false, message: "Permission not found" });
        }
        res.status(200).json({ success: true, data: permission });
      } catch (err) {
        console.error(err);
        res
          .status(500)
          .json({ success: false, message: "Failed to update permission" });
      }
    },

    // Controller to delete a permission
    deletePermission: async (req, res) => {
      try {
        const { id } = req.params;
        await Permission.findByIdAndDelete(id);
        res
          .status(200)
          .json({ success: true, message: "Permission deleted successfully" });
      } catch (err) {
        console.error(err);
        res
          .status(500)
          .json({ success: false, message: "Failed to delete permission" });
      }
    },

    // Controller to create default roles and permissions
    createDefaultRolesAndPermissions: async (req, res) => {
      try {
        // Define roles
        const roles = [
          {
            name: "parish pastor",
            description: "Responsible for leading the parish",
          },
          { name: "treasurer", description: "Manages the financial accounts" },
          {
            name: "administrator",
            description: "Oversees administrative tasks",
          },
          {
            name: "accountant",
            description: "Handles accounting and financial reporting",
          },
          {
            name: "assistant pastor",
            description: "Assists the parish pastor",
          },
        ];

        // Define permissions
        const permissions = [
          {
            route: "/reports",
            method: "GET",
            alias: "CRUD for report",
            remark: "Allows CRUD operations for reports",
            roles: [],
          },
          {
            route: "/reports",
            method: "POST",
            alias: "CRUD for report",
            remark: "Allows CRUD operations for reports",
            roles: [],
          },
          {
            route: "/reports/:id",
            method: "PUT",
            alias: "CRUD for report",
            remark: "Allows CRUD operations for reports",
            roles: [],
          },
          {
            route: "/reports/:id",
            method: "DELETE",
            alias: "CRUD for report",
            remark: "Allows CRUD operations for reports",
            roles: [],
          },
          {
            route: "/finance",
            method: "GET",
            alias: "CRUD for finance",
            remark: "Allows CRUD operations for finance",
            roles: [],
          },
          {
            route: "/finance",
            method: "POST",
            alias: "CRUD for finance",
            remark: "Allows CRUD operations for finance",
            roles: [],
          },
          {
            route: "/finance/:id",
            method: "PUT",
            alias: "CRUD for finance",
            remark: "Allows CRUD operations for finance",
            roles: [],
          },
          {
            route: "/finance/:id",
            method: "DELETE",
            alias: "CRUD for finance",
            remark: "Allows CRUD operations for finance",
            roles: [],
          },
          {
            route: "/events",
            method: "GET",
            alias: "CRUD for events",
            remark: "Allows CRUD operations for events",
            roles: [],
          },
          {
            route: "/events",
            method: "POST",
            alias: "CRUD for events",
            remark: "Allows CRUD operations for events",
            roles: [],
          },
          {
            route: "/events/:id",
            method: "PUT",
            alias: "CRUD for events",
            remark: "Allows CRUD operations for events",
            roles: [],
          },
          {
            route: "/events/:id",
            method: "DELETE",
            alias: "CRUD for events",
            remark: "Allows CRUD operations for events",
            roles: [],
          },
        ];

        // Create roles
        const createdRoles = await Role.insertMany(roles);

        // Assign roles to permissions
        permissions.forEach((permission) => {
          if (permission.alias === "CRUD for report") {
            permission.roles = [createdRoles[0]._id, createdRoles[2]._id]; // parish pastor, administrator
          } else if (permission.alias === "CRUD for finance") {
            permission.roles = [createdRoles[1]._id, createdRoles[3]._id]; // treasurer, accountant
          } else if (permission.alias === "CRUD for events") {
            permission.roles = [
              createdRoles[0]._id,
              createdRoles[2]._id,
              createdRoles[4]._id,
            ]; // parish pastor, administrator, assistant pastor
          }
        });

        // Create permissions
        const createdPermissions = await Permission.insertMany(permissions);

        res.status(201).json({
          success: true,
          message: "Default roles and permissions created successfully",
          roles: createdRoles,
          permissions: createdPermissions,
        });
      } catch (err) {
        console.error(err);
        res
          .status(500)
          .json({
            success: false,
            message: "Failed to create roles and permissions",
          });
      }
    },

    // GET: display the roles page
    getRoles: async (req, res) => {
      try {
        res.render("admin/user-settings/roles", {
          pageName: "User Roles",
        });
      } catch (error) {
        console.error("Error rendering roles page:", error);
        req.flash("error", "An error occurred while loading the roles page.");
        res.redirect("/");
      }
    },

    // GET: display the role view page
    getRoleView: async (req, res) => {
      try {
        res.render("admin/user-settings/role-view", {
          pageName: "Role View",
        });
      } catch (error) {
        console.error("Error rendering role view page:", error);
        req.flash(
          "error",
          "An error occurred while loading the role view page."
        );
        res.redirect("/");
      }
    },

    getUserSettings: async (req, res) => {
      try {
        const successMsg = req.flash("success")[0];
        const errorMsg = req.flash("error")[0];
        const currentUser = req.user;
        res.render("admin/user-settings/start", {
          currentUser,
          successMsg,
          errorMsg,
          pageName: "User Settings",
        });
      } catch (error) {
        console.error("Error rendering user settings page:", error);
        req.flash("error", "An error occurred while loading the user settings page.");
        res.redirect("/");
      }
    },


    // GET: display the welcome page
    getSubscriptionList: async (req, res) => {
      try {
        const successMsg = req.flash("success")[0];
        const errorMsg = req.flash("error")[0];
        const currentUser = req.user;
        res.render("admin/user-settings/subscriptions", {
          currentUser,
          successMsg,
          errorMsg,
          pageName: "Subscription",
        });
      } catch (error) {
        console.error("Error rendering welcome page:", error);
        req.flash("error", "An error occurred while loading the welcome page.");
        res.redirect("/");
      }
    },

    // GET: display the subscription page
    getSubscription: async (req, res) => {
      try {
        const successMsg = req.flash("success")[0];
        const errorMsg = req.flash("error")[0];
        const currentUser = req.user;
        res.render("admin/user-settings/onboarding", {
          currentUser,
          successMsg,
          errorMsg,
          pageName: "Subscription",
        });
      } catch (error) {
        console.error("Error rendering subscription page:", error);
        req.flash("error", "An error occurred while loading the subscription page.");
        res.redirect("/");
      }
    },

    // GET: display the folder page
    getFolder: async (req, res) => {
      try {
        const successMsg = req.flash("success")[0];
        const errorMsg = req.flash("error")[0];
        const currentUser = req.user;
        res.render("admin/user-settings/folder", {
          currentUser,
          successMsg,
          errorMsg,
          pageName: "Folder",
        });
      } catch (error) {
        console.error("Error rendering folder page:", error);
        req.flash("error", "An error occurred while loading the folder page.");
        res.redirect("/");
      }
    },

    // GET: display the files page
    getFiles: async (req, res) => {
      try {
        const successMsg = req.flash("success")[0];
        const errorMsg = req.flash("error")[0];
        const currentUser = req.user;
        res.render("admin/user-settings/files", {
          currentUser,
          successMsg,
          errorMsg,
          pageName: "Files",
        });
      } catch (error) {
        console.error("Error rendering files page:", error);
        req.flash("error", "An error occurred while loading the files page.");
        res.redirect("/");
      }
    },

    // GET: display the folder list page
    getFolderList: async (req, res) => {
      try {
        const successMsg = req.flash("success")[0];
        const errorMsg = req.flash("error")[0];
        const currentUser = req.user;
        res.render("admin/user-settings/folder-list", {
          currentUser,
          successMsg,
          errorMsg,
          pageName: "Folder List",
        });
      } catch (error) {
        console.error("Error rendering folder list page:", error);
        req.flash("error", "An error occurred while loading the folder list page.");
        res.redirect("/");
      }
    },



    //GET: Show all the employee serving
    getPastors: async (req, res) => {
      try {
        const successMsg = req.flash("success")[0];
        const errorMsg = req.flash("error")[0];
        const currentUser = req.user;
        //count cummulative Tota
        res.render("admin/pastors", {
          currentUser,
          successMsg,
          errorMsg,
          pageName: "Pastors Data",
        });
      } catch (err) {
        console.error(err);
        req.flash("error", "Failed to fetch user data");
        res.redirect("/");
      }
    },

    getLegal: (req, res) => {
      const errorMsg = req.flash("error")[0];
      const successMsg = req.flash("success")[0];
      const currentUser = req.user;
      res.render("admin/legal", {
        currentUser,
        errorMsg,
        successMsg,
        pageName: "Lands and Legal Development",
      });
    },

    getLeadership: (req, res) => {
      const errorMsg = req.flash("error")[0];
      const successMsg = req.flash("success")[0];
      const currentUser = req.user;
      res.render("admin/leaders", {
        errorMsg,
        successMsg,
        currentUser,
        pageName: " Church Leaders Information",
      });
    },

    getActiveAge: (req, res) => {
      const errorMsg = req.flash("error")[0];
      const successMsg = req.flash("success")[0];
      const currentUser = req.user;
      res.render("admin/active", {
        currentUser,
        errorMsg,
        successMsg,
        pageName: "All Active Workers Data",
      });
    },

    getMissions: (req, res) => {
      const errorMsg = req.flash("error")[0];
      const successMsg = req.flash("success")[0];
      const currentUser = req.user;
      res.render("admin/missions", {
        errorMsg,
        successMsg,
        currentUser,
        pageName: "All Missions Church",
      });
    },

    getCampus: (req, res) => {
      const errorMsg = req.flash("error")[0];
      const successMsg = req.flash("success")[0];
      const currentUser = req.user;

      res.render("admin/campus", {
        errorMsg,
        successMsg,
        currentUser,
        pageName: "All Campuses Data",
      });
    },

    getRegions: (req, res) => {
      const errorMsg = req.flash("error")[0];
      const successMsg = req.flash("success")[0];
      const currentUser = req.user;
      res.render("admin/region", {
        currentUser,
        errorMsg,
        successMsg,
        pageName: "All Regional Analysis",
      });
    },

    getNations: (req, res) => {
      const errorMsg = req.flash("error")[0];
      const successMsg = req.flash("success")[0];
      const currentUser = req.user;
      res.render("admin/nations", {
        errorMsg,
        successMsg,
        currentUser,
        pageName: "Leadership in the church",
      });
    },

    getAnalysis: (req, res) => {
      const errorMsg = req.flash("error")[0];
      const successMsg = req.flash("success")[0];
      const currentUser = req.user;

      res.render("admin/analysis", {
        errorMsg,
        successMsg,
        currentUser,
        pageName: "Church Growth Analysis",
      });
    },

    getReport: (req, res) => {
      const successMsg = req.flash("success")[0];
      const errorMsg = req.flash("error")[0];
      const currentUser = req.user;
      res.render("admin/report", {
        errorMsg,
        successMsg,
        currentUser,
        pageName: "Christ Life: Church Data Reporting",
      });
    },

    getDivisions: (req, res) => {
      const successMsg = req.flash("success")[0];
      const errorMsg = req.flash("error")[0];
      const currentUser = req.user;
      res.render("admin/report", {
        errorMsg,
        successMsg,
        currentUser,
        pageName: "Reporting  church",
      });
    },

    getSchools: (req, res) => {
      const successMsg = req.flash("success")[0];
      const errorMsg = req.flash("error")[0];
      const currentUser = req.user;
      res.render("admin/schools", {
        errorMsg,
        successMsg,
        currentUser,
        pageName: "Mission Schhools",
      });
    },
  };




module.exports = adminController;
