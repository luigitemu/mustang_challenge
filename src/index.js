const app = require('./App');
const port = 3000;


app.listen(port, err => {
    if (err) {
        console.error("Error: ", err);
        return;
    }
    console.log(`Listening on port :${port}`);
});


