"use strict";

const uuid = require('uuid');
const logger = require("../utils/logger");
const lodash = require("lodash");
const stationStore= require("../models/station-store");
const accounts = require ('./accounts.js');
const axios = require("axios");


const dashboard = {
  index(request, response) {
    const stationId = request.params.id;
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const station = stationStore.getStation(stationId);

    const viewData = {
      title: "Station Dashboard",
      stations: stationStore.getUserStations(loggedInUser.id),
    };
    logger.info("about to render", stationStore.getAllStations());
    response.render("dashboard", viewData);
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect('/dashboard');
  },
  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      latitude: Number(request.body.latitude),
      longitude: Number(request.body.longitude),
      readings: [],
    };
    logger.info("Adding a new station", newStation);
    stationStore.addStation(newStation);
    response.redirect('/dashboard');
  },
};


module.exports = dashboard;
