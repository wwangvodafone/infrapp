const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.post("/question", (req, res) => {
    const calc = req.body;
    console.log("question");
    console.log(`[${new Date()}] request = [${JSON.stringify(calc)}]`);

    const operator = calc.operator;
    const a = calc.a;
    const b = calc.b;

    const calculator = () => {
        if (operator === "+") {
            return a + b;
        } else if (operator === "-") {
            return a - b;
        } else if (operator === "*") {
            return a * b;
        } else if (operator === "/") {
            return a / b;
        } else {
            return `Unknown operator[${operator}]`;
        }
    };
    
    res.json({"result": calculator()});
});

app.listen(3002);
