<template>
  <b-row>
    <b-col
        md="12"
        lg="5"
    >
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

      <b-row>
        <b-col
            cols="6"
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
        >

          <statistic-card-vertical
              icon="CpuIcon"
              statistic="SCT CD"
              statistic-title="1.18"
              color="secondary"
          />
        </b-col>
        <b-col
            cols="12"
        >
          <b-card>
            <b-row>
              <b-col md="6">
                <div class="demo-inline-spacing">
                  <b-button
                      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                      block
                      variant="outline-primary"
                  >
                    Reset
                  </b-button>
                </div>
              </b-col>
              <b-col md="6">
                <div class="demo-inline-spacing">
                  <b-button
                      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                      block
                      variant="primary"
                  >
                    Simulate
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </b-card>

        </b-col>
      </b-row>

    </b-col>

    <b-col
        md="12"
        lg="7"
    >
      <b-card>
        <b-card-title>
          Parameters
        </b-card-title>
        <b-card-sub-title
          class="mb-4"
        >
          Active parameters are displayed. You can change and simulate values.
        </b-card-sub-title>
        <b-col cols="12">
          <b-form-group
              label="Back Layer Retantion Flow"
              label-for="blrf"
              label-cols="9"
          >
            <b-form-input
                id="blrf"
                class="text-right"
                value="48,24"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
              label="Top Layer Retantion Flow"
              label-for="tlrf"
              label-cols="9"
          >
            <b-form-input
                id="tlrf"
                value="48,24"
                class="text-right"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
              label="Back Layer Dye Flow"
              label-for="bydf"
              label-cols="9"
          >
            <b-form-input
                id="bydf"
                value="48,24"
                class="text-right"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
              label="Top Layer Dye Flow"
              label-for="tldf"
              label-cols="9"
          >
            <b-form-input
                id="tldf"
                value="48,24"
                class="text-right"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
              label="After Storage Long Ratio"
              label-for="aslr"
              label-cols="9"
          >
            <b-form-input
                id="aslr"
                value="48,24"
                class="text-right"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
              label="Refiner 1 Effective Power"
              label-for="r1ep"
              label-cols="9"
          >
            <b-form-input
                id="r1ep"
                value="48,24"
                class="text-right"
            />
          </b-form-group>
        </b-col>
        <!-- submit and reset -->
        <b-col cols="12" class=" pt-3 text-right">

        </b-col>
      </b-card>
    </b-col>
  </b-row>
</template>


<script>
import {BButton, BCard, BCol, BForm, BFormCheckbox, BFormGroup, BFormInput, BRow, BCardTitle, BCardSubTitle} from "bootstrap-vue";
import FormSelectStandard from "./FormSelectStandard";
import StatisticCardHorizontal from "./StatisticCardHorizontal.vue";
import StatisticCardVertical from "./StatisticCardVertical.vue";
import CardHeaderFooter from "./CardHeaderFooter.vue";

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
    BCardSubTitle,
    FormSelectStandard,
    StatisticCardHorizontal,
    StatisticCardVertical,
    CardHeaderFooter,
  },

  data() {
    return {}
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
