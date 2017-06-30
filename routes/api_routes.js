/* jshint esversion:6, node: true */

/*  ======================== API Route Descriptions ====================
    VERB      URL                         DESCRIPTION
    --------------------------------------------------------------------
    GET       /api/profiles                 Get all profiles
    GET       /api/profiles/:id             Get a single profile
    GET       /api/team/:team_id            Get all profiles for 1 team
*/

const routes   = require('express').Router(),
      Profile  = require('../models/profile_model');


/* ============================= PUBLIC ROUTES ============================= */


// GET all profiles
routes.get('/api/profiles', (req, res) => {
    
    Profile.find( (err, profiles) => {
        if (err) throw err;
        
        res.status(200).json(profiles);
    });
});


// GET one profile
routes.get('/api/profiles/:id', (req, res) => {

    let target  = req.params.id;
    
    Profile.findOne({ _id: target }, (err, profile) => {
        
        if (err) throw err;
        
        return res
            .status(200)       // even though just 1 profile, return as array
            .json([profile]);  // so view can loop through to build the table.
        
    });
    
});


// GET one team's profiles
routes.get('/api/team/:team_id', (req, res) => {
    
    let target_team = req.params.team_id;
    
    Profile.find({ team_id: target_team }, (err, profiles) => {
        
        if (err) throw err;
        
        return res
            .status(200)
            .json(profiles);
        
    });
    
});


module.exports = routes;