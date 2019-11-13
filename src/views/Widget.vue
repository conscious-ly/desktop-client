<template>
  <main>
    <div id="wrapper">
      <Progress
        :strokeColor="timerColor()"
        :transitionDuration="5000"
        :radius="55"
        :strokeWidth="10"
        :value="$store.getters.timeLeftRatio * 100">
      <div class="content">
        <img
          id="logo"
          :class="widgetClassObject"
          src="~@/assets/isolated-layout.svg" alt="conscious.ly"
        />
      </div>
      <template v-slot:footer>
        <b>{{`${$store.state.minutesRemainingInTask} minutes left`}}</b>
      </template>
    </Progress>
    <br>
    <br>
    <font-awesome-icon class="spaced-out" @click="goToLanding()" icon="stop-circle" size="2x"/>
    <font-awesome-icon class="spaced-out" @click="startTask()" icon="redo" size="2x"/>
    <font-awesome-icon class="spaced-out" @click="goToSettings()" icon="cogs" size="2x"/>
  </div>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import { ipcRenderer } from 'electron';
import Progress from 'easy-circular-progress';
import { WIDGET_MODE, NOTIFICATION_TRAY_ICON, NORMAL_TRAY_ICON } from '@/event-types';
import {
  ENTER_DISTRACTED_MODE,
  NOTIFY_TIME_UP,
  NOTIFY_HALF_TIME,
  START_TIMER,
} from '@/store/action-types';
import {
  DISTRACTION_PAGE_ROUTE,
  TIME_UP_PAGE_ROUTE,
  WIDGET_PAGE_ROUTE,
} from '@/router/routes';
import navigationMixin from '../mixins/navigationMixin';

export default {
  name: 'WidgetView',
  mixins: [navigationMixin],
  components: {
    Progress,
  },
  computed: {
    ...mapState([
      'aboutToBeDistracted',
      'distractedMode',
      'minutesRemainingInTask',
    ]),
    widgetClassObject() {
      if (this.$store.state.minutesRemainingInTask !== 0) {
        if (this.$store.getters.timeLeftRatio < 0.25) {
          return {
            inverted: true,
          };
        }

        if (this.$store.getters.timeLeftRatio < 0.5) {
          return {
            'half-inverted': true,
          };
        }

        return {};
      }

      return {
        inverted: true,
      };
    },
  },
  methods: {
    timerColor() {
      if (this.$store.getters.timeLeftRatio < 0.25) {
        return '#ff2d29';
      }

      if (this.$store.getters.timeLeftRatio < 0.5) {
        return '#d0a070';
      }

      return '#6be371';
    },
    startTask() {
      if (this.$store.getters.currentTaskName === 'Nothing') {
        this.w.close();
      }
      this.$store.dispatch(START_TIMER, this.$data.expectedTime);
      this.$router.push(WIDGET_PAGE_ROUTE);
    },
  },
  mounted() {
    ipcRenderer.send(WIDGET_MODE);
  },
  watch: {
    minutesRemainingInTask(newTime) {
      if (newTime === 0) {
        this.$store.dispatch(NOTIFY_TIME_UP);
        this.$router.push(TIME_UP_PAGE_ROUTE);
        ipcRenderer.send(NORMAL_TRAY_ICON);
      }

      if (this.$store.getters.timeLeftRatio < 0.5
      && this.$store.state.halfTimeNotifcationSent === false) {
        this.$store.dispatch(NOTIFY_HALF_TIME);
        ipcRenderer.send(NOTIFICATION_TRAY_ICON);
      }
    },
    aboutToBeDistracted(isAboutToBeDistracted) {
      if (isAboutToBeDistracted) {
        this.$router.push(DISTRACTION_PAGE_ROUTE);
      }
    },
    distractedMode(isDistracted) {
      if (isDistracted) {
        this.$store.dispatch(ENTER_DISTRACTED_MODE);
      }
    },
  },
};
</script>

<style scoped lang='scss'>
img {
  text-align: center;
  display: block;
}

#logo {
  padding-left: 10px;
  min-width: 10px;
  max-width: 100px;
}

.spaced-out {
  margin: 10px;
}

$--circular-progress-int-fz: 28px !default;
$--circular-progress-dec-fz: 12px !default;

.vue-circular-progress {
  display: inline-block;
  .circle {
    position: relative;
  }

  .circle__svg {
    transform: rotate(-90deg);
  }

  .circle__progress {
    fill: none;
    stroke-opacity: 0.3;
    stroke-linecap: round;
  }

  .circle__progress--fill {
    --initialStroke: 0;
    --transitionDuration: 0;
    stroke-opacity: 1;
    stroke-dasharray: var(--initialStroke);
    stroke-dashoffset: var(--initialStroke);
    transition: stroke-dashoffset var(--transitionDuration) ease;
  }

  .percent {
    width: 100%;
    top: 50%;
    left: 50%;
    position: absolute;
    font-weight: bold;
    text-align: center;
    line-height: $--circular-progress-int-fz;
    transform: translate(-50%, -50%);
  }

  .percent__int {
    font-size: $--circular-progress-int-fz;
  }
  .percent__dec,
  .percent_sign {
    font-size: $--circular-progress-dec-fz;
  }

  .label {
    font-size: 14px;
    text-transform: uppercase;
    margin-top: 15px;
  }
}
</style>
