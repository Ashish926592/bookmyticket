const model = require('./report_model');

exports.report_query1 = ('/', (req, res) => {
    const { city_name } = req.query
    model.report1(city_name).then(response => {
        res.json(response);
    }).catch(error => {
        console.error(error);
    });
})

exports.report_query2 = ('/', (req, res, next) => {
    const { cinema_hall } = req.query
    model.report2(cinema_hall).then(response => {
        res.json(response);
    }).catch(error => {
        console.error(error);
    });
});

exports.report_query3 = ('/', (req, res, next) => {
    const { movie_name } = req.query;
    model.report3(movie_name).then(response => {
        res.json(response);
    }).catch(error => {
        console.error(error);
    });
});

exports.report_query4 = ('/', (req, res, next) => {
    const { city_name, movie_name, cinema_name, hall_name, date } = req.body;
    // console.log(city_name, movie_name, cinema_name, hall_name, date);
    model.report4(city_name, movie_name, cinema_name, hall_name, date).then(response => {
        res.json(response);
    }).catch(error => {
        console.error(error);
    });
});

exports.report_query5 = ('/', (req, res) => {
    model.report5().then(response => {
        res.json(response);
    }).catch(error => {
        console.error(error);
    });

});

exports.report_query6 = ('/', (req, res) => {
    const { year } = req.query
    model.report6(year).then(response => {
        res.json(response);
    }).catch(error => {
        console.error(error);
    });

});

exports.report_query7 = ('/', (req, res) => {
    model.report7().then(response => {
        res.json(response);
    }).catch(error => {
        console.error(error);
    });

});

exports.report_query8 = ('/', (req, res) => {
    model.report8().then(response => {
        res.json(response);
    }).catch(error => {
        console.error(error);
    });

});
exports.report_query9 = ('/', (req, res) => {
    model.report9().then(response => {
        res.json(response);
    }).catch(error => {
        console.error(error);
    });

});

exports.report_query10 = ('/', (req, res) => {
    const { movie_name, hall_name } = req.query
    model.report10(movie_name, hall_name).then(response => {
        res.json(response);
    }).catch(error => {
        console.error(error);
    });

});

