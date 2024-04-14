const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const User = require("../models/user");
const Church = require("../models/church");
const saltRounds = 10;



const adminController = {
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
