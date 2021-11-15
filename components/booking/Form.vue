<template>
  <client-only>
    <form @submit.prevent="submit()">
      <v-card class="mb-3 pa-4">
        <v-row no-gutters>
          <v-col v-if="$vuetify.breakpoint.smAndUp" cols="2"> Tour * </v-col>
          <v-col :cols="$vuetify.breakpoint.smAndUp ? 10 : 12">
            <v-select
              :error="field.tour_id.error"
              :error-messages="field.tour_id.errorMessages"
              :items="tourItems"
              item-value="id"
              item-text="name"
              v-model="field.tour_id.value"
              placeholder="Select Tour"
              dense
              outlined
              @input="selectTour"
            >
              <template v-slot:label>
                <template v-if="$vuetify.breakpoint.xsOnly"> Tour * </template>
              </template>
            </v-select>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col v-if="$vuetify.breakpoint.smAndUp" cols="2">
            Tour Date *
          </v-col>
          <v-col :cols="$vuetify.breakpoint.smAndUp ? 10 : 12">
            <v-select
              :error="field.tour_date.error"
              :error-messages="field.tour_date.errorMessages"
              :items="availableTourDateItems"
              item-value="date"
              item-text="date"
              v-model="field.tour_date.value"
              placeholder="Select Tour Date"
              dense
              outlined
              loading="true"
            >
              <template v-slot:label>
                <template v-if="$vuetify.breakpoint.xsOnly">
                  Tour Date *
                </template>
              </template>
            </v-select>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col v-if="$vuetify.breakpoint.smAndUp" cols="2">
            Passenger *
          </v-col>
          <v-col :cols="$vuetify.breakpoint.smAndUp ? 10 : 12">
            <v-data-table
              :headers="table_booking_passenger.headers"
              :items="field.booking_passenger.value"
              :items-per-page="5"
              hide-default-footer
              class="hd-table elevation-1"
            >
              <template v-slot:[`item.given_name`]="{ item }">
                <v-combobox
                  v-model="item.given_name"
                  :items="passengerItems"
                  item-value="given_name"
                  item-text="given_name"
                  dense
                  filled
                  outlined
                  solo
                  :return-object="false"
                  @input="
                    selectPassenger(field.booking_passenger.value.indexOf(item))
                  "
                ></v-combobox>
              </template>

              <template v-slot:[`item.surname`]="{ item }">
                <v-text-field v-model="item.surname" dense outlined>
                </v-text-field>
              </template>

              <template v-slot:[`item.email`]="{ item }">
                <v-text-field v-model="item.email" dense outlined>
                </v-text-field>
              </template>

              <template v-slot:[`item.mobile`]="{ item }">
                <v-text-field v-model="item.mobile" dense outlined>
                </v-text-field>
              </template>

              <template v-slot:[`item.passport`]="{ item }">
                <v-text-field v-model="item.passport" dense outlined>
                </v-text-field>
              </template>

              <template v-slot:[`item.birth_date`]="{ item }">
                <Datepicker
                  v-model="item.birth_date"
                  dense
                  hide-details="auto"
                  outlined
                  prepend-inner-icon="mdi-calendar"
                />
              </template>

              <template v-slot:[`item.special_request`]="{ item }">
                <v-textarea v-model="item.special_request" dense outlined>
                </v-textarea>
              </template>

              <template v-slot:[`item.id`]="{ item }">
                <!-- <div class="d-flex align-center justify-center"> -->
                <v-btn
                  @click="
                    removeItem(field.booking_passenger.value.indexOf(item))
                  "
                  v-bind="attrs"
                  v-on="on"
                  icon
                  small
                  link
                >
                  <v-icon size="18">{{ icons.mdiClose }}</v-icon>
                </v-btn>
                <!-- </div> -->
              </template>
            </v-data-table>
            <v-btn color="primary" class="mt-3" outlined @click="addNewItem">
              <span>Add Passenger</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </form>
  </client-only>
</template>

