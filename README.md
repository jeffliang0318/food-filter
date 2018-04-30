# Food-Filter

**Food-Filter is a project aiming to find food items based off of the user's own preference**

## Background and Overview

Individuals with restricted diets or with many allergies will often spend time going through the ingredients of products to figure out if they are able to consume it. Our project aims to highlight these ingredients that they cannot consume but also help the user find a quick and easy way for them to verify it. Our audience includes those with a restricted diet or those with food allergies.

According to Food Allergy Research & Education organization, individuals with a peanut allergy need to avoid ingredients that also have the name of arachis oil, lipin, mandelonas, peanut protein hydrolysate, goobers, etc. As one can see, there are many other ingredients to pay attention to besides the simple word of 'peanuts'. Also, if the user has many allergies or food restrictions, the list of ingredients to avoid can be overwhelming. Food-Filter solves this by highlighting ingredients that are potentially dangerous based off the user's profile.

[Live Link](https://food-filter.herokuapp.com/)

## Features

* Authentication
  * OAuth(Google Authentication)
  * Users can also login locally with our application
* Food Search - Search by name and brand name
  * Based off of typed UPC
  * User's can upload a barcode image and search
* User Profile
  * Users can update their allergy list
* Product Detail (from USDA database)
  * Highlights Ingredients that User is allergic to
  * Provides Nutrition Detail

### OAuth

![Google Auth](https://github.com/jeffliang0318/food-filter/blob/master/assets/imageedit_1_2115255583.gif)

### Update User's Profile

![Update](https://github.com/jeffliang0318/food-filter/blob/master/assets/better%20update%20gif.gif)

### Product Search and Highlighted Ingredients

![Search](https://github.com/jeffliang0318/food-filter/blob/master/assets/search.gif)

### Barcode Upload

![Upload](https://github.com/jeffliang0318/food-filter/blob/master/assets/Barcode%20Search.gif)

## Technologies and Code Highlights

### Technologies

The technologies that used includes the MERN stack(MongoDB, Expresss.js, React/Redux, and Node.js). The Other technologies used include JQuery, API calls to the USDA food databases, and an image upload library to scan any bar codes. This combination of technologies will optimize the user experience and user interface. All of these technologies utilized Javascript as the language.

**Backend:**

* MongoDB
* Express
* Node.js

**Frontend:**

* React/Redux
* JQuery

**Other:**

* API calls to USDA food database [USDA NDB API](https://ndb.nal.usda.gov/ndb/doc/index)
* Image upload library to scan the barcode [QuaggaJS](https://serratus.github.io/quaggaJS/)

**Authentication**

Traditionally, user log in by providing username and password. With the rise of social networking, single sign-on using an OAuth provider, for example, Google, has become a popular authentication method. Utilizing Passport.js as authentication middleware, we created both traditional and Google authentication and were able to delegate Cookie-Session module from Node.js to the application.

To resolve validation collisions between traditional and Google authentication at model level, we incorporated Validator module form Express.js. The express-Validator enabled us not only to separate concerns between two authentications but also dynamically customize error messages.


![Auth](http://res.cloudinary.com/doohtqbau/image/upload/c_scale,w_359/v1525068520/auth_uznc9t.png)



**Search Results Stored in State**

We store our search results in state, which frees our database. Also, if the user refreshes the page, we do not need to make a second API call.

```JavaScript
export const fetch_product = upc => async dispatch => {
if (upc === "") upc = "''";
const ndbRes = await axios.get(
`https://api.nal.usda.gov/ndb/search/?format=json&q=${upc}`
);

let ndbno;

if (ndbRes.data.list) {
ndbno = ndbRes.data.list.item[0].ndbno;
const productRes = await axios.get(
`https://api.nal.usda.gov/ndb/reports/?ndbno=${ndbno}&type=b&format=json`
);

    dispatch({
      type: FETCH_PRODUCT,
      searchResults: productRes.data.report.food
    });

} else {
dispatch({
type: FETCH_PRODUCT,
searchResults: ""
});

    dispatch({
      type: FETCH_ERROR,
      errors: ndbRes.data.errors.error[0].message
    });

}
};
```

## Group Members

**TingTing Jiang, Ziyan Wang, Jeff Liang, Tiffany Shiu**

## Future Features

* [ ] Ability to use it on a mobile phone(ReactNative Application)
* [ ] Utilize another database (Allows for greater items)
* [ ] Foreign UPC codes
