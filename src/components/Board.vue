<template>
  <v-container
    class="px-0 pb-0"
  >
    <v-card>
      <v-card-title>
        게임하기
      </v-card-title>
      <v-card-text>
        <div
          class="d-flex justify-space-between align-start"
        >
          <div
            class="player flex-grow-0 d-flex flex-column align-center"
          >
            <v-avatar
              color="deep-purple accent-4"
            >
              <v-icon
                large
                color="white"
              >{{ playersInfo.player1.icon }}</v-icon>
            </v-avatar>
            <p
              class="player-name text-center"
              :class="{'text-decoration-underline': player1Turn}"
            >{{ playersInfo.player1.name }}</p>
          </div>
          <v-container>
            <v-row
              class="flex-nowrap"
              v-for="i in [0, 1, 2]"
              :key="i"
              no-gutters
              justify="center"
            >
              <v-col
                v-for="j in [0, 1, 2]"
                :key="j"
                class="flex-grow-0"
              >
                <v-card
                  class="cell d-flex justify-center align-center"
                  :class="{'highlight': cellHighlight[i*3+j]}"
                  outlined
                  @click="onBoardCellClick(i*3 + j)"
                >{{ board_in_char[i*3 + j] }}</v-card>
              </v-col>
            </v-row>
          </v-container>
          <div
            class="player flex-grow-0 d-flex flex-column align-center"
          >
            <v-avatar
              color="deep-purple accent-4"
            >
              <v-icon
                large
                color="white"
              >{{ playersInfo.player2.icon }}</v-icon>
            </v-avatar>
            <p
              class="player-name text-center"
              :class="{'text-decoration-underline': player2Turn}"
            >{{ playersInfo.player2.name }}</p>
          </div>
        </div>
        <div class="controller mt-6 d-flex justify-center">
          <v-btn
            class="mx-2"
            @click="onNewGameBtnClick"
          >New Game</v-btn>
          <v-btn
            class="mx-2"
            @click="onResetResultsBtnClick"
          >Reset Results</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Board',
  props: {
    playersInfo: Object,
    board: Array,
    cellHighlight: Array,
    whosTurn: Number
  },
  data: function() {
    return {
    }
  },
  computed: {
    board_in_char: function() {
      return this.board.map((i) => {
        switch(i) {
          case 1:
            return "O";
          case 2:
            return "X";
          default:
            return "";
        }
      });
    },
    player1Turn: function() {
      return this.whosTurn == 1;
    },
    player2Turn: function() {
      return this.whosTurn == 2;
    }
  },
  methods: {
    onBoardCellClick: function(pos) {
      this.$emit("board-cell-clicked", pos);
    },
    onNewGameBtnClick: function() {
      this.$emit("new-game-btn-clicked");
    },
    onResetResultsBtnClick: function() {
      this.$emit("reset-results-btn-clicked");
    },
  }
}
</script>

<style scoped>
.player {
  width: 5rem;
}
.cell {
  height: 7rem;
  width: 7rem;
  font-size: 3rem;
  user-select: none;
}
.cell.highlight {
  background-color: lightpink;
}
</style>