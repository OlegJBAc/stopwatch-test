<template>
  <div class="app">
    <div class="container">
      <Stopwatch v-for="stopwatch in stopwatches"
                 :stopwatchId="stopwatch"
                 @deleteStopwatch="deleteStopwatch"
                 :key="stopwatch"
                 @changeActiveIntervals="changeActiveIntervals"
      />

      <div :class="{ 'stopwatch': true, 'stopwatch-add': true }">
        <button @click="addStopwatch">
          <PlusIcon class="svg_icon"/>
        </button>
      </div>

      <div :class="{ 'stopwatch': true, 'stopwatch-add': true }" id="clear-app-data">
        <button @click="clearAppData">
          Clear all app Data
        </button>
      </div>

    </div>
  </div>
</template>

<script>

import PlusIcon from './images/plus.svg';
import Stopwatch from './components/Stopwatch.vue';

export default {
  data() {
    return {
      stopwatches: [],
      activeIntervals: [],
    }
  },
  components: {
    Stopwatch,
    PlusIcon,
  },
  methods: {
    clearAppData() {
      localStorage.clear()
      this.stopwatches = []
      this.activeIntervals.forEach(intervalId => clearInterval(intervalId))
      this.activeIntervals = []

      this.setLocalStorage()
    },

    changeActiveIntervals(intervalIdForChange, action) {
      if(action === 'DELETE') {
        this.activeIntervals = this.activeIntervals.filter(intervalId => intervalId !== intervalIdForChange)
        this.setLocalStorage()
      }else{
        this.activeIntervals.push(intervalIdForChange)
        this.setLocalStorage()
      }
    },

    addStopwatch() {
      let stopwatchId = this.stopwatches.length > 0 ? Math.max(...this.stopwatches) : 0
      this.stopwatches.push(++stopwatchId)
      this.setLocalStorage()
    },

    deleteStopwatch(stopwatchIdForDelete) {
      this.stopwatches = this.stopwatches.filter(stopwatchId => stopwatchId !== stopwatchIdForDelete)
      this.setLocalStorage()
    },

    setLocalStorage() {
      localStorage.setItem("stopwatches", JSON.stringify(this.stopwatches))
      localStorage.setItem("activeIntervals", JSON.stringify(this.activeIntervals))
    },
    initializeStopwatches() {
      const stopwatchesCount = 1

      const stopwatchesLocal = []

      for (let i = 1; i <= stopwatchesCount; i++) {
        stopwatchesLocal.push(i)
        this.stopwatches = stopwatchesLocal
      }
      this.setLocalStorage()
    },

    initializeApp() {
      const localStorageData = localStorage.getItem("stopwatches")

      if (localStorageData) {
        this.stopwatches = [...JSON.parse(localStorageData)]
      } else {
        this.initializeStopwatches()
      }
    },
  },

  created() {
    this.initializeApp()
  }
}

</script>

<style lang="scss">
@import './styles/main.scss';

</style>
