<template>
  <v-app>
    <v-app-bar
      app
      color="deep-purple accent-4"
      dark
    >
      <v-container
        class="py-3 fill-height"
      >
        <div class="title d-flex align-baseline">
          <p class="text-h5 text-uppercase">Tic Tac Toe Demo</p>
          <p class="text-subtitle-2 ml-3">by Heekang Park</p>
        </div>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container class="main">
        <div>
          <SelectMode
            :prop-mode="mode"
            @mode-updated="updateMode"
          />
          <SinglePlayer
            v-if="mode == 'single'"
            @print-message="printMessage"
          />
          <DoublePlayer
            v-if="mode == 'double'"
            @print-message="printMessage"
          />
        </div>
        <div>
          <Logger
            ref="logger"
          />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SelectMode from './components/SelectMode';
import SinglePlayer from './components/SinglePlayer';
import DoublePlayer from './components/DoublePlayer';
import Logger from './components/Logger';

export default {
  name: 'App',
  components: {
    SelectMode,
    SinglePlayer,
    DoublePlayer,
    Logger
  },
  data: () => ({
    mode: "double"
  }),
  methods: {
    updateMode: function(mode) {
      this.$refs.logger.clearMessageHistory();
      this.mode = mode;
      this.$refs.logger.printMessage(`${this.mode.charAt(0).toUpperCase() + this.mode.slice(1)} mode selected.`);
    },
    printMessage: function(message) {
      this.$refs.logger.printMessage(message);
    }
  }
};
</script>

<style lang="scss">
html {
  overflow: auto;
}
.main {
  display: grid;
  grid-template-columns: 1fr 30rem;
}
</style>