<template>
  <section>
    <b-row class="match-height">
      <b-col md="4">
        <b-card
            class="bg-success">
          <h6 class="text-white mt-1">Production Type</h6>
          <b-card-title
              class="mb-2"
          >
            <h1 class="text-white mb-1 text-bold">
              <feather-icon
                  icon="FileIcon"
                  size="28"
              />
              {{this.data.activeProdCard ? this.data.activeProdCard.paper_type : ''}}
            </h1>
          </b-card-title>
          <statistic-card-horizontal
              class="mt-2 mb-0"
              icon="TagIcon"
              :data="this.data.activeProdCard ? this.data.activeProdCard : {}"
          />

        </b-card>
      </b-col>
      <b-col
          xl="4"
          md="4"
          sm="6"
          v-for="(item, index) in this.data.predCards"
          :key="index"
      >
        <statistic-card-vertical
            icon="CpuIcon"
            :data="item"
            color="secondary"
        />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col cols="6" v-for="(item, index) in this.data.lineCharts" :key="index">
        <echart-line
          :chartTitle="item.name"
          :series="item.predictions"
          :categories="item.timestamp"
          :rangePicker="rangePicker"
        />
      </b-col>
    </b-row>

    <b-row>
      <b-col
          md="12">
        <b-card-actions
            ref="cardAction"
            title="Parameters"
            @refresh="refreshStop('cardAction')"
        >
          <b-row
              class="mt-3">
            <b-col
                xl="4"
            >
              <card-header-footer/>
            </b-col>
            <b-col
                xl="8"
                cols="12"
            >

              <h2 class="mb-2">Active Parameters</h2>
              <b-table responsive="sm" :items="items"/>

              <b-form @submit.prevent>
                <b-row>
                  <b-col
                      cols="12"
                  >
                  </b-col>
                  <b-col cols="12">

                  </b-col>
                </b-row>

              </b-form>
            </b-col>
          </b-row>

        </b-card-actions>
      </b-col>
    </b-row>
  </section>
</template>


<script>
import {BRow, BCol, BCard, BFormGroup, BFormInput, BFormCheckbox, BForm, BButton, BCardTitle} from 'bootstrap-vue'
import StatisticCardVertical from './StatisticCardVertical.vue'
import StatisticCardHorizontal from './StatisticCardHorizontal.vue'
import EchartLine from './EchartLine.vue'
import FormSelectStandard from './FormSelectStandard.vue'
import BCardActions from "@core/components/b-card-actions/BCardActions.vue";
import CardHeaderFooter from './CardHeaderFooter.vue'
import { BTable } from 'bootstrap-vue'


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
    BTable,
    BCardTitle,
    FormSelectStandard,
    EchartLine,
    StatisticCardHorizontal,
    StatisticCardVertical,
    BCardActions,
    CardHeaderFooter,
  },

  data() {
    return {
      fields: [
        'ACTION',
        {key: 'ICON', label: 'ICON'},
        'DETAILS',
      ],

      rangePicker: {
        start: new Date(),
        end: new Date(),
      },

      items: [
      ],
      hover: true,
      
      data: {},
      intervalId: null,
      lastJumboId: null,
    }
  },
  created(){
    window.addEventListener("beforeunload", this.leaving);
    let func = (() => {
      this.$store.dispatch('dashboard/fetchMonitoring')
        .then(({ data }) => {
          if (this.lastJumboId 
              && this.lastJumboId === data.activeProdCard.mx_jumbo_id 
              && data.lineCharts[0].predictions.length === this.data.lineCharts[0].predictions.length
             ) {
            return;
          }
          this.lastJumboId = data.activeProdCard.mx_jumbo_id;
          this.data = data;
          this.rangePicker = {
            start:  data.lineCharts[0].timestamp[0],
            end: data.lineCharts[0].timestamp[data.lineCharts[0].timestamp.length - 1],
          }

          for(let i = 0; i < data.actParamsTable.Parameters.length; i++){
            this.items.push(
              {
                "parameter": data.actParamsTable.Parameters[i], 
                "value": data.actParamsTable.Values[i]
              }
            );
          }
        });
    }).bind(this);
    func();
    this.intervalId = setInterval(func, 1000 * 60);
  },
  methods: {
    leaving(){
      if (this.intervalId){
        clearInterval(this.intervalId);
      }
    },
    // stop refreshing card in 3 sec
    refreshStop(cardName) {
      setTimeout(() => {
        this.$refs[cardName].showLoading = false
      }, 3000)
    },
  },
}
</script>
