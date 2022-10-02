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
          <h3 class="text-white mb-1">Production Type</h3>
        </b-card-title>
        <form-select-standard
          :data="this.selectionData ? this.selectionData : []"
          @switch="(grade_name) => do_switch(grade_name)"
        />
      </b-card>

      <b-row>
        <b-col
            cols="6"
            v-for="(item, index) in this.data.predCards"
            :key="index"
        >
          <statistic-card-vertical
              icon="CpuIcon"
              statistic="CMT 30"
              :data="item"
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
                      @click="$refs.params_form_invis_reset.click()"
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
                      @click="() => $refs.params_form_invis_submit.click()"
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
          Last production parameters are displayed. You can change and simulate values.
        </b-card-sub-title>

        <vue-perfect-scrollbar
            ref="refChatLogPS"
            :settings="perfectScrollbarSettings"
            class="simulate-parameters scroll-area"
        >
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-col cols="12" v-for="(item, index) in (data.lastParamsTable ? data.lastParamsTable.Parameters : [])" :key="index">
                <b-form-group
                    :label="item"
                    :label-for="item"
                    label-cols="9"
                >
                  <b-form-input
                      :id="`input-${index}`"
                      v-model="form[item]"
                      :value="data.lastParamsTable ? data.lastParamsTable.Values[index] : 0"
                      class="text-right"
                  />
                </b-form-group>
            </b-col>
            <b-button type="submit" ref="params_form_invis_submit" style="display:none;">Submit</b-button>
            <b-button type="reset" ref="params_form_invis_reset" style="display:none;">Reset</b-button>
          </b-form>
        </vue-perfect-scrollbar>
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
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import axios from '@/libs/axios'

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

    // 3rd party
    VuePerfectScrollbar,
  },

  data() {
    return {
      perfectScrollbarSettings: {
        maxScrollbarLength: 150,
        wheelPropagation: false,
      },
      show: true,
      ids: {},
      form: {

      },
      selectionData: [],
      data: {},
      paramsBackState: {},
    }
  },
  created() {
    this.$store.dispatch('dashboard/fetchPaperTypes')
      .then(({data})=> {
        this.selectionData = data.paperTypes;
        this.$store.dispatch('dashboard/fetchSimulation', this.$store.getters["dashboard/getSelectedGradeName"])
          .then(({data}) => {
            this.data = data;
            this.paramsBackState = this.data.lastParamsTable;
            this.ids = this.data.lastParamsTable.Id
            for (let i = 0; i < this.data.lastParamsTable.Parameters.length; i++){
              this.form[this.data.lastParamsTable.Parameters[i]] = this.data.lastParamsTable.Values[i];
            }
          }
        );
      })
      .catch(error => {console.error(error);})
  },
  methods: {
    do_switch(grade_name){
      this.$store.dispatch('dashboard/fetchSimulation', grade_name)
          .then(({data}) => {
            this.data = data;
            this.paramsBackState = this.data.lastParamsTable;
          }
      );
    },
    onSubmit(event){
      event.preventDefault();
      let submitData = {};
      const rows = this.ids.length;

      for (let i = 0; i < rows; i++){
        submitData[this.ids[i]] = {"0": this.form[Object.keys(this.form)[i]]}
      }

      console.log(JSON.stringify(submitData));
      axios.post( 
        `http://35.157.144.4:8999/strength/${this.$store.getters["dashboard/getSelectedGradeName"]}`,
        {
            headers: {
              Accept: '*/*',
              'Access-Control-Allow-Origin': '*',
            },
            data: JSON.stringify(submitData)
        }
      ).then(({data}) => {
        console.log(data);
      })
    },
    onReset(event){
      event.preventDefault();
      console.log(this.form);
      for(let i = 0; i < this.paramsBackState.Parameters.length; i++){
        this.form[this.paramsBackState.Parameters[i]] = this.paramsBackState.Values[i];
      }

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
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
