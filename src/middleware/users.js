'use strict';
const uuid = require('uuid');

module.exports = function(req, res, next){
    let userId=req.cookies.userId;

    if(userId===undefined)
    {
        // no: set a new cookie
        if(!userId){
            userId=uuid.v4();
            res.cookie('userId', userId);
        }
    }

    req.agent = {
        id:userId
    };

    next();
};