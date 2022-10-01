import axios from '@/libs/axios'


export default {
  namespaced: true,
  state: {
    monitoring: null,
    simulation: null,
    report: null,
    grade_names: null,
    selected_grade_name: null
  },
  getters: {
    getSelectedGradeName: state => state.selected_grade_name,
  },
  mutations: {
    UPDATE_MONITORING(state, val) {
      state.monitoring = val
    },
    UPDATE_SIMULATION(state, val) {
      state.simulation = val
    },
    UPDATE_REPORT(state, val) {
      state.report = val
    },
    UPDATE_GRADE_NAMES(state, val){
      state.grade_names = val;
    },
    UPDATE_SELECTED_GRADE_NAME(state, val){
      state.selected_grade_name = val;
    }
  },
  actions: {
    fetchMonitoring() {
      return new Promise((resolve, reject) => {
        axios
          .get("http://35.157.144.4:8892" + "/monitoring", {
            headers: {
              // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZGluX2Rhc2gifQ.EByQxie39Qs6TTJSc8efcvxQzoY2YAMCk3q87MsVeAE',
              Accept: '*/*',
              'Access-Control-Allow-Origin': '*',
            },
          })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchSimulation(context, grade_name) {
      return new Promise((resolve, reject) => {
        axios
          .get("http://35.157.144.4:8892" + "/simulation", {
            headers: {
              // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZGluX2Rhc2gifQ.EByQxie39Qs6TTJSc8efcvxQzoY2YAMCk3q87MsVeAE',
              Accept: '*/*',
              'Access-Control-Allow-Origin': '*',
            },
            params: {
              paper_type: grade_name
            }
          })
          .then((response) => {
            context.commit("UPDATE_SELECTED_GRADE_NAME", grade_name);
            resolve(response);
          })
          .catch(error => reject(error))
      })
    },
    fetchReport(grade_name, jumbo_id) {
      return new Promise((resolve, reject) => {
        axios
          .get("http://35.157.144.4:8892" + "/reports", {
            headers: {
              // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZGluX2Rhc2gifQ.EByQxie39Qs6TTJSc8efcvxQzoY2YAMCk3q87MsVeAE',
              Accept: '*/*',
              'Access-Control-Allow-Origin': '*',
            },
            params: {
              grade_name: grade_name,
              jumbo_id: jumbo_id,
            },
          })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchPaperTypes(context) {
      return new Promise((resolve, reject) => {
        axios
          .get("http://35.157.144.4:8892" + "/filters/paper-type", {
            headers: {
              // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZGluX2Rhc2gifQ.EByQxie39Qs6TTJSc8efcvxQzoY2YAMCk3q87MsVeAE',
              Accept: '*/*',
              'Access-Control-Allow-Origin': '*',
            }
          })
          .then((response) => {
            context.commit("UPDATE_GRADE_NAMES", response.data.paperTypes);
            if (!context.state.selected_grade_name){
                context.commit("UPDATE_SELECTED_GRADE_NAME", response.data.paperTypes[0])
            }
            return resolve(response);
          })
          .catch(error => reject(error))
      })
    },
  },
}
