<template>
  <div class="stopwatch">

    <div class="stopwatch__container"

         :class="{ active: stopwatchData.intervalId }">
      <CloseIcon class="svg_icon"
                 :class="{ stopwatch__close: true }"
                 @click="deleteStopwatch"
      />
      <div class="stopwatch__time">
        <div>
          <span>{{ stopwatchData.timeData.hours }}:</span>
          <span>{{ stopwatchData.timeData.minutes }}:</span>
          <span>{{ stopwatchData.timeData.seconds }}</span>
        </div>
      </div>

      <div class="stopwatch__buttons">
        <button @click="changeStopWatchState">
          <PauseIcon class="svg_icon"
                     v-if="stopwatchData.intervalId"
                     :class="{ active: stopwatchData.intervalId }"
          />
          <TriangleIcon class="svg_icon"
                        v-else
                        :class="{ active: stopwatchData.intervalId }"
          />
        </button>
        <button @click="stopwatchStop">
          <SquareIcon class="svg_icon"
                      :class="{ active: stopwatchData.intervalId }"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import SquareIcon from '../images/square.svg';
import TriangleIcon from '../images/triangle.svg';
import CloseIcon from '../images/close.svg';
import PauseIcon from '../images/pause.svg';


export default {
  components: {
    TriangleIcon,
    CloseIcon,
    SquareIcon,
    PauseIcon,
  },
  data() {
    return {
      stopwatchData: {
        timeData: {
          hours: 0,
          minutes: 0,
          seconds: 0,
        },

        intervalId: null,
      },

    }
  },

  props: {
    stopwatchId: {
      type: Number,
      required: true,
    }
  },
  methods: {
    changeStopWatchState() {
      this.stopwatchData.intervalId !== null ? this.stopwatchPause() : this.stopwatchStart()
    },

    stopwatchStart() {
      const { timeData } = this.stopwatchData

      this.stopwatchData.intervalId = setInterval(() => {
        timeData.seconds++
        this.setLocalStorage()
        if (timeData.seconds > 60) {
          timeData.minutes++
          timeData.seconds = 0
          this.setLocalStorage()
        }
        if (this.stopwatchData.timeData.minutes > 60) {
          timeData.hours++
          timeData.minutes = 0
          this.setLocalStorage()
        }
      }, 1000)
      this.$emit('changeActiveIntervals', this.stopwatchData.intervalId, 'ADD')

    },

    clearIntervalHandler() {
      clearInterval(this.stopwatchData.intervalId)
      this.$emit('changeActiveIntervals', this.stopwatchData.intervalId, 'DELETE')
      this.stopwatchData.intervalId = null
      this.setLocalStorage()
    },

    stopwatchStop() {
      const { timeData } = this.stopwatchData

      this.clearIntervalHandler()

      timeData.seconds = 0
      timeData.minutes = 0
      timeData.hours = 0

      this.setLocalStorage()

    },

    stopwatchPause() {
      this.clearIntervalHandler()
    },

    deleteStopwatch() {
      this.$emit('deleteStopwatch', this.stopwatchId)
      this.clearIntervalHandler()
      localStorage.removeItem(`stopwatchData-${this.stopwatchId}`)
    },

    setLocalStorage() {
      localStorage.setItem(`stopwatchData-${this.stopwatchId}`, JSON.stringify(this.stopwatchData))
    },
    initializeLocalStorage() {
      const localStorageData = localStorage.getItem(`stopwatchData-${this.stopwatchId}`)

      if (localStorageData) {
        this.stopwatchData = {...JSON.parse(localStorageData)}
        if(this.stopwatchData.intervalId){
          this.stopwatchStart()
        }else{
        }
      } else {
        this.setLocalStorage()
      }
    },
  },

  created() {
    this.initializeLocalStorage()
  }
}
</script>
