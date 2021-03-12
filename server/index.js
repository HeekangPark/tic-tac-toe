const express = require("express");
const app = express();
let cors = require("cors");

app.use(cors());

global.__ROOT_DIR = `${__dirname}/`;

const path = require("path");
const utils = require(path.join(__ROOT_DIR, "utils"));
const logger = utils.logger("spark612 backend", (print_logger_name = false));

const randomAI = require(path.join(__ROOT_DIR, "ais/random"));
const rlAI = require(path.join(__ROOT_DIR, "ais/rl"));
const ruleBasedAI = require(path.join(__ROOT_DIR, "ais/rule-based"));

app.get("/action", async function(req, res, next) {
    let args = {
        ai: req.query.ai,
        state: req.query.state,
        marker: req.query.marker
    }

    let ai = req.query.ai.toLowerCase();
    let state = Number(req.query.state);
    let marker = Number(req.query.marker);

    if(!["random", "rl", "rule-based"].includes(ai)) {
        logger.error("Invalid param:ai", request=req, args=args);
        return res.sendStatus(404);
    }
    if(!(Number.isInteger(state) && state >= 0 && state < Math.floor(Math.pow(3, 9)))) {
        logger.error("Invalid param:state", request=req, args=args);
        return res.sendStatus(404);
    }
    if(![1, 2].includes(marker)) {
        logger.error("Invalid param:marker", request=req, args=args);
        return res.sendStatus(404);
    }

    let agent;
    switch(ai) {
        case "random": {
            agent = randomAI;
            break;
        }
        case "rl": {
            agent = rlAI;
            break;
        }
        case "rule-based": {
            agent = ruleBasedAI;
            break;
        }
    }
    
    state = await agent.action(state, marker);
    logger.success(`${ai}AI action complete - ${state}`, request=req, args=args);
    return res.status(200).json({
        state: state
    });
});

app.listen(10001, "0.0.0.0", () => {
    logger.info("Listening at http://0.0.0.0:10001");
});