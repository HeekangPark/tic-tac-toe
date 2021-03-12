<template>
  <v-container
    class="px-0"
  >
    <v-card>
      <v-card-title>
        AI 선택
      </v-card-title>
      <v-card-text>
        <v-radio-group
          v-model="selectedAI"
          hide-details=true
          class="mt-0"
          :disabled="isPlaying"
        >
          <v-radio
            v-for="(ai, i) in ais"
            :key="ai.name"
            :label="`${ai.name} AI : ${ai.description}`"
            :value="i"
          ></v-radio>
        </v-radio-group>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'SelectAI',
  props: {
    selectedAiProp: Number,
    isPlaying: Boolean,
    ais: Array
  },
  data: function() {
    return {
      selectedAI: this.selectedAiProp
    }
  },
  watch: {
    selectedAI: function(newVal) {
      this.$emit("ai-selection-changed", newVal);
    }
  },
  methods: {
  },
  
}
</script>

<style scoped>
</style>