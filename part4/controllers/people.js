const peopleRouter = require("express").Router();
const Person = require("../models/person");

peopleRouter.get('/info', async (req, res) => {
    const count = await Person.countDocuments();
    res.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`)
  });
  
peopleRouter.get('/', (req, res) => {
    Person.find({}).then(people => {
        res.json(people);
    });
});
  
peopleRouter.get("/:id", (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if (person) {
        res.json(person);
        } else{
        res.status(404).end();
        }
    })
    .catch(error => next(error));
});
  
peopleRouter.delete("/:id", (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(() => {
        res.status(204).end();
    })
    .catch(error => next(error));
});
  
peopleRouter.post("/", async (req, res, next) => {
    const body = req.body;
  
    if (!body.name || !body.number) {
      return res.status(400).json({ error: "name or number are missing" });
    }
  
    const existingPerson = await Person.findOne({ name: body.name });
  
    if (existingPerson) {
      return res.status(409).json({ error: "name must be unique" });
    }
  
    const person = new Person({
      name: body.name,
      number: body.number || 0,
    });
  
    await person.save()
      .then(savedPerson => {
        res.json(savedPerson)
      })
      .catch(error => next(error));
});
  
peopleRouter.put('/:id', (req, res, next) => {
    const { name, number } = req.body;
  
    Person.findByIdAndUpdate(req.params.id, { name, number }, { new: true, runValidators: true, context: "query" }) //new: true => called with the new person values
        .then(updatedPerson => {
        res.json(updatedPerson);
        })
        .catch(error => next(error));
});

module.exports = peopleRouter;