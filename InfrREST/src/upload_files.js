var express = require("express");
var app = express();
var multer = require("multer");
var cors = require("cors");

app.use(cors());

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    user: "infra",
    password: "manager",
    database: "infrared"
});
	  connection.connect();
	  console.log("db connect successfully.");
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	cb(null, '/home/ypwang/var/www/html/images')
        },
    	filename: function (req, file, cb) {
	  cb(null, file.originalname)
	  let location = "http://133.18.23.48:8080/images/" + file.originalname;
	  console.log("location=" + location);
	  connection.query("INSERT INTO image VALUES(NULL,222222,sysdate(),1,'" + location + "','test','test');", (err, results) => {
	    if (err) { console.log("err:" + err); }
         });
	}
})

var upload = multer({storage: storage}).array("file")

app.post('/upload', function(req, res) {

    upload(req, res, function (err) {
	if (err instanceof multer.MulterError) {
	    return res.status(500).json(err)
	} 
	else if (err) {
	    return res.status(500).json(err)
	}
      return res.status(200).send(req.file)
    })
});

app.listen(3003, function() {
    console.log('App running on port 3003');
});
