<template>
  <client-only>
    <form @submit.prevent="submit()">
      <v-card class="mb-3 pa-4">
        <v-row no-gutters>
          <v-col v-if="$vuetify.breakpoint.smAndUp" cols="4"> Name * </v-col>
          <v-col :cols="$vuetify.breakpoint.smAndUp ? 8 : 12">
            <v-text-field
              :error="field.name.error"
              :error-messages="field.name.errorMessages"
              v-model="field.name.value"
              dense
              outlined
            >
              <template v-slot:label>
                <template v-if="$vuetify.breakpoint.xsOnly"> Name * </template>
              </template>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters class="mb-4">
          <v-col v-if="$vuetify.breakpoint.smAndUp" cols="4">
            Itinerary *
          </v-col>
          <v-col :cols="$vuetify.breakpoint.smAndUp ? 8 : 12">
            <template v-if="$vuetify.breakpoint.xsOnly"> Itinerary * </template>
            <v-textarea
              :error="field.itinerary.error"
              :error-messages="field.itinerary.errorMessages"
              v-model="field.itinerary.value"
              dense
              outlined
            >
              <template v-slot:label>
                <template v-if="$vuetify.breakpoint.xsOnly">
                  Itinerary *
                </template>
              </template>
            </v-textarea>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col v-if="$vuetify.breakpoint.smAndUp" cols="4"> Status * </v-col>
          <v-col :cols="$vuetify.breakpoint.smAndUp ? 8 : 12">
            <v-select
              :error="field.status.error"
              :error-messages="field.status.errorMessages"
              :items="statusTourItems"
              v-model="field.status.value"
              dense
              outlined
            >
              <template v-slot:label>
                <template v-if="$vuetify.breakpoint.xsOnly">
                  Status *
                </template>
              </template>
            </v-select>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col v-if="$vuetify.breakpoint.smAndUp" cols="4">
            Tour Date *
          </v-col>
          <v-col :cols="$vuetify.breakpoint.smAndUp ? 8 : 12">
            <v-data-table
              :headers="table_tour_date.headers"
              :items="field.tour_date.value"
              :items-per-page="5"
              class="hd-table elevation-1"
              hide-default-footer
            >
              <template v-slot:[`item.date`]="{ item }">
                <Datepicker
                  v-model="item.date"
                  dense
                  hide-details="auto"
                  outlined
                  prepend-inner-icon="mdi-calendar"
                />
              </template>

              <template v-slot:[`item.status`]="{ item }">
                <v-select
                  v-model="item.status"
                  :items="statusGeneralItems"
                  single-line
                  outlined
                  dense
                  hide-details
                  placeholder="Select Status"
                ></v-select>
              </template>

              <template v-slot:[`item.id`]="{ item }">
                <div class="d-flex align-center justify-center">
                  <v-btn
                    @click="removeItem(field.tour_date.value.indexOf(item))"
                    v-bind="attrs"
                    v-on="on"
                    icon
                    small
                    link
                  >
                    <v-icon size="18">{{ icons.mdiClose }}</v-icon>
                  </v-btn>
                </div>
              </template>
            </v-data-table>
            <v-btn color="primary" class="mt-3" outlined @click="addNewItem">
              <span>Add Date</span>
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
    default_tour_date_value: {
      type: Object,
      default: () => ({
        id: null,
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        status: 'Enabled',
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
        name: {
          default: null,
          error: false,
          errorMessages: [],
          value: null,
        },
        itinerary: {
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
        tour_date: {
          default: [this.default_tour_date_value],
          error: false,
          errorMessages: [],
          value: [this.default_tour_date_value],
        },
      },
      table_tour_date: {
        menu: false,
        headers: [
          {
            text: 'Date',
            value: 'date',
            sortable: false,
          },
          {
            text: 'Status',
            value: 'status',
            sortable: false,
          },
          { text: '', value: 'id', sortable: false },
        ],
      },
    }
  },
  computed: {
    ...mapState('global', {
      statusTourItems: (state) => state.statusTourItems,
      statusGeneralItems: (state) => state.statusGeneralItems,
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
  },
  methods: {
    ...mapActions('tour/form', [
      'getTourById',
      'createTour',
      'updateTour',
      'deleteTour',
    ]),
    ...mapMutations('global', [
      'SET_ERROR_MESSAGE',
      'SET_SUCCESS_MESSAGE',
      'SET_LOADING',
    ]),
    populateForm(value) {
      Object.keys(this.field).forEach((f) => {
        if (value[f] !== undefined) {
          this.field[f].value = value[f]
        }
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

      this.createTour(data)
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

      this.updateTour({
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
      this.field.tour_date.value.push({
        id: null,
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        status: 'Enabled',
      })
    },
    removeItem(index) {
      this.field.tour_date.value.splice(index, 1)
    },
  },
}
</script>