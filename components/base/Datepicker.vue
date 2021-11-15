<template>
  <div>
    <client-only>
      <div v-if="$vuetify.breakpoint.xsOnly && landscape">
        <v-dialog v-model="dialog" content-class="ma-3" min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field
              v-bind="$attrs"
              v-model="datePicker.value"
              v-on="on"
              readonly
            >
              <template v-slot:label>
                <slot name="label"></slot>
              </template>
            </v-text-field>
          </template>
          <v-date-picker
            ref="picker"
            @input="
              datePickerInput($event)
              dialog = false
            "
            :landscape="landscape"
            :value="datePicker.value"
          >
          </v-date-picker>
        </v-dialog>
      </div>
      <div v-else-if="$vuetify.breakpoint.xsOnly && !landscape">
        <v-dialog
          ref="dialogPotrait"
          :return-value.sync="datePicker.value"
          v-model="dialog"
          content-class="ma-3"
          persistent
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-bind="$attrs"
              v-model="datePicker.value"
              v-on="on"
              readonly
            >
              <template v-slot:label>
                <slot name="label"></slot>
              </template>
            </v-text-field>
          </template>
          <v-date-picker
            ref="picker"
            @input="datePickerInput($event)"
            :landscape="landscape"
            :value="datePicker.value"
          >
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false" text> Cancel </v-btn>
            <v-btn @click="$refs.dialogPotrait.save(datePicker.value)" text>
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </div>
      <div v-else>
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          :return-value.sync="datePicker.value"
          v-model="menu"
          min-width="290px"
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              @change="datePickerChange()"
              v-bind="$attrs"
              v-model="datePicker.value"
              v-on="on"
              readonly
            >
              <template v-slot:label>
                <slot name="label"></slot>
              </template>
            </v-text-field>
          </template>
          <v-date-picker
            ref="picker"
            @input="datePickerInput($event)"
            :value="datePicker.value"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn @click="menu = false" text> Cancel </v-btn>
            <v-btn @click="$refs.menu.save(datePicker.value)" text> OK </v-btn>
          </v-date-picker>
        </v-menu>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    birthday: {
      default: false,
      type: Boolean,
    },
    value: {
      default: null,
      type: [String],
    },
  },
  data() {
    return {
      datePicker: {
        value: this.value,
      },
      dialog: false,
      landscape: false,
      menu: false,
    }
  },
  watch: {
    dialog(val) {
      if (this.birthday) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
    menu(val) {
      if (this.birthday) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
    value: function (value) {
      this.datePicker.value = value
    },
  },
  mounted() {
    this.windowOrientationchange()

    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('orientationchange', () => {
      this.windowOrientationchange()
    })
  },
  destroyed() {
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('orientationchange', () => {
      this.windowOrientationchange()
    })
  },
  methods: {
    datePickerChange(date) {
      this.$refs.menu.save(date)
    },
    datePickerInput(value) {
      this.$emit('input', value)
    },
    windowOrientationchange() {
      this.landscape = window.orientation === 90
    },
  },
}
</script>
