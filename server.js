// load the things we need
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { check, validationResult } = require("express-validator");
// set the view engine to ejs
app.set("view engine", "ejs");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));

// index page
app.get("/", function (req, res) {
    res.render("pages/index");
});

const phoneError = "Must be 10 numbers";
const emailError = "Invalid Email";
const db = require("./models");
const User = db.users;

app.post(
    "/submit",
    urlencodedParser,
    [
        check("phone", phoneError).isLength({ min: 10, max: 10 }),
        check("email", emailError).isEmail(),
    ],

    // VALIDATION
    async (req, res, next) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                throw errors.array();
            }

            next();
        } catch (err) {
            console.log(err);

            return res.render("pages/index", {
                alert: err,
            });
        }
    },

    // CONTROLLER
    async (req, res) => {
        try {
            const {
                firstName,
                lastName,
                phone,
                email,
                company,
                title,
                city,
                state,
                inquiry,
            } = req.body;

            const user = await User.findOne({ where: { email } });

            if (user) {
                throw [
                    {
                        msg: "Email is in used!",
                    },
                ];
            }

            await User.create({
                firstName,
                lastName,
                phone,
                email,
                company,
                title,
                city,
                state,
                inquiry,
            });

            return res.render("pages/index", {
                success: true,
            });
        } catch (err) {
            console.log(err);

            return res.render("pages/index", {
                alert: err,
            });
        }
    }
);

db.sequelize
    .sync()
    .then(() => {
        app.listen(8080, () => {
            console.log(`started on port 8080`);
        });
    })
    .catch((err) => console.log(err));
