/**
 * Created by tomasskopal on 04.04.15.
 */

var Token = require("../models/TokenModel");

/**
 * Function for validation access_token and set userId to the request. HTTP methods needs this value for querying.
 */
exports.oauthCheck = function(req, res, next) {
    if(req.query.access_token === undefined) {
        console.log(req.query);
        res.status(400).json("Access token is missing");
    } else {
        Token.findOne({value: req.query.access_token }, function (err, token) {
            if (err) { res.send(err); }

            // No token found
            if (!token) { return res.status(400).json("No token found"); }

            req.userId = token.userId;
            next();
        });

    }
};