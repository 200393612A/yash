'use strict';
var express = require('express');
var router = express.Router();
var advertisements = require('../model/advertisements');

/* GET home page. */
router.get('/', isLoggedIn, function (req, res) {
    res.redirect('/advertisement');
});
// List Advertisement Page
router.get('/advertisement', isLoggedIn, function (req, res) {
    var msg = req.query.msg;

    advertisements.find(function (err, advertisements) {

        if (err) console.log(err);
        else
            if (msg === undefined) res.render('advertisements', { allAdvertisements: advertisements });
            else res.render('advertisements', { allAdvertisements: advertisements, msg: msg });
    });
});
//Add Advertisement Page
router.get('/advertisement/add', isLoggedIn, function (req, res) {
    res.render('addAdvertisement');
});

router.post('/advertisement/add', isLoggedIn, function (req, res) {
    advertisements.create({

        title: req.body.title,
        description: req.body.description,
        price: req.body.price,

        location: req.body.location,

    }, function (err, advertisement) {
        if (err) console.log(err);
        else {
            console.log('advertisement added : ' + advertisement);
            res.redirect('/advertisement?msg=' + "Advertisement Added");
        }
    });
});

//Delete A Advertisement
router.get('/advertisement/delete/:id', isLoggedIn, function (req, res) {
    var id = req.params.id;
    advertisements.deleteOne({ _id: id }, function (err) {
        console.log(id);
        if (err)
            console.log('Advertisement : ' + id + 'not found!');
        else
            res.redirect('/advertisement');
    });
});


//Edit A Product Page
router.get('/advertisement/edit/:id', isLoggedIn, function (req, res) {
    var id = req.params.id;

    advertisements.findById(id, function (err, product) {
        if (err)
            res.send('Advertisement : ' + id + 'not found!');
        else
            res.render('editAdvertisement', { advertisement: product });
    });
});

//Edit a Advertisement and save to DB
router.post('/advertisement/edit', isLoggedIn, function (req, res) {
    var id = req.body.id;
    var editedAdvertisment = {
        _id: id,

        title: req.body.title,
        description: req.body.description,
        price: req.body.price,

        location: req.body.location,

    };
    advertisements.updateOne({ _id: id }, editedAdvertisment, function (err) {
        if (err) res.send('Advertisement: ' + id + ' not found!');
        else {
            console.log('Advertisement' + id + ' updated!');
            res.redirect('/advertisement');
        }
    });

});

router.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('Not authenticated!');
    res.redirect('/login');
}

module.exports = router;


