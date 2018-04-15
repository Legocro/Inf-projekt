const express = require("express"), 
    path = require("path"),
    app = express(),
    Public = path.join(__dirname, "Public"),
    router = express.Router(),
    multer = require("multer"),
    crypto = require("crypto"),
    save = require(path.join(__dirname, "/Controllers/DataManager")),
    storage = multer.diskStorage({
        destination: Public + "/Images/",
        filename: function (req, file, cb) {
            crypto.pseudoRandomBytes(16, function (err, raw) {
                if (err) return cb(err);
                cb(null, raw.toString("hex") + path.extname(file.originalname));
            })
        }
    }),
    uploading = multer({
        storage: storage,
        limits: {
            fileSize: 1000000,
            files: 1
        }
    });
app.post("/upload", uploading.single("image"), function (req, res) {
    console.log("Thing", req.body.category);
    save.save(req.file.filename, req.body.category);
    res.redirect("/Images/" + req.file.filename);
})
app.get("/", function (req, res) {
    res.sendFile(path.join(Public + "/HTML/index.html"));
});
app.get("/upload", function (req, res) {
    res.redirect("/");
})

app.use("/", express.static(Public));
app.listen(process.env.PORT || 3000, function () {
    console.log("YAY");
});