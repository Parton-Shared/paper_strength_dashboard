<template>
  <section>
    <b-row>
      <b-col md="4">
        <b-card
            class="bg-success">
          <b-card-title
              class="mb-2"
          >
            <h3 class="text-white mb-1">Active Production</h3>
          </b-card-title>
          <form-select-standard/>
          <statistic-card-horizontal
              class="mt-2 mb-0"
              icon="TagIcon"
              statistic="5225816"
              statistic-title="Production ID"
          />

        </b-card>
      </b-col>
      <b-col
          xl="4"
          md="4"
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
          xl="4"
          md="4"
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

    <b-row class="match-height">
      <b-col cols="6">
        <echart-line/>
      </b-col>
      <b-col cols="6">
        <echart-line/>
      </b-col>
    </b-row>
  </section>
</template>


<script>
import {BRow, BCol, BCard, BFormGroup, BFormInput, BFormCheckbox, BForm, BButton} from 'bootstrap-vue'
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

      items: [
        {
          parameter: 'Back Layer Retantion Flow', value: '47,62',
        },
        {
          parameter: 'Top Layer Retantion Flow', value: '36,22',
        },
        {
          parameter: 'Back Layer Dye Flow', value: '0,00',
        },
        {
          parameter: 'Top Layer Dye Flow', value: '0,00',
        },
        {
          parameter: 'After Storage Long Ratio', value: '27,86',
        },
        {
          parameter: 'Refiner 1 Effective Power', value: '0,00',
        },
        {
          parameter: 'Refiner 2 Effective Power', value: '0,00',
        },
        {
          parameter: 'Discfilter Speed', value: '27,97',
        },
        {
          parameter: 'Top Deaerator Temperature', value: '44,81',
        },
        {
          parameter: 'Top Layer HeadBox Consistency', value: '1,02',
        },
        {
          parameter: 'Top layer WW1 Channel Consistensy', value: '0,29',
        },
        {
          parameter: 'Back Layer Recovery Consumption', value: '200,27',
        },
        {
          parameter: 'Back Layer Broke Consumption', value: '118,16',
        },
        {
          parameter: 'Back Deaerator Temperature', value: '45,27',
        },
        {
          parameter: 'Back Layer HeadBox Consistency', value: '1,12',
        },
      ],
      hover: true,
    }
  },
  methods: {

    // stop refreshing card in 3 sec
    refreshStop(cardName) {
      setTimeout(() => {
        this.$refs[cardName].showLoading = false
      }, 3000)
    },
  },
}
</script>
