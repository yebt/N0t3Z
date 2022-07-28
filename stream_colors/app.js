const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

//----------------------------------------------------------------------------------------------------------------------
// db
var sqlite3 = require("sqlite3").verbose();
// const dbpath = './src/db/colordb';
const dbpath = "./src/db/colordb.db";
var db = new sqlite3.Database(dbpath);

// get all colorschemes
async function getAllColorSchemes() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM colorscheme", (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
// get paginate colorschemes
async function getPaginateColorSchemes(page, limit) {
    return new Promise((resolve, reject) => {
        db.all(
            "SELECT * FROM colorscheme LIMIT ? OFFSET ?",
            [limit, page * limit],
            function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
}

// save colorscheme
async function saveColorScheme(colorscheme) {
    colorscheme.colors = JSON.stringify(colorscheme.colors);
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO colorscheme (name,description, colors) VALUES (?, ?,?)",
            colorscheme.name,
            colorscheme.description,
            colorscheme.colors,
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            }
        );
    });
}
// update colorscheme
async function updateColorScheme(colorscheme) {
    return new Promise((resolve, reject) => {
        db.run(
            "UPDATE colorscheme SET name = ?, description = ?, colors = ? WHERE id = ?",
            colorscheme.name,
            colorscheme.description,
            colorscheme.colors,
            colorscheme.id,
            function (err) {
                reject(err);
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            }
        );
    });
}
// delete colorscheme
async function deleteColorScheme(id) {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM colorscheme WHERE id = ?", id, function (err) {
            reject(err);
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    });
}

// get colorscheme by id
async function getColorSchemeById(id) {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM colorscheme WHERE id = ?", id, function (err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

//----------------------------------------------------------------------------------------------------------------------

// return all colorschemes
app.get("/", async (_req, res) => {
    // get all colorschemes from db
    let meesage = "success";
    const colorschemes = await getAllColorSchemes()
        .then((rows) => {
            return rows;
        })
        .catch((err) => {
            console.log(err);
            meesage = "error";
        });

    // const colorschemes = await getAllColorSchemes();
    // reparse each color
    for (const prop in colorschemes) {
        colorschemes[prop].colors = JSON.parse(colorschemes[prop].colors);
    }
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ result: meesage, data: colorschemes }));
});

// return page of colorschemes
app.get("/page/:page/:limit", async (req, res) => {
    // get page and limit from url
    const page = req.params.page;
    const limit = req.params.limit;
    // get page of colorschemes from db
    let meesage = "success";
    const colorschemes = await getPaginateColorSchemes(page, limit)
        .then((rows) => {
            return rows;
        })
        .catch((err) => {
            console.log(err);
            meesage = "error";
        });
    // reparse each color
    for (const prop in colorschemes) {
        colorschemes[prop].colors = JSON.parse(colorschemes[prop].colors);
    }
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ result: meesage, data: colorschemes }));
});

//  return colorscheme by id
app.get("/colorscheme/:id", async (req, res) => {
    // get id from url
    const id = req.params.id;
    // get colorscheme by id from db
    let meesage = "success";
    const colorscheme = await getColorSchemeById(id)
        .then((rows) => {
            return rows;
        })
        .catch((err) => {
            console.log(err);
            meesage = "error";
        });
    // reparse each color
    if (!!colorscheme) {
        colorscheme.colors = JSON.parse(colorscheme.colors);
    }
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ result: meesage, data: colorscheme }));
});

// save colorscheme
app.post("/", async (req, res) => {
    // get colorscheme from body
    const colorscheme = req.body;
    // save colorscheme to db
    let meesage = "success";
    const id = await saveColorScheme(colorscheme)
        .then((id) => {
            return id;
        })
        .catch((err) => {
            console.log(err);
            meesage = "error";
        });
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ result: meesage, id: id }));
});
// update colorscheme
app.put("/", async (req, res) => {
    // get colorscheme from body
    const colorscheme = req.body;
    // update colorscheme in db
    let meesage = "success";
    const changes = await updateColorScheme(colorscheme)
        .then((changes) => {
            return changes;
        })
        .catch((err) => {
            console.log(err);
            meesage = "error";
        });
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ result: meesage, data: changes }));
});
// delete colorscheme
app.delete("/:id", async (req, res) => {
    // get id from url
    const id = req.params.id;
    // delete colorscheme from db
    let meesage = "success";
    const changes = await deleteColorScheme(id)
        .then((changes) => {
            return changes;
        })
        .catch((err) => {
            console.log(err);
            meesage = "error";
        });
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ result: meesage, data: changes }));
});

// save a new colorshcheme

// app.post('/',  (_req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     let oldData = '';
//     res.send({'result': 'ok', 'newdata': oldData});
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// {
//   name: 'gruv',
//   description: 'Is a green color scheme',
//   scheme: [
//     { hex: '#ede0d4', rgb: '', fg: '', name: '' },
//     { hex: '#e6ccb2', rgb: '', fg: '', name: '' },
//     { hex: '#ddb892', rgb: '', fg: '', name: '' },
//     { hex: '#b08968', rgb: '', fg: '', name: '' },
//     { hex: '#7f5539', rgb: '', fg: '', name: '' },
//     { hex: '#9c6644', rgb: '', fg: '', name: '' }
//   ]
// }
