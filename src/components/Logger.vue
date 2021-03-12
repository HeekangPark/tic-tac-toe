<template>
  <v-container>
    <v-card
      class="logger-card"
    >
      <v-card-title>
        Message Log
      </v-card-title>
      <v-card-text>
        <v-text-field
          readonly
          hide-details=true
          v-model="message.content"
          prepend-icon="mdi-message-alert"
        ></v-text-field>
        <div
          class="history mt-3"
          v-html="historyInHtml"
        ></div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Logger',
  props: {
  },
  data: function() {
    return {
      message: {
        content: "",
        time: null
      },
      history: []
    }
  },
  computed: {
    historyInHtml: function() {
      return [...this.history].reverse().filter((x) => {
        if(!x.content || x.content.length == 0 || x.time === null) return false;
        return true;
      }).map((x) => {
        return `<p class="message-line mb-0" style="display: grid; grid-template-columns: auto 1fr; column-gap: 1rem;">
          <span class="time grey--text text--lighten-1">${this.formatTime(x.time)}</span>
          <span class="content grey--text text--darken-2">${x.content}</span>
        </p>`
      }).join("\n");
    }
  },
  methods: {
    formatTime: function(time) {
      function fitToDigit(num, digit) {
        num = num.toString();
        while(num.length < digit) num = "0" + num;
        return num;
      }

      return `${fitToDigit(time.getFullYear(), 4)}-${fitToDigit(time.getMonth() + 1, 2)}-${fitToDigit(time.getDate(), 2)} ${fitToDigit(time.getHours(), 2)}:${fitToDigit(time.getMinutes(), 2)}:${fitToDigit(time.getSeconds(), 2)}`;
    },
    printMessage: function(message_content) {
      if(this.message.time != null) {
        this.history.push(this.message);
      }
      this.message = {
        content: message_content,
        time: new Date()
      }
    },
    clearMessageHistory: function() {
      this.message = {
        content: "",
        time: null
      };
      this.history = [];
    }
  }
}
</script>

<style scoped>
.logger-card {
  max-height: 53rem;
  overflow-y: auto;
}
</style>