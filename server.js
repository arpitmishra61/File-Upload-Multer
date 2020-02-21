const express = require("express");
const app = express()
const exhbs = require("express-handlebars")
const multer = require("multer")
const path = require("path")


app.set("view engine", "handlebars")
app.engine("handlebars", exhbs())

app.use(express.static("public"))
const storeMulter = multer.diskStorage({
    destination: "./public/uploads",
    filename: function (req, file, cb) {
        cb(null, file.originalname + "_" + new Date().toUTCString().replace(/:/g, '-') + "IN" + path.extname(file.originalname))


    }

})
const upload = multer({ storage: storeMulter })
app.get("/", (req, res) => {
    res.render("home")
})

app.post("/", upload.single('file'), (req, res, next) => {
    console.log(req.file)
    res.send("posted..")

    next()

})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is started at the port " + PORT)
})