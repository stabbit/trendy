# trendy
A website that offers users a consolidated overview of recent customer experiences.

![Trendy Demo](https://github.com/stabbit/trendy/blob/dev/assets/Dec-05-2023%2013-03-36.gif?raw=true)

## Installation
```sh
npm install
```
```sh
npm run dev
```

Creating a `.env` file in the trendy root directory containing personal API keys will be necessary to have the website work.
Insert the following text and replace **APIKEYHERE** with the respective key.

* [Obtain a Yelp API Fusion key](https://docs.developer.yelp.com/docs/fusion-authentication) (https://docs.developer.yelp.com/docs/fusion-authentication)
* [Obtain a Ninja key for the Sentiment API](https://api-ninjas.com/) (https://api-ninjas.com/)
```
YELP_API=APIKEYHERE
NINJA_API=APIKEYHERE
```

## Database
An SQL database is NOT required, but, if you’re interested in the saving capabilities you will need to set one up. After obtaining the connection URI for the database, paste the string into the quotes on line 3 of the database.js file.


