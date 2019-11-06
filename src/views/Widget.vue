<template>
  <main>
    <img
    v-tooltip="toolTipMessage()"
    id="logo"
    v-bind:class="widgetClassObject"
    src="~@/assets/isolated-layout.svg" alt="conscious.ly" />
  </main>
</template>

<script>
import { mapState } from 'vuex';
import { ipcRenderer } from 'electron';
import { WIDGET_MODE } from '@/event-types';
import { NOTIFY_TIME_UP, NOTIFY_HALF_TIME } from '@/store/action-types';
import { DISTRACTION_PAGE_ROUTE, TIME_UP_PAGE_ROUTE } from '@/router/routes';

export default {
  name: 'WidgetView',
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
    toolTipMessage() {
      if (this.$store.state.minutesRemainingInTask === 0) {
        return 'Time is up!';
      }
      return `${this.$store.state.minutesRemainingInTask} minutes remaining`;
    },
    distracted() {},
  },
  mounted() {
    ipcRenderer.send(WIDGET_MODE);
  },
  watch: {
    minutesRemainingInTask(newTime) {
      if (newTime === 0) {
        this.$store.dispatch(NOTIFY_TIME_UP);
        this.$router.push(TIME_UP_PAGE_ROUTE);
      }

      if (this.$store.getters.timeLeftRatio < 0.5
      && this.$store.state.halfTimeNotifcationSent === false) {
        this.$store.dispatch(NOTIFY_HALF_TIME);
      }
    },
    aboutToBeDistracted(isAboutToBeDistracted) {
      if (isAboutToBeDistracted) {
        this.$router.push(DISTRACTION_PAGE_ROUTE);
      }
    },
    distractedMode(isDistracted) {
      if (isDistracted) {
        console.log('TODO: Distraction Mode');
      }
    },
  },
};
</script>

<style scoped>
.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}
</style>
