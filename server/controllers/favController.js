const { Await } = require('react-router-dom');
const db = require('../models/database.js');

const favController = {};

// getFavs: takes a userID and returns a query of user's favorites w/ Name, Address, and Ratings

favController.getFavs = async (req, res, next) => {
  try {
    const { username } = req.body;

    const findUserID = `SELECT user_id FROM users WHERE username = ($1);`;

    let user_id;

    await db.query(findUserID, [username])
      .then(id => {
        user_id = id.rows[0].user_id;
      });

    const values = [user_id];

    const getFavs = `SELECT b.name, b.address, b.averagescore, b.business_id, b.url, b.image_url, b.categories
    FROM favorites f
    JOIN businesses b ON f.business_id = b.business_id
    WHERE f.user_id = ($1);`;

    db.query(getFavs, values).then((favorites) => {
      // console.log(favorites.rows);
      res.locals.favs = favorites.rows;
      console.log(res.locals.favs);
      next();

    });
  } catch (error) {
    return next(error);
  }
};

// addFav: adds a new business to user's favorite list

favController.addFav = async (req, res, next) => {
  try {
    const { username, apiId } = req.body;

    let exists = false;

    let userId;
    let businessId;

    const findUserID = 'SELECT user_id FROM users WHERE username = ($1);';

    await db.query(findUserID, [username])
      .then((id) => {
        userId = id.rows[0].user_id;
      });

    const findBusinessID = 'SELECT business_id FROM businesses WHERE api_id = ($1);';

    await db.query(findBusinessID, [apiId])
      .then((bId) => {
        businessId = bId.rows[0].business_id;
      });

    const check = 'SELECT * FROM favorites WHERE user_id = $1 AND business_id = $2';

    const values = [userId, businessId];

    await db.query(check, values).then((result) => {

    if (result.rows.length > 0) {
        exists = true
        return res.status(409).json({ error: 'Favorite already exists on user', status: 409 }); 
      }

    });  

    if (!exists) {

    const addFav = `INSERT INTO favorites (user_id, business_id) VALUES ($1, $2)`;
    
   await db.query(addFav, values).then((fav) => {
      res.locals.fav = fav.rows[0];
      console.log("THIS IS FAV FROM ADD FAV", fav);

    });
    console.log("!!!!!!!!THIS IS RES>LOCALS>FAV!!!!!!",res.locals.fav)
    return next();
    }  
  } catch (error) {
    return next(error);
  }
};

// removeFav: removes a favorite from user's list

favController.removeFav = async (req, res, next) => {
  try {
    const { username, apiId } = req.body;
    
    let user_id, business_id;
    
    const findUserID = `SELECT user_id FROM users WHERE username = ($1);`;

    await db.query(findUserID, [username])
        .then(id => {
          user_id = id.rows[0].user_id;
        });

    const findBusinessID = `SELECT business_id FROM businesses WHERE apiId = ($1);`

    await db.query(findBusinessID, [apiId])
      .then(b_id => {
        business_id = b_id.rows[0].business_id;
      });

    const values = [user_id, business_id];

    const removeFav = `DELETE FROM favorites WHERE user_id = $1 AND business_id = $2`;

    db.query(removeFav, values).then((fav) => {
      res.locals.fav = fav;
      return next();

    });

  } catch (error) {
    return next(error);
  }
};

module.exports = favController;
