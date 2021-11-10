const { User } = require("../models");

const userData = [
  {
    username: "samadams412",
    twitter: "samadams",
    email: "samueladams412@gmail.com",
    password: "password",
    interestOne: "Metallica",
    interestTwo: "ACDC",
    interestThree: "Rush",
    interestFour: "Van Halen",
    interestFive: "Mac Miller",
  },
  {
    username: "Shelby1",
    twitter: "Shelby1",
    email: "shelby@gmail.com",
    password: "password",
    interestOne: "Metallicaa",
    interestTwo: "ACDCa",
    interestThree: "Rush",
    interestFour: "Van Halen",
    interestFive: "Mac Miller",
  },
  {
    username: "Daisy42",
    twitter: "daisy42",
    email: "daisy42@gmail.com",
    password: "password",
    interestOne: "Metallica",
    interestTwo: "ACDC",
    interestThree: "Rush",
    interestFour: "Van Halen",
    interestFive: "Mac Miller",
  },
  
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;