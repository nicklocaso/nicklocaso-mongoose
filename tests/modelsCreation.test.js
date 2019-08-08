"use strict";

const Database = require("../index");

console.log("Start!");

// MongoDB URL
let url = process.argv[2];
console.log("Creating connection with ", url);

// Connection creation
let database = Database(url);

// Event listeners
database.whenConnected(() => {
  console.log("Connected!!!");
});

database.whenDisconnected(() => {
  console.log("Disconnected!!!");
});

// Schema and Model creation
database.createSchema("Animal", {
  name: { type: String },
  race: { type: String }
});

let Animal = database.createModel("Animal");

// Instance creation
let animals = [
  new Animal({ name: "Jym", race: "cat" }),
  new Animal({ name: "Skatty", race: "cat" }),
  new Animal({ name: "Bobo", race: "dog" })
];

// Saving all instances
for (let index = 0; index < animals.length; index++) {
  animals[index].save(function(err, animal) {
    if (err) console.log("ERR: ", err);
    console.log("Saved: ", animal);
  });
}
