Vue.component('snackbar', {
    props: {
      open: { type: Boolean, default: false },
      text: { type: String, default: "" },
      color: { type: String, default: "success" },
    },
    data: function () {
      return {
        timeout: 2000,
      }
    },
    computed: {
      openSnack: {
        get: function() {
          return this.open;
        },
        set: function(val) {
          this.$emit("close", val);
        },
      },
    },
    template: `
    <v-snackbar v-model="openSnack" :timeout="timeout"
        
        right
        :color="color"
        >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn  icon v-bind="attrs" @click="$emit('close', false)">
          <v-icon small dark>
            mdi-close
          </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    `,
  })
  
  