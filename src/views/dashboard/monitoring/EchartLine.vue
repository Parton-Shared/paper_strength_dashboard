<template>
  <b-card class="adin-card">
    <b-card-header>
      <!-- title and subtitle -->
      <div>
        <b-card-title class="mb-1">
          {{ chartTitle }}
        </b-card-title>
        <b-card-sub-title>{{ chartSubTitle }}</b-card-sub-title>
      </div>
      <!--/ title and subtitle -->
      <!-- datepicker -->
      <div class="d-flex align-items-center">
        <feather-icon
          icon="CalendarIcon"
          size="16"
        />
        <flat-pickr
          :value="[rangePicker.start, rangePicker.end]"
          :config="{ mode: 'range'}"
          class="form-control flat-picker bg-transparent border-0 shadow-none"
          placeholder="YYYY-MM-DD"
        />
      </div>
      <!-- datepicker -->
    </b-card-header>

    <b-card-body>
      <vue-apex-charts
        type="line"
        height="100%"
        ref="chart"
        :options="apexChartData.chartOptions"
        :series="apexChartData.series"
      />
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardBody, BCardHeader, BCardTitle, BCardSubTitle, BBadge,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { $themeColors } from '@themeConfig'

export default {
  components: {
    BCard,
    flatPickr,
    BCardBody,
    BCardHeader, 
    BCardTitle, 
    BCardSubTitle,
    VueApexCharts,
    BBadge,
  },
  props: {
    chartTitle: {
      type: String,
      default: 'Line Area Chart',
    },
    chartSubTitle: {
      type: String,
      default: 'Commercial networks',
    },
    series: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    rangePicker: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  watch: {
    series() {
      console.log("im new !!!!")
      console.log(this.series)
      this.$refs.chart.updateSeries(
        [
          {
            "name": this.chartTitle,
            data: this.series,
          }
        ]
      );
    },
    categories() {
      this.$refs.chart.updateOptions({
        xaxis: {
          categories: this.categories,
          type: 'datetime',
          labels: { format: 'dd/MM HH:mm' },
        }}
      );
    },
  },
  data() {
    return {
      apexChartData : {
        series: [
          {
            "name": this.chartTitle,
            data: this.series
          }
        ],
        chartOptions: {
          chart: {
            zoom: {
              enabled: false,
            },
            toolbar: {
              show: false,
            },
          },
          markers: {
            strokeWidth: 7,
            strokeOpacity: 1,
            strokeColors: [$themeColors.light],
            colors: [$themeColors.warning],
          },
          colors: [$themeColors.warning],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'straight',
          },
          grid: {
            xaxis: {
              lines: {
                show: false,
              },
            },
            yaxis: {
              lines: {
                show: false
              }
            },
          },
          tooltip: {
            y: {
              formatter(val) {
                return val
              }
            },
            x: {
              formatter(val) {
                const date = new Date(val);
                let month = date.getMonth().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
                let day = date.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
                let hour = date.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
                let minute = date.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
                let second = date.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
                return `${day}/${month} ${hour}:${minute}:${second}`
              }
            }
          },
          xaxis: {
            type: 'datetime',
            categories: this.categories,
            labels: { format: 'dd/MM HH:mm' },
          },
          yaxis: {
            labels: {
              show: false,
            },
          },
        },
      }
    }
  },
}
</script>
