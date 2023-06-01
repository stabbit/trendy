const db = require('../models/database.js');

const businessController = {};

// DuJ7yPrSVtZzfD-P7mzjvnwhrLRken4Eh5rYm2fCxAj7o3RAKzYQwG84EPILIb_VBlUbAce063ltKVpvo5T5arKRZ1-SsLMb9QF5i2Nv2SdcvBW3VVlX0p3vvwt5ZHYx

// addBusinesses: adds bussiness to DB takes Name, Address, and Ratings

businessController.addBusiness = async (req, res, next) => {
  try {
    console.log("THIS IS WHAT THE BODY LOOKS LIKE!!@!!!!!!",req.body);
    const { apiId, url, address, image, title, description, score } = req.body;

    // const linkedAddress = address[0].concat(" ", address[1])
 
    // const linkedDescription = description.map( el => el.title ).join(', ');
  
    const values = [apiId, url, address, image, title, description, score];

    const check = 'SELECT * FROM businesses WHERE api_Id = $1';

    let exists = false;

    await db.query(check, [ apiId ]).then((result) => {

      if (result.rows.length > 0) {
        exists = true;
        // res.status(409).json({ error: 'Business already exists', status: 409 });
        return next(); 
      }

    });

    if (!exists) { 

      const insertBusiness = 'INSERT INTO businesses (api_Id, url, address, image_url, name, categories, averagescore ) VALUES ($1, $2, $3, $4, $5, $6, $7)';

      db.query(insertBusiness, values).then((business) => {
      res.locals.business = business;
      return next();

      });
    }
  } catch (error) {
    return next(error);
  }
};

// allBusinesses: makes a query for all businesses in DB and returns data

businessController.allBusinesses = (req, res, next) => {
  try {

    const allBusinesses = `SELECT * FROM businesses`;

    db.query(allBusinesses).then((businesses) => {
      // console.log(businesses.rows);
      res.locals.businesses = businesses.rows;
      return next();

    });

  } catch (error) {
    return next(error);
  }
};

module.exports = businessController;
