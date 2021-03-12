const path = require("path");
const ttt = require(path.join(__ROOT_DIR, "tic-tac-toe"));

module.exports = {
    action: function(state, marker) {
        let availablePos = ttt.getAvailablePos(state);
        return ttt.setMarker(state, marker, availablePos[Math.floor(Math.random() * availablePos.length)]);
    }
}