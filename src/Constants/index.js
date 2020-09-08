export default {
  AUDIO_BASE_URL: "/Audio/Signal-Sounds/",
  FILTER_RELATIONSHIP: {
    OR: 1,
    AND: 2
  },
  LOCALSTORAGE: {
    AUTH_KEY: "soccer_authToken",
    FCM_TOKEN: "soccer_fcmToken"
  },
  NOTIFICATION: {
    STATUS: {
      UNREAD: 1,
      READ: 2
    },
    TYPE: {
      MATCH_START: { VALUE: 1, SOUND: "Alert-1.mp3" },
      MATCH_END: { VALUE: 2, SOUND: "FULL_TIME_WHISTLE_ALERT.wav" },
      MATCH_HALF: { VALUE: 11, SOUND: "HALF_TIME_WHISTLE_ALERT.wav" },
      MATCH_FILTER: { VALUE: 3, SOUND: "Alert-3.mp3" },
      MATCH_EVENT: { VALUE: 4, SOUND: "Alert-4.mp3" },
      FAV_FILTER: { VALUE: 5, SOUND: "Alert-5.mp3" },
      EVENT_GOAL: {
        VALUE: 6,
        SOUND: "GOAL-ALERT.mp3"
      },
      EVENT_GOAL_FOR_2nd_HALF_LATE_GOAL :{
        VALUE: 6,
        SOUND: "Sound_3_New_Goal_Alert_for_2nd_half_late_goals.wav"
      },
      EVENT_GOAL_FOR_1nd_HALF_LATE_GOAL :{
        VALUE: 6,
        SOUND: "Sound_2_New_Goal_Alert_for_1st_half_late_goals.mp3"
      },

      EVENT_HALFTIME: {
        VALUE: 7,
        SOUND: "HALF-TIME.wav"
      },
      EVENT_PENALTY: {
        VALUE: 8,
        SOUND: "PENALTY-ALERT.wav"
      },
      EVENT_PENALTY_KICK: {
        VALUE: 10,
        SOUND: "Sound_4_If_match_on_shortlist_no_longer_fits_criteria.wav"
      },
      EVENT_RED_CARD: {
        VALUE: 9,
        SOUND: "RED_CARD_ALERT.wav"
      }
    },
    DEFUALT_SOUND: "Alert-1.mp3"
  },
  SOCCER_SIGNAL_PRO: {
    MAIN_URL: "https://soccersignals.pro/",
    LOGOUT_URL: "logout",
    PAYMENT_URL: "payment-page",
    PROFILE_URL: "wp-admin/profile.php"
  },
  POLLING: {
    TIME: {
      LIVEMATCH: 6000
    },
    MAX_PENDING_REQUESTS_LIMIT: 5
  }
};
