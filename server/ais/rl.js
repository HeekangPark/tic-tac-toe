const fs = require("fs").promises;
const path = require("path");

const ttt = require(path.join(__ROOT_DIR, "tic-tac-toe"));
const utils = require(path.join(__ROOT_DIR, "utils"));
const logger = utils.logger("spark612 backend", (print_logger_name = false));
const config = require(path.join(__ROOT_DIR, "config"));

module.exports = {
    action: async function(state, marker) {
        let values_file;
        try {
            values_file = await fs.readFile(path.join(__ROOT_DIR, config.rl_values_file));
        } catch(e) {
            throw e;
        }

        let values = values_file.toString().split("\n").map((x) => {
            return Number(x);
        });
        let availablePos = ttt.getAvailablePos(state);
        let possibleStates = availablePos.map((x) => {
            return ttt.setMarker(state, marker, x);
        });
        let possibleValues = possibleStates.map((x) => {
            return values[x];
        });
        let maxValue = Math.max(...possibleValues);
        let candidateStates = [...Array(possibleValues.length).keys()].filter((i) => {
            if(possibleValues[i] == maxValue) return true;
            else return false;
        }).map((i) => {
            return possibleStates[i];
        });
        
        return candidateStates[Math.floor(Math.random() * candidateStates.length)];
    }
}