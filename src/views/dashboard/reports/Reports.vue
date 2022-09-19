<template>
  <section>
    <b-row class="match-height">
      <b-col md="4">
        <b-card
            class="bg-info">
          <b-card-title
              class="mb-2"
          >
            <h3 class="text-white mb-1">Reports</h3>
          </b-card-title>
          <b-card-text
              class="text-white">
            With supporting text below as a natural lead-in.
          </b-card-text>
        </b-card>
      </b-col>
      <b-col md="4">
        <b-card>
          <b-card-title
              class="mb-2"
          >
            <h5 class="mb-1">Production Type</h5>
          </b-card-title>
          <form-select-standard/>
        </b-card>
      </b-col>
      <b-col md="4">
        <b-card>
          <b-card-title
              class="mb-2"
          >
            <h5 class="mb-1">Production ID</h5>
          </b-card-title>
          <form-select-standard/>
        </b-card>
      </b-col>

    </b-row>

    <b-row>
      <b-col
          cols="6"
          xl="6"
          md="6"
          sm="6"
      >
        <statistic-card-vertical
            icon="CpuIcon"
            statistic="CMT 30"
            statistic-title="84.04"
            color="secondary"
        />
      </b-col>
      <b-col
          cols="6"
          xl="6"
          md="6"
          sm="6"
      >
        <statistic-card-vertical
            icon="CpuIcon"
            statistic="SCT CD"
            statistic-title="1.18"
            color="secondary"
        />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col
          xl="6"
          md="12">
        <echart-line/>
      </b-col>
      <b-col
          xl="6"
          md="12">
        <echart-line/>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-card>

          <b-card-title>
            All Results & Export
          </b-card-title>
          <b-row class="d-none">
            <b-col
                md="2"
                sm="4"
                class="my-1"
            >
              <b-form-group
                  class="mb-0"
              >
                <label class="d-inline-block text-sm-left mr-50">Per page</label>
                <b-form-select
                    id="perPageSelect"
                    v-model="perPage"
                    size="sm"
                    :options="pageOptions"
                    class="w-50"
                />
              </b-form-group>
            </b-col>
            <b-col
                md="4"
                sm="8"
                class="my-1"
            >
              <b-form-group
                  label="Sort"
                  label-cols-sm="3"
                  label-align-sm="right"
                  label-size="sm"
                  label-for="sortBySelect"
                  class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-select
                      id="sortBySelect"
                      v-model="sortBy"
                      :options="sortOptions"
                      class="w-75"
                  >
                    <template v-slot:first>
                      <option value="">
                        -- none --
                      </option>
                    </template>
                  </b-form-select>
                  <b-form-select
                      v-model="sortDesc"
                      size="sm"
                      :disabled="!sortBy"
                      class="w-25"
                  >
                    <option :value="false">
                      Asc
                    </option>
                    <option :value="true">
                      Desc
                    </option>
                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col
                md="6"
                class="my-1"
            >
              <b-form-group
                  label="Filter"
                  label-cols-sm="3"
                  label-align-sm="right"
                  label-size="sm"
                  label-for="filterInput"
                  class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-input
                      id="filterInput"
                      v-model="filter"
                      type="search"
                      placeholder="Type to Search"
                  />
                  <b-input-group-append>
                    <b-button
                        :disabled="!filter"
                        @click="filter = ''"
                    >
                      Clear
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>

          <b-table
              striped
              hover
              responsive
              :per-page="perPage"
              :current-page="currentPage"
              :items="items"
              :fields="fields"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              :filter="filter"
              :filter-included-fields="filterOn"
              @filtered="onFiltered"
          >
            <template #cell(avatar)="data">
              <b-avatar :src="data.value"/>
            </template>

            <template #cell(status)="data">
              <b-badge :variant="status[1][data.value]">
                {{ status[0][data.value] }}
              </b-badge>
            </template>
          </b-table>

          <b-col
              cols="12"
          >
            <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="right"
                size="md"
                class="my-0"
            />
          </b-col>

          <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="success"
          >
            Export
          </b-button>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BCardText,
  BCardTitle,
  BAvatar,
  BBadge,
  BFormSelect,
  BPagination,
  BInputGroup,
  BInputGroupAppend,
} from 'bootstrap-vue'
import StatisticCardVertical from './StatisticCardVertical.vue'
import StatisticCardHorizontal from './StatisticCardHorizontal.vue'
import EchartLine from './EchartLine.vue'
import FormSelectStandard from './FormSelectStandard.vue'
import CardHeaderFooter from './CardHeaderFooter.vue'
import {BTable} from 'bootstrap-vue'


export default {
  components: {
    BRow,
    BCol,
    BCard,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    BCardTitle,
    BCardText,
    BTable,
    FormSelectStandard,
    EchartLine,
    StatisticCardHorizontal,
    StatisticCardVertical,
    CardHeaderFooter,
    BAvatar,
    BFormSelect,
    BPagination,
    BInputGroup,
    BInputGroupAppend,
    BBadge,
  },

  data() {
    return {
      perPage: 10,
      pageOptions: [10, 50, 100],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      fields: [
        {key: 'jid', label: 'Jumbo Id', sortable: true},
        {key: 'mx_jid', label: 'MX Jumbo ID', sortable: true},
        {key: 'grade_name', label: 'Grande Name', sortable: true},
        {key: 'date', label: 'Date', sortable: true},
        'real_value',
        'prediction',
        'prediction_last',
        'error',
        'error_last',
      ],
      items: [
        {
          jid: 123123123,
          // eslint-disable-next-line global-require
          mx_jid: "123123123",
          grade_name: 'FL80',
          real_value: '71,16',
          prediction: '84.41123',
          prediction_last: '84.41123',
          error: '8.123',
          error_last: '8.123',
          date: '13 Sep 2022',
        },
      ],
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
          .filter(f => f.sortable)
          .map(f => ({text: f.label, value: f.key}))
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
