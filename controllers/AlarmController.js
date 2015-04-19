/**
 * Created by tomasskopal on 04.04.15.
 */

var Alarm = require('../models/AlarmModel');


/**
 * Create endpoint /api/alarms for GET
 */
exports.getAlarms = function(req, res) {
    console.log(req.userId);
    Alarm.find({ userId: req.userId }, function(err,data) {
        if (err) {
            console.log("Error in finding users" + err);
            return res.send(err);
        }
        res.status(200).json({ alarms: data });
    });
};

/**
 * Create endpoint /api/alarms for POST
 */
exports.postAlarm = [function(req, res, next) {
        if(req.body.title === undefined) { // Better one validation than nothing
            console.log(req.body);
            return res.status(400).send("Title is missing");
        } else {
            next();
        }
    },
    function(req, res) {
        var alarm = createNewAlarm(req.body);
        alarm.userId = req.userId;

        alarm.save(function(err) {
            if (err)
                return res.send(err);

            res.status(201).json({ message: 'Alarm added to the dtb!', data: alarm });
        });
    }
];

/**
 * Create endpoint /api/alarms/:id for GET
 *
 * example http://localhost:3000/api/alarms/1
 */
exports.getAlarm = [function(req, res, next) {
        if (req.params.id === undefined) {
            return res.status(400).send("Id is undefined");
        } else {
            next();
        }
    },
    function(req, res) {
        Alarm.findOne({ userId: req.userId, _id: req.params.id }, function(err,data) {
            if (err)
                return res.send(err);
            res.status(200).json({ alarm: data });
        });
    }
];

/**
 * Create endpoint /api/alarms/:id for PUT
 */
exports.putAlarm = function(req, res) {
    Alarm.findOne({ userId: req.userId, _id: req.params.id }, function(err,data) {
        if (err)
            return res.send(err);

        var alarm = copyValuesOfAlarm(data, req.body);
        alarm.userId = req.userId; // password library makes user object in the request

        alarm.save(function(err) {
            if (err)
                return res.send(err);

            res.status(200).json({ data: data });
        });
    });
};

/**
 * Create endpoint /api/alarms/:id for DELETE
 */
exports.deleteAlarm = [function(req, res, next) {
        if (req.params.id === undefined) {
            return res.status(400).send("Id is undefined");
        } else {
            next();
        }
    },
    function(req, res) {
        Alarm.findOneAndRemove({ userId: req.userId, _id: req.params.id }, function(err) {
            if (err)
                return res.send(err);
            res.status(200).json("Removed");
        });
    }
];

function createNewAlarm(requestBody) {
    var alarm = new Alarm();
    alarm._id = requestBody.id;
    alarm.title = requestBody.title;
    alarm.hour = requestBody.hour;
    alarm.minute = requestBody.minute;
    alarm.enabled = requestBody.enabled;
    alarm.repeat = requestBody.repeat;
    alarm.days = requestBody.days;
    return alarm;
};

function copyValuesOfAlarm(alarmTo, alarmFrom) {
    alarmTo.title = alarmFrom.title;
    alarmTo.hour = alarmFrom.hour;
    alarmTo.minute = alarmFrom.minute;
    alarmTo.enabled = alarmFrom.enabled;
    alarmTo.repeat = alarmFrom.repeat;
    alarmTo.days = alarmFrom.days;
    return alarmTo;
};
