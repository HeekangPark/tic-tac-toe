<template>
  <v-container>
    <v-card>
      <v-card-title>
        모드 선택
      </v-card-title>
      <v-card-text class="d-flex justify-center">
        <v-btn
            class="mx-10"
            :class="{primary: isSinglePlayerModeActivated }"
            @click="setMode('single')"
        >Single Player</v-btn>
        <v-btn
            class="mx-10"
            :class="{primary: isDoublePlayerModeActivated }"
            @click="setMode('double')"
        >Double Players</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'SelectMode',
  props: {
    propMode: String
  },
  data: function() {
    return {
      mode: this.propMode,
    }
  },
  computed: {
    isSinglePlayerModeActivated: function() {
        return this.mode == "single";
    },
    isDoublePlayerModeActivated: function() {
        return this.mode == "double";
    }
  },
  methods: {
    setMode: function(mode) {
      this.mode = mode;
      this.$emit("mode-updated", mode);
    }
  }
}
</script>

<style scoped>
</style>