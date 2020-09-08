export const uiModule = {
  state: {
    filterInEdit: null,
    ui: {
      selectedMatch: {},
      isLoading: false,
      isCircleLoading: false,
      selectedMatches: [],
      showCreateFilterModal: false,
      showCreateSignalModal: false,
      activeMatchFlow: 2,
      selectedSignal: {
        matchesToWatch: []
      },
      selectedFilter: {},
      selectedView: "livescores",
      hiddenLeagues: [],
      matchModalOpened: false
    }
  },
  mutations: {
    updateLoading(state, data) {
      // console.log("TRiggering",data);
      state.ui.isLoading = data;
    },
    updateCricle(state,data){
      state.ui.isCircleLoading = data;
    },
    resetSelectedMatchesState(state) {
      state.ui.selectedMatches = [];
    },
    pushSelectedMatch(state, match) {
      state.ui.selectedMatches.push(match);
    },
    updateSelectedSignal(state, data) {
      state.ui.selectedSignal = data;
    },
    updateSelectedFilter(state, data) {
      if (typeof data == "string") {
        let index = this.state.$Auth.user.appData.filters.findIndex(
          filter => filter.id == data
        );
        if (index >= 0) {
          state.ui.selectedFilter = this.state.$Auth.user.appData.filters[
            index
          ];
        }
      } else {
        state.ui.selectedFilter = data;
      }
    },

    updateScannerSelectedVue(state, data) {
      state.ui.scanner.selectedView = data;
    },
    updateActiveMatchFlow(state, data) {
      state.ui.activeMatchFlow = data;
    },
    removeSelectedMatch(state, match) {
      state.ui.selectedMatches.splice(match, 1);
    },
    updateActiveTable(state, data) {
      state.ui.activeTable = data;
    },
    pushLeagueToHide(state, data) {
      state.ui.hiddenLeagues.push(data);
    },
    removeLeagueToHide(state, data) {
      state.ui.hiddenLeagues.splice(data, 1);
    },
    updateMatchModalStatus(state, data) {
      state.ui.matchModalOpened = data;
    }
  },
  getters: {
    returnSelectedMatches(state, getters) {
      return state.ui.selectedMatches;
    },

    returnActiveMatchFlow(state) {
      return state.ui.activeMatchFlow;
    },
    returnSelectedSignal(state) {
      return state.ui.selectedSignal;
    },
    returnSelectedFilter(state) {
      return state.ui.selectedFilter;
    },
    returnHiddenLeagues(state) {
      return state.ui.hiddenLeagues;
    },
    retrunUpdateIsLoading(state) {
      return state.ui.isLoading;
    },
    retrunUpdateIsCircleLoading(state) {
      return state.ui.isCircleLoading;
    }
  }
};