<script>
import { mdiClose } from '@mdi/js'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: {
    Datepicker: () => import('~/components/base/Datepicker'),
  },
  props: {
    value: {
      type: Object,
      default: null,
    },
    default_booking_passenger_value: {
      type: Object,
      default: () => ({
        id: null,
        passenger_id: null,
        special_request: '',
        given_name: '',
        surname: '',
        email: '',
        mobile: '',
        passport: '',
        birth_date: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
      }),
    },
  },
  data() {
    return {
      icons: {
        mdiClose,
      },
      field: {
        id: {
          default: null,
          error: false,
          errorMessages: [],
          value: null,
        },
        tour_id: {
          default: null,
          error: false,
          errorMessages: [],
          value: null,
        },
        tour_date: {
          default: null,
          error: false,
          errorMessages: [],
          value: null,
        },
        status: {
          default: null,
          error: false,
          errorMessages: [],
          value: null,
        },
        booking_passenger: {
          default: [this.default_booking_passenger_value],
          error: false,
          errorMessages: [],
          value: [this.default_booking_passenger_value],
        },
      },
      availableTourDateItems: [],
      table_booking_passenger: {
        menu: false,
        headers: [
          {
            text: 'Given Name',
            value: 'given_name',
            sortable: false,
          },
          {
            text: 'Surname',
            value: 'surname',
            sortable: false,
          },
          {
            text: 'Email',
            value: 'email',
            sortable: false,
          },
          {
            text: 'Mobile',
            value: 'mobile',
            sortable: false,
          },
          {
            text: 'Passport',
            value: 'passport',
            sortable: false,
          },
          {
            text: 'Birth Date',
            value: 'birth_date',
            sortable: false,
          },
          {
            text: 'Special Request',
            value: 'special_request',
            sortable: false,
          },
          //{ text: '', value: 'passenger_id', sortable: false },
          { text: '', value: 'id', sortable: false, width: '1%' },
        ],
      },
    }
  },
  computed: {
    ...mapState('tour', {
      tourItems: (state) => state.tours.data,
    }),
    ...mapState('booking', {
      passengerItems: (state) => state.passengers.data,
    }),
  },
  watch: {
    value: function (value) {
      this.populateForm(value)
    },
  },
  mounted() {
    if (this.value) {
      this.populateForm(this.value)
    }

    this.fetchPassengers({
      params: {
        status: 'Enabled',
      },
    })
  },
  methods: {
    selectTour() {
      this.SET_LOADING(true)
      this.getTourById(this.field.tour_id.value)
        .then((r) => {
          const availableDate = r.tour_date.filter(
            (item) => item.status == 'Enabled'
          )
          this.availableTourDateItems = availableDate
        })
        .finally(() => {
          this.SET_LOADING(false)
        })
    },
    selectPassenger(index) {
      const selected = this.field.booking_passenger.value[index].given_name
      const tmpPassenger = this.passengerItems.find(
        (item) => item.given_name == selected
      )

      if (tmpPassenger) {
        this.field.booking_passenger.value[index].passenger_id = tmpPassenger.id
        this.field.booking_passenger.value[index].given_name =
          tmpPassenger.given_name
        this.field.booking_passenger.value[index].surname = tmpPassenger.surname
        this.field.booking_passenger.value[index].email = tmpPassenger.email
        this.field.booking_passenger.value[index].mobile = tmpPassenger.mobile
        this.field.booking_passenger.value[index].passport =
          tmpPassenger.passport
        this.field.booking_passenger.value[index].birth_date =
          tmpPassenger.birth_date
      }
    },
    ...mapActions('booking/form', [
      'getBookingById',
      'createBooking',
      'updateBooking',
    ]),
    ...mapActions('booking', ['fetchPassengers']),
    ...mapActions('tour/form', ['getTourById']),
    ...mapMutations('global', [
      'SET_ERROR_MESSAGE',
      'SET_SUCCESS_MESSAGE',
      'SET_LOADING',
    ]),
    populateForm(value) {
      this.getTourById(value.tour_id)
        .then((r) => {
          const availableDate = r.tour_date.filter(
            (item) => item.status == 'Enabled'
          )
          this.availableTourDateItems = availableDate

          Object.keys(this.field).forEach((f) => {
            if (value[f] !== undefined) {
              this.field[f].value = value[f]
            }
          })
        })
        .finally(() => {
          this.SET_LOADING(false)
        })
    },
    errorReset() {
      Object.keys(this.field).forEach((f) => {
        this.field[f].error = false
        this.field[f].errorMessages = []
      })
    },
    reset() {
      Object.keys(this.field).forEach((f) => {
        this.field[f].value = this.field[f].default
      })
    },
    submit() {
      if (this.field.id.value) {
        this.submitUpdate()
      } else {
        this.submitCreate()
      }
    },
    submitCreate() {
      this.SET_LOADING(true)
      this.errorReset()

      const data = Object.assign(
        {},
        ...Object.keys(this.field).map((f) => {
          return { [f]: this.field[f].value }
        })
      )

      this.createBooking(data)
        .then((r) => {
          this.reset()
          this.SET_SUCCESS_MESSAGE('Successfully Created')
        })
        .catch((e) => {
          if (e.response.data.errors !== undefined) {
            e.response.data.errors.forEach((error) => {
              if (error.field !== undefined) {
                if (this.field[error.field] !== undefined) {
                  this.field[error.field].error = true
                  this.field[error.field].errorMessages = error.message
                }
              }
            })
            this.SET_ERROR_MESSAGE(
              e.response.data.errors.map((e) => e.message).join('<br />')
            )
          }
        })
        .finally(() => {
          this.SET_LOADING(false)
        })
    },
    submitUpdate() {
      this.SET_LOADING(true)
      this.errorReset()

      const data = Object.assign(
        {},
        ...Object.keys(this.field).map((f) => {
          return { [f]: this.field[f].value }
        })
      )

      this.updateBooking({
        id: this.field.id.value,
        data: data,
      })
        .then((r) => {
          this.SET_SUCCESS_MESSAGE('Successfully Updated')
        })
        .catch((e) => {
          if (e.response.data.errors !== undefined) {
            e.response.data.errors.forEach((error) => {
              if (error.field !== undefined) {
                if (this.field[error.field] !== undefined) {
                  this.field[error.field].error = true
                  this.field[error.field].errorMessages = error.message
                }
              }
            })
            this.SET_ERROR_MESSAGE(
              e.response.data.errors.map((e) => e.message).join('<br />')
            )
          }
        })
        .finally(() => {
          this.SET_LOADING(false)
        })
    },
    addNewItem() {
      this.field.booking_passenger.value.push({
        id: null,
        passenger_id: null,
        special_request: '',
        given_name: '',
        surname: '',
        email: '',
        mobile: '',
        passport: '',
        birth_date: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
      })
    },
    removeItem(index) {
      this.field.booking_passenger.value.splice(index, 1)
    },
  },
}
</script>