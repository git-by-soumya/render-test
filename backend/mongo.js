const mongoose = require("mongoose");

if(process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const password = process.argv[2];
const url = `mongodb+srv://fso-soumya-mongodb:${password}@cluster0.noubdn2.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

/*
const note1 = new Note({
    content: "HTML is easy",
    important: true,
});

const note2 = new Note({
    content: "CSS is hard",
    important: true,
});

const note3 = new Note({
    content: "Mongoose makes things easy",
    important: true,
});

Promise
    .allSettled([
        note1.save(),
        note2.save(),
        note3.save(),
    ])
    .then(results => {
        results.forEach((result, index) => {
            if(result.status === "fulfilled") {
                console.log(`Note ${index + 1} saved:`, result.value);
            } else {
                console.error(`Note ${index + 1} failed:`, result.reason);
            }
        });
    })
    .catch(error => {
        console.error("SOME ERROR OCCURRED", error);
    })
    .finally(() => mongoose.connection.close());
*/

//find all notes
/*Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note);
    });
    mongoose.connection.close();
});*/

//find important notes
Note.find({ important: true, }).then(result => {
  result.forEach(note => {
    console.log(note);
  });
  mongoose.connection.close();
});