<template>
  <v-container
    class="px-0 pt-0"
  >
    <v-alert
      prominent
      type="info"
      dismissible
      v-if="gameResult == 0"
    >Tie</v-alert>
    <v-alert
      prominent
      type="success"
      dismissible
      v-if="gameResult == 1"
    >{{ playersInfo.player1.name }} win.</v-alert>
    <v-alert
      prominent
      type="success"
      dismissible
      v-if="gameResult == 2"
    >{{ playersInfo.player2.name }} win.</v-alert>
    <v-card
      class="mt-6"
    >
      <v-card-title>
        게임 결과
      </v-card-title>
      <v-card-text
        class="result mt-6 d-flex justify-space-arround justify-center"
      >
        <v-text-field
          :messages="[`${playersInfo.player1.name} Win`]"
          class="result-field flex-grow-0 mx-2"
          v-model="player1Win"
          readonly
        ></v-text-field>
        <v-text-field
          :messages="[`${playersInfo.player2.name} Win`]"
          class="result-field flex-grow-0 mx-2"
          v-model="player2Win"
          readonly
        ></v-text-field>
        <v-text-field
          :messages="['Tie']"
          class="result-field flex-grow-0 mx-2"
          v-model="tie"
          readonly
        ></v-text-field>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'GameResult',
  components: {
  },
  props: {
    playersInfo: Object,
    gameResult: Number,
    player1Win: Number,
    player2Win: Number,
    tie: Number
  },
  data: function() {
    return {
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
  }
}
</script>

<style scoped>
.result-field {
  width: 7rem;
}
.result-field >>> .v-text-field__slot input {
  text-align: center !important;
}
.result-field >>> .v-messages__message {
  text-align: center !important;
}
</style>