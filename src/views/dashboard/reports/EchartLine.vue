<template>
  <b-card title="CMT 30">
    <div class="d-flex justify-content-between flex-wrap">
      <div class="mb-1 mb-sm-0">
        <span class="text-muted">Commercial networks and enterprises</span>
      </div>
      <div class="d-flex align-content-center mb-1 mb-sm-0">
        <h1 class="font-weight-bolder ">
          $ 183,382
        </h1>
        <div class="pt-25 ml-75">
          <b-badge variant="light-secondary">
            <feather-icon
                icon="ArrowDownIcon"
                size="12"
                class="text-danger align-middle"
            />
            <span class="font-weight-bolder align-middle"> 24%</span>
          </b-badge>
        </div>
      </div>
    </div>
    <!-- echart -->
    <app-echart-line :option-data="option"/>
    <b-row class="mb-2">
      <b-col>
        <b>Jumbo ID</b> <br>
        12312312
      </b-col>
      <b-col>
        <b>MX Jumbo ID</b> <br>
        12312312
      </b-col>
      <b-col>
        <b>Grande Name</b> <br>
        FL80
      </b-col>
      <b-col>
        <b>Real Value</b> <br>
        75.5
      </b-col>
    </b-row>
    <b-row>
      <b-col >
        <b>Prediction</b> <br>
        FL80
      </b-col>
      <b-col >
        <b>Prediction 15'</b> <br>
        84.04114
      </b-col>
      <b-col >
        <b>Error</b> <br>
        8.4114
      </b-col>
      <b-col >
        <b>Error 15'</b> <br>
        8.4114
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {BCard, BBadge, BRow ,BCol} from 'bootstrap-vue'
import AppEchartLine from '@core/components/charts/echart/AppEchartLine.vue'

export default {
  components: {
    BCard,
    AppEchartLine,
    BBadge,
    BRow,
    BCol
  },
  data() {
    return {
      option: {
        xAxisData: ['7/12', '8/12', '9/12', '10/12', '11/12', '12/12', '13/12', '14/12', '15/12', '16/12', '17/12', '18/12', '19/12', '20/12'],
        series: ['290', '200', '210', '190', '250', '220', '80', '90', '200', '150', '160', '100', '140', '100', '30'],
      },
    }
  },
}
</script>
