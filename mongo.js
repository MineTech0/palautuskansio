
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://FullStack:${password}@cluster0.renhk.mongodb.net/FullStackBackend?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


const Person = mongoose.model('Person', new mongoose.Schema({
    name: String,
    number: String
}))

if (process.argv.length > 3) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(response => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}
else {
    Person
        .find({})
        .then(persons => {
            persons.forEach(person => {
                console.log(person.name + ' ' + person.number)
            })
            mongoose.connection.close()
        })
}

