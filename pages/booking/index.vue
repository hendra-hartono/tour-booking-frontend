<template>
  <v-card>
    <v-card-text class="d-flex align-center flex-wrap pb-0">
      <div class="d-flex align-center pb-5">
        <!-- create new -->
        <v-btn color="primary" class="me-3" :to="{ name: 'booking-create' }">
          <v-icon size="18" class="me-1">
            {{ icons.mdiPlus }}
          </v-icon>
          <span>Create BOOKING</span>
        </v-btn>
      </div>
      <div class="d-flex align-center pb-5">
        <v-btn color="primary" class="me-3" outlined @click="fetchDataTable">
          <v-icon size="18" class="me-1"> mdi-refresh </v-icon>
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center pb-5">
        <v-select
          v-model="filter.form.field.tour_id.value"
          :items="tourItems"
          item-value="id"
          item-text="name"
          single-line
          outlined
          dense
          hide-details
          clearable
          placeholder="Select Tour"
          class="me-3"
          @input="filterDataTable"
        ></v-select>

        <v-select
          v-model="filter.form.field.status.value"
          :items="statusItems"
          single-line
          outlined
          dense
          hide-details
          clearable
          placeholder="Select Status"
          class=""
          @input="filterDataTable"
        ></v-select>
      </div>
    </v-card-text>

    <!-- table -->
    <client-only>
      <v-data-table
        @update:options="fetchDataTable()"
        :headers="getDataTableHeadersIsVisible"
        :items="dataTable.items"
        :item-key="dataTable.id"
        :dense="dataTable.dense"
        :loading="dataTable.loading"
        :options="dataTable.options"
        :server-items-length="dataTable.serverItemsLength"
        :show-select="dataTable.showSelect"
        :footer-props="dataTable.footerProps"
        v-model="dataTable.value"
        class="text-no-wrap"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex align-center justify-center">
            <v-tooltip bottom>
              <!-- <template> -->
              <template #activator="{ on, attrs }">
                <v-btn
                  :to="{
                    name: 'booking-id',
                    params: { id: item.id },
                  }"
                  v-bind="attrs"
                  v-on="on"
                  icon
                  small
                  link
                >
                  <v-icon size="18">{{ icons.mdiPencilOutline }}</v-icon>
                </v-btn>
              </template>
              <span>Edit</span>
            </v-tooltip>
          </div>
        </template>
      </v-data-table>
    </client-only>
  </v-card>
</template>

<script>
import { mdiPlus, mdiPencilOutline } from '@mdi/js'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  middleware: ['auth'],
  data() {
    return {
      icons: {
        mdiPlus,
        mdiPencilOutline,
      },
    }
  },
  mounted() {
    this.fetchTours({
      params: {
        status: 'Public',
      },
    })
  },
  computed: {
    ...mapGetters('booking', [
      'getDataTableHeadersIsVisible',
      'getDataTableFilterIsNotNull',
      'getDataTableParams',
    ]),
    ...mapState('booking', {
      dataTable: (state) => state.dataTable,
      filter: (state) => state.filter,
    }),
    ...mapState('global', {
      statusItems: (state) => state.statusBookingItems,
    }),
    ...mapState('tour', {
      tourItems: (state) => state.tours.data,
    }),
  },
  methods: {
    ...mapActions('booking', ['fetchDataTable', 'filterDataTable']),
    ...mapActions('tour', ['fetchTours']),
  },
}
</script>