"use strict";
const conversion = require("./conversion");


const analytics = {
getLastReport(station){
    let lastReport=0;
    if (station.readings.length > 0) {
        lastReport = station.readings[station.readings.length-1];

        station.weatherCode = conversion.weather(Number(lastReport.code));
        station.tempF = conversion.getTempF(Number(lastReport.temperature));
        station.windBeaufort = conversion.getWind(Number(lastReport.windSpeed));
        station.windDirectionText = conversion.getWindDirectionText(Number(lastReport.windDirection));
        station.latitudeRounded = station.latitude.toFixed(3);
        station.longitudeRounded = station.longitude.toFixed(3);
        station.windChill = (Math.round((13.13 + (0.6215 * lastReport.temperature) - (11.37 * (Math.pow(lastReport.windSpeed, 0.16))) +
            ((0.3965 * lastReport.temperature) * (Math.pow(lastReport.windSpeed, 0.16)))) * 100)) / 100.0;
        station.minTemp = analytics.getMinTemp(station);
        station.maxTemp = analytics.getMaxTemp(station);
        station.minWind = analytics.getMinWind(station);
        station.maxWind = analytics.getMaxWind(station);
        station.minPressure = analytics.getMinPressure(station);
        station.maxPressure = analytics.getMaxPressure(station);
        station.temperature = lastReport.temperature;
        station.pressure = lastReport.pressure;
    }
   console.log(lastReport);
    return lastReport;
},
    getMinTemp(station){
        let minTemp = null;
        if (station.readings.length >0){
            minTemp = station.readings[0];
            for (let i=1; i < station.readings.length; i++){
                if (station.readings[i].temperature < minTemp.temperature){
                    minTemp = station.readings[i];
                }
            }
        }
        return minTemp;
    },
    getMaxTemp(station){
        let maxTemp = null;
        if (station.readings.length >0){
            maxTemp = station.readings[0];
            for (let i=1; i < station.readings.length; i++){
                if (station.readings[i].temperature > maxTemp.temperature){
                    maxTemp = station.readings[i];
                }
            }
        }
        return maxTemp;
    },
    getMinWind(station){
        let minWind = null;
        if (station.readings.length >0){
            minWind = station.readings[0];
            for (let i=1; i < station.readings.length; i++){
                if (station.readings[i].windSpeed < minWind.windSpeed){
                    minWind = station.readings[i];
                }
            }
        }
        return minWind;
    },
    getMaxWind(station){
        let maxWind = null;
        if (station.readings.length >0){
            maxWind = station.readings[0];
            for (let i=1; i < station.readings.length; i++){
                if (station.readings[i].windSpeed > maxWind.windSpeed){
                    maxWind = station.readings[i];
                }
            }
        }
        return maxWind;
    },
    getMinPressure(station){
        let minPressure = null;
        if (station.readings.length >0){
            minPressure = station.readings[0];
            for (let i=1; i < station.readings.length; i++){
                if (station.readings[i].pressure < minPressure.pressure){
                    minPressure = station.readings[i];
                }
            }
        }
        return minPressure;
    },
    getMaxPressure(station){
        let maxPressure = null;
        if (station.readings.length >0){
            maxPressure = station.readings[0];
            for (let i=1; i < station.readings.length; i++){
                if (station.readings[i].pressure > maxPressure.pressure){
                    maxPressure = station.readings[i];
                }
            }
        }
        return maxPressure;
    },
};

module.exports =analytics;