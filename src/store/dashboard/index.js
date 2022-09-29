import axios from '@/libs/axios'


export default {
  namespaced: true,
  state: {
    monitoring: null,
    simulation: null,
    report: null,
  },
  getters: {
    // getAPIUrl: state => state.API_URL,
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
    fetchSimulation(grade_name) {
      return new Promise((resolve, reject) => {
        axios
          .get("http://35.157.144.4:8892" + "/simulation" + `/${grade_name}`, {
            headers: {
              // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZGluX2Rhc2gifQ.EByQxie39Qs6TTJSc8efcvxQzoY2YAMCk3q87MsVeAE',
              Accept: '*/*',
              'Access-Control-Allow-Origin': '*',
            }
          })
          .then(response => resolve(response))
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
  },
}
