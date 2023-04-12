const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'));

exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);

    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next();
};

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        });
    }
    next();
};


exports.getTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'v1/tours server side!',
        data: {tours}
    });
}
exports.findTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    if (!tour) {
        res.status(404).json({
            status: 'not found',
            message: 'invalid id',
        });
    } else {
        res.status(200).json({
            status: 'success',
            data: {tour}
        });
    }
}


exports.addTour = (req, res) => {
    console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
}
