# Food-Filter

**Food-Filter is a project aiming to find food items based off of the user's own preference**

## Background and Overview

Individuals with restricted diets or with many allergies will often spend time going through the ingredients of products to figure out if they are able to consume it. Our project aims to highlight these ingredients that they cannot consume but also help the user find a quick and easy way for them to verify it. Our audience includes those with a restricted diet or those with food allergies.

According to Food Allergy Research & Education organization, individuals with a peanut allergy need to avoid ingredients that also have the name of arachis oil, lipin, mandelonas, peanut protein hydrolysate, goobers, etc. As one can see, there are many other ingredients to pay attention to besides the simple word of 'peanuts'. Also, if the user has many allergies or food restrictions, the list of ingredients to avoid can be overwhelming. Food-Filter solves this by simply telling you if the product is safe.

[Live Link](https://food-filter.herokuapp.com/)

## Features 

* Authentification
  * OAuth(Google Authentification)
  * Users can also login locally with our application
* Food Search - Search by name and brand name
  * Based off of typed UPC
  * User's can upload a barcode image and search
* User Profile
  * Users can update their allergy list
* Product Detail (from USDA database)
  * Highlights Ingredients that User is allergic to
  * Provides Nutrition Detail

## Technologies and Technical Challenges

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
* Image upload library to scan the bar code [QuaggaJS](https://serratus.github.io/quaggaJS/)

### Technical Challenges

The technical Challenges for this website will be:

* Connecting our backend to front end
* Consistent State Shape
* Creating an attractive UI for seamless UX for user satisfaction


## Group Members

**TingTing Jiang, Ziyan Wang, Jeff Liang, Tiffany Shiu**

## ToDo's

* [ ] Ability to use it on a mobile phone(ReactNative Application) 
* [ ] Utilize another database (Allows for greater items)
* [ ] Foreign UPC codes


