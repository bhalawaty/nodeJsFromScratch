const express = require('express');
const tourController = require(`${__dirname}/../Controllers/TourController.js`);

const router = express.Router();

router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getTours)
  .post(tourController.checkBody, tourController.addTour);

router
  .route('/:id')
  .get(tourController.findTour);

module.exports = router;
