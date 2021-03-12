<template>
  <v-container>
    <Board 
      :board="board"
      :players-info="playersInfo"
      :whos-turn="whosTurn"
      :cell-highlight="cellHighlight"
      @board-cell-clicked="onClickBoardCell"
      @new-game-btn-clicked="onClickNewGameBtn"
      @reset-results-btn-clicked="onClickResetResultsBtn"
    />
    <GameResult
      :players-info="playersInfo"
      :game-result="gameResult"
      :player1-win="player1Win"
      :player2-win="player2Win"
      :tie="tie"
    />
  </v-container>
</template>

<script>
import Board from './Board';
import GameResult from './GameResult';

export default {
  name: 'DoublePlayer',
  components: {
    Board,
    GameResult
  },
  props: {
  },
  data: function() {
    return {
      playersInfo: {
        player1: {
          icon: "mdi-account-circle",
          name: "Player 1"
        },
        player2: {
          icon: "mdi-account-circle",
          name: "Player 2"
        }
      },
      whosTurn: 0,
      state: 0,
      stateHistory: [],
      player1Win: 0,
      player2Win: 0,
      tie: 0,
      isPlaying: false,
      gameResult: -1,
      cellHighlight: [...Array(9).keys()].map(() => {
        return false;
      }),
    }
  },
  computed: {
    board: function() {
      return [...Array(9).keys()].map((i) => {
        return Math.floor(this.state / Math.pow(3, i)) % 3;
      });
    },
  },
  methods: {
    onClickNewGameBtn: function() {
      this.isPlaying = true;
      this.state = 0;
      this.stateHistory = [];
      this.gameResult = -1;
      this.resetCellHighlight();
      this.whosTurn = Math.floor(Math.random() * 10) % 2 + 1;
      if(this.whosTurn == 1) {
        this.$emit("print-message", `${this.playersInfo.player1.name}'s turn.`);
      } else if (this.whosTurn == 2) {
        this.$emit("print-message", `${this.playersInfo.player2.name}'s turn.`);
      }
    },
    onClickResetResultsBtn: function() {
      this.player1Win = 0;
      this.player2Win = 0;
      this.tie = 0;
    },
    onClickBoardCell: function(pos) {
      if(this.isPlaying == false) {
        this.$emit("print-message", "Game not started.");
        this.$emit("print-message", "To start a game, please press \"New Game\" button.");
        return;
      }

      if(this.board[pos] != 0) {
        this.$emit("print-message", "Cannot place a marker on the selected position.");
        return;
      }

      this.state = this.setMarker(pos, this.whosTurn);
      this.stateHistory.push(this.state);
      
      this.gameResult = this.calcGameResult();
      if(this.gameResult != -1) {
        this.stopGame();
      } else {
        this.whosTurn = 3 - this.whosTurn;
        let player_name = (this.whosTurn == 1 ? this.playersInfo.player1.name : this.playersInfo.player2.name);
        this.$emit("print-message", `${player_name}'s turn.`);
      }
    },
    setMarker: function(pos, marker) {
      return this.state + marker * Math.floor(Math.pow(3, pos));
    },
    getAvailablePos: function() {
      return [...Array(9).keys()].filter((i) => {
        if (this.board[i] == 0) return true;
        else return false;
      });
    },
    calcGameResult: function() {
      for(let marker of [1, 2]) {
        if (this.board[0] == marker && this.board[1] == marker && this.board[2] == marker) {
          this.setCellHighlight([0, 1, 2]);
          return marker;
        } else if (this.board[3] == marker && this.board[4] == marker && this.board[5] == marker) {
          this.setCellHighlight([3, 4, 5]);
          return marker;
        } else if (this.board[6] == marker && this.board[7] == marker && this.board[8] == marker) {
          this.setCellHighlight([6, 7, 8]);
          return marker;
        } else if (this.board[0] == marker && this.board[3] == marker && this.board[6] == marker) {
          this.setCellHighlight([0, 3, 6]);
          return marker;
        } else if (this.board[1] == marker && this.board[4] == marker && this.board[7] == marker) {
          this.setCellHighlight([1, 4, 7]);
          return marker;
        } else if (this.board[2] == marker && this.board[5] == marker && this.board[8] == marker) {
          this.setCellHighlight([2, 5, 8]);
          return marker;
        } else if (this.board[2] == marker && this.board[4] == marker && this.board[6] == marker) {
          this.setCellHighlight([2, 4, 6]);
          return marker;
        } else if (this.board[0] == marker && this.board[4] == marker && this.board[8] == marker) {
          this.setCellHighlight([0, 4, 8]);
          return marker;
        }
      }
      if(this.getAvailablePos().length == 0) {
        this.setCellHighlight([0, 1, 2, 3, 4, 5, 6, 7, 8]);
        return 0;
      }

      return -1;
    },
    stopGame: async function() {
      this.isPlaying = false;
      this.whosTurn = 0;

      if(this.gameResult == 1) {
        this.player1Win += 1;
        this.$emit("print-message", `${this.playersInfo.player1.name} win.`);
      } else if (this.gameResult == 2) {
        this.player2Win += 1;
        this.$emit("print-message", `${this.playersInfo.player2.name} win.`);
      } else if (this.gameResult == 0) {
        this.tie += 1;
        this.$emit("print-message", `Tie.`);
      }
    },
    setCellHighlight: function(pos_arr) {
      for(let pos of pos_arr) {
        this.cellHighlight[pos] = true;
      }
    },
    resetCellHighlight: function() {
      this.cellHighlight = [...Array(9).keys()].map(() => {
        return false;
      });
    },
  }
}
</script>

<style scoped>
</style>