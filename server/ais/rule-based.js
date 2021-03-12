const fs = require("fs").promises;
const path = require("path");

const ttt = require(path.join(__ROOT_DIR, "tic-tac-toe"));
const utils = require(path.join(__ROOT_DIR, "utils"));
const logger = utils.logger("spark612 backend", (print_logger_name = false));
const config = require(path.join(__ROOT_DIR, "config"));

module.exports = {
    action: async function(state, marker) {
        let board = ttt.convertStateToBoard(state);
        
        let opposite_marker = 3 - marker;
        let win_cases = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        //about to win
        for(let win_case of win_cases) {
            if(board[win_case[0]] == 0 && board[win_case[1]] == marker && board[win_case[2]] == marker) {
                return ttt.setMarker(state, marker, win_case[0]);
            } else if (board[win_case[1]] == 0 && board[win_case[2]] == marker && board[win_case[0]] == marker) {
                return ttt.setMarker(state, marker, win_case[1]);
            } else if (board[win_case[2]] == 0 && board[win_case[0]] == marker && board[win_case[1]] == marker){
                return ttt.setMarker(state, marker, win_case[2]);
            }
        }

        //has to defend
        for(let win_case of win_cases) {
            if(board[win_case[0]] == 0 && board[win_case[1]] == opposite_marker && board[win_case[2]] == opposite_marker) {
                return ttt.setMarker(state, marker, win_case[0]);
            } else if (board[win_case[1]] == 0 && board[win_case[2]] == opposite_marker && board[win_case[0]] == opposite_marker) {
                return ttt.setMarker(state, marker, win_case[1]);
            } else if (board[win_case[2]] == 0 && board[win_case[0]] == opposite_marker && board[win_case[1]] == opposite_marker){
                return ttt.setMarker(state, marker, win_case[2]);
            }
        }

        //if center is empty, set marker on it
        if(board[4] == 0) {
            return ttt.setMarker(state, marker, 4);
        }
        
        //if edge is empty, set marker on it
        let edges = [0, 2, 6, 8];
        for(let edge of edges) {
            if (board[edge] == 0) {
                return ttt.setMarker(state, marker, edge);
            }
        }

        //otherwise, set marker randomly
        let availablePos = ttt.getAvailablePos(state);
        return ttt.setMarker(state, marker, availablePos[Math.floor(Math.random() * availablePos.length)]);
    }
}