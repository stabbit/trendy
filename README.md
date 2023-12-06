# trendy
![Trendy Demo](https://github.com/stabbit/trendy/blob/dev/assets/Dec-05-2023%2013-03-36.gif?raw=true)
Trendy is a website that receives a location from the user, returns all activities (food, monuments, parks, etc) matching the prompt, and utilizes Ninja's Sentiment API to analyze recent reviews.

<div align="center" style="display: flex; justify-content: center; gap: 25px;">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
</div>

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


