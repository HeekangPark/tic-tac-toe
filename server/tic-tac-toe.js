module.exports = {
    convertStateToBoard: function(state) {
        return [...Array(9).keys()].map(i => {
            return Math.floor(state / Math.pow(3, i)) % 3;
        });
    },
    setMarker: function(state, my_marker, pos) {
        let board = this.convertStateToBoard(state);
        if(board[pos] != 0) throw new Error("cannot place the marker on the selected position");
        return state + my_marker * Math.floor(Math.pow(3, pos));
    },
    getAvailablePos: function(state) {
        let board = this.convertStateToBoard(state);
        return [...Array(9).keys()].filter(i => {
            if (board[i] == 0) return true;
            else return false;
        });
    }
}