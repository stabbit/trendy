const searchController = {};
const sdk = require("api")("@yelp-developers/v1.0#deudoolf6o9f51");
const cheerio = require("cheerio");

// getBuisnesses: Authenticates Yelp API, searches with v3_business_search from Yelp, assigns businesses to an array of objects in local storage

searchController.getBuisnesses = async (req, res, next) => {

  sdk.auth("bearer " + process.env.YELP_API);

  const { interest, radius } = req.query;
  const location = req.query.location.replace(/\s/g, "%20");
  const { data } = await sdk.v3_business_search({
    location,
    term: interest,
    radius,
    sort_by: "best_match",
    limit: "20",
  });

  res.locals.businesses = data.businesses.map((business) => {
    const { id, name, image_url, url, categories, location } = business;
    return {
      id,
      name,
      image_url,
      url,
      categories,
      location: location.display_address,
    };
  });

  next();
};

searchController.getComments = async (req, res, next) => {
  Promise.all(
    res.locals.businesses.map((business) => fetch(business.url))
  ).then((YELPres) => {
    Promise.all(YELPres.map((x) => x.text())).then((html) => {
      for (const index in html) {
        const comments = [];
        const $ = cheerio.load(html[index]);
        const $comment = $("span.raw__09f24__T4Ezm");
        $comment.each((i, element) => {
          comments.push($(element).text().trim());
        });
        res.locals.businesses[index].comments = comments;
      }
      next();
    });
  });
};

async function getRatingsHelper(business) {
  try {
    const data = await Promise.all(
      business.comments.map((comment) => {
        return fetch(
          "https://api.api-ninjas.com/v1/sentiment?text=" + comment,
          {
            headers: {
              "X-Api-Key": process.env.NINJA_API,
            },
          }
        );
      })
    );
    const rating = await Promise.all(data.map((rate) => rate.json()));
    let validResponses = 0;
    const avg =
      rating.reduce((acc, curr) => {
        if (curr.score !== undefined) {
          acc += curr.score;
          validResponses++;
        }
        return acc;
      }, 0) / validResponses;
    return Promise.resolve(+avg + 0.2);
  } catch (error) {
    return Promise.resolve("ERROR");
  }
}

searchController.getRatings = async (req, res, next) => {
  const average = await Promise.all(
    res.locals.businesses.map((buisiness) => {
      return getRatingsHelper(buisiness);
    })
  );

  // const filterBbusinesses = [];
  // for (const index in average) {
  //   if (average[index] !== "ERROR") {
  //     res.locals.businesses[index].averageScore = average[index];
  //     filterBbusinesses.push(res.locals.businesses[index]);
  //   }
  // }

  // const filterBbusinessesReducer = average.reduce((acc, curr, index) => {
  //   if (curr !== "ERROR") {
  //     res.locals.businesses[index].averageScore = curr;
  //     acc.push(res.locals.businesses[index]);
  //   }
  //   return acc;
  // }, []);

  // console.log(filterBbusinesses);
  res.locals.businesses = average.reduce((acc, curr, index) => {
    if (curr !== "ERROR") {
      res.locals.businesses[index].averageScore = curr;
      acc.push(res.locals.businesses[index]);
    }
    return acc;
  }, []);
  next();
};





module.exports = searchController;
