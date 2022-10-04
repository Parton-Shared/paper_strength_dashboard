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
            AI-based smart production reports.
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
          <form-select-standard
            on="GradeName"
            :data="this.grade_names"
            @switch="(value) => do_switch_grade(value)"
          />
        </b-card>
      </b-col>
      <b-col md="4">
        <b-card>
          <b-card-title
              class="mb-2"
          >
            <h5 class="mb-1">Production ID</h5>
          </b-card-title>
          <form-select-standard
            on="JumboId"
            :data="this.jumbo_ids"
            @switch="(value) => do_switch_jumbo(value)"
          />
        </b-card>
      </b-col>

    </b-row>

    <b-row>
      <b-col
          cols="6"
          xl="6"
          md="6"
          sm="6"
          v-for="(item, index) in this.infoData.predCards"
          :key="index"
      >
        <statistic-card-vertical
            icon="CpuIcon"
            :statistic="item.name"
            :statistic-title="item.value.toString()"
            color="secondary"
        />
      </b-col>
    </b-row>

    <b-row class="match-height" v-if="this.infoData.lineCharts">
      <b-col cols="6" v-for="(item, index) in this.infoData.lineCharts" :key="index">
        <echart-line
          :chartTitle="item.title"
          :series="item.predictions"
          :categories="item.date"
          :realValue="item.real"
        />
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
      grade_names: [],
      jumbo_ids: [],
      infoData: {},
      chartPads: {
        CMT30: 1,
        SCTCD: 0.1,
        BSTINDEX: 0.1,
      },
      perPage: 10,
      pageOptions: [10, 50, 100],
      totalRows: 0,
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
        
      ],
      items: [
        
      ],
    }
  },
  async created() {
    let response = await this.$store.dispatch("dashboard/fetchPaperTypes");
    this.grade_names = response.data.paperTypes;

    response = await this.$store.dispatch("dashboard/fetchJumboIds", this.$store.getters["dashboard/getSelectedGradeName"]);
    this.jumbo_ids = response.data.jumboID;
          
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
    do_switch_grade(value) {
      if (this.$store.getters["dashboard/getGradeNames"].includes(value)){
        this.$store.commit("dashboard/UPDATE_SELECTED_GRADE_NAME", value);
        this.$store.dispatch("dashboard/fetchJumboIds", value)
          .then(({data}) => {
            this.jumbo_ids = data.jumboID;
          });
      }
    },
    do_switch_jumbo(value){
      let grade_name = this.$store.getters["dashboard/getSelectedGradeName"]
      let jumbo_id = value;

      this.$store.commit("dashboard/UPDATE_SELECTED_JUMBO_ID", value);
      this.$store.dispatch("dashboard/fetchReport", {grade_name, jumbo_id})
        .then(({data}) => {
          console.log(data);
          this.infoData = data;
          this.totalRows = data.table.rows.length;
          this.fields = data.table.titles;
          this.items = data.table.rows;
        });
      
    },
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
