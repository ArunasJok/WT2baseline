'use strict';
const uuid = require('uuid');
const logger = require('../utils/logger');
const stationStore = require('../models/station-store');
const analytics = require('../utils/analytics')
const conversion = require("../utils/conversion");
const axios = require("axios");

const station = {
    index(request, response) {
        const stationId = request.params.id;
        logger.debug('Station id = ' + stationId);
        const station = stationStore.getStation(stationId);
        const lastReport = analytics.getLastReport(station);
        const weatherCode = conversion.weather(Number(lastReport.code));
        const tempF = conversion.getTempF(Number(lastReport.temperature));
        const windBeaufort = conversion.getWind(Number(lastReport.windSpeed));
        const windDirectionText = conversion.getWindDirectionText(Number(lastReport.windDirection));
        const latitudeRounded = station.latitude.toFixed(3);
        const longitudeRounded = station.longitude.toFixed(3);
        const windChill = (Math.round((13.13 + (0.6215 * lastReport.temperature) - (11.37 * (Math.pow(lastReport.windSpeed, 0.16))) +
            ((0.3965 * lastReport.temperature) * (Math.pow(lastReport.windSpeed, 0.16)))) * 100)) / 100.0;
        const minTemp = analytics.getMinTemp(station);
        const maxTemp = analytics.getMaxTemp(station);
        const minWind = analytics.getMinWind(station);
        const maxWind = analytics.getMaxWind(station);
        const minPressure = analytics.getMinPressure(station);
        const maxPressure = analytics.getMaxPressure(station);
        const temperature = lastReport.temperature;

        const viewData = {
            title: 'Station',
            station: stationStore.getStation(stationId),
            lastReport: lastReport,
            weatherCode: weatherCode,
            tempF: tempF,
            windBeaufort: windBeaufort,
            windDirectionText: windDirectionText,
            latitudeRounded: latitudeRounded,
            longitudeRounded: longitudeRounded,
            windChill: windChill,
            minTemp: minTemp,
            maxTemp: maxTemp,
            minWind: minWind,
            maxWind: maxWind,
            minPressure: minPressure,
            maxPressure: maxPressure,
            temperature: temperature,


        };
        response.render('station', viewData);
    },

    deleteReading(request, response) {
        const stationId = request.params.id;
        const readingId = request.params.readingid;
        logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
        stationStore.removeReading(stationId, readingId);
        response.redirect('/station/' + stationId);
    },
    addReading(request, response) {
        const stationId = request.params.id;
        const station = stationStore.getStation(stationId);
        const newReading = {
            id: uuid.v1(),
            date: new Date(),
            code: Number(request.body.code),
            temperature: Number(request.body.temperature),
            windSpeed: Number(request.body.windSpeed),
            windDirection: Number(request.body.windDirection),
            pressure: Number(request.body.pressure),
        };
        stationStore.addReading(stationId, newReading);
        response.redirect('/station/' + stationId);
    },
};

module.exports = station;