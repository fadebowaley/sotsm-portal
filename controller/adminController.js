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
      let hotels = [];

      // Check if filtered hotels are available in the request object
      if (req.filteredHotels) {
        hotels = req.filteredHotels;
      } else {
        // If filtered hotels are not available, retrieve all hotels
        hotels = await Hotel.find({}).populate("reviews").populate("rooms");
      }

      const hotelRoomsCounts = hotels.map((hotel) => {
        const availableRooms = hotel.rooms.filter((room) => room.available);
        const unavailableRooms = hotel.rooms.filter((room) => !room.available);
        return {
          hotelName: hotel.name,
          availableRoomsCount: availableRooms.length,
          unavailableRoomsCount: unavailableRooms.length,
        };
      });

      //count cummulative Total
      const availableRoomsCount = hotels.reduce((total, hotel) => {
        const availableRooms = hotel.rooms.filter(
          (room) => room.available && !room.lock
        );
        return total + availableRooms.length;
      }, 0);

      const unavailableRoomsCount = hotels.reduce((total, hotel) => {
        const unavailableRooms = hotel.rooms.filter(
          (room) => !room.available && !room.lock
        );
        return total + unavailableRooms.length;
      }, 0);

      const lockedRoomsCount = hotels.reduce((total, hotel) => {
        const lockedRooms = hotel.rooms.filter((room) => room.lock);
        return total + lockedRooms.length;
      }, 0);

      const total =
        availableRoomsCount + unavailableRoomsCount + lockedRoomsCount;
      res.render("admin/hotels/hotels", {
        hotels,
        hotelRoomsCounts,
        totalRoomsCounts: total,
        availableRoomsCount,
        unavailableRoomsCount,
        lockedRoomsCount,
        successMsg,
        errorMsg,
        pageName: "Hotel Lists",
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
    res.render("index", {
      errorMsg,
      successMsg,
      pageName: "Land and Legal Development",
    });
  },

  getLeadership: (req, res) => {
    const errorMsg = req.flash("error")[0];
    const successMsg = req.flash("success")[0];
    res.render("index", {
      errorMsg,
      successMsg,
      pageName: "Leadership in the church",
    });
  },



};




module.exports = adminController;
