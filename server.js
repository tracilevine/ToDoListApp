 // server.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path")

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
    res.status(200).send("TO DO App");
  });

  // this route will return all of the existing TO DO items
  const items = [];
  let id = 0;

  app.get("/api/items", (req, res, next) => {
    res.json(items);
  });

// this route will create a new to do item

app.post("/api/items", (req, res, next) => {
  if (req.body.item) {
    id = id + 1;
    const newItem = {
      id: id,
      item: req.body.item,
      completed: false,
    };
    items.push(newItem);
    res.json(newItem);
  } else {
    res.status(400).json({ error: "item needs a description" });
  }
});

//for checking the post request
app.patch('/api/items/:id', (req, res, next) => {
	const itemID = Number(req.params.id);
  const itemToComplete = items.find(
	  item => item.id === itemID
  )
  if (itemToComplete) {
	  const indexOfItemToComplete = items.indexOf(itemToComplete);
    itemToComplete.completed = !itemToComplete.completed;
    items.splice(indexOfItemToComplete, 1, itemToComplete);
    res.json(itemToComplete);
  } else {
    res.status(404).json({error: 'Id not found'});
  }
});
// this route will delete 
app.delete('/api/items/:id', (req, res, next) => {
	const itemID = Number(req.params.id);
  const itemToDelete = items.find(
	  item => item.id === itemID
  )
  if (itemToDelete) {
	  const indexOfItemToDelete = items.indexOf(itemToDelete);
    items.splice(indexOfItemToDelete, 1);
    res.json(itemToDelete);
  } else {
	  res.status(404).json({error: 'id not found'});
  }
});

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });