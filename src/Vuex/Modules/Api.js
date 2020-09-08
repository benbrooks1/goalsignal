import axios from "../../Common/interceptor"
import Vue from "vue";
import {
    isEmpty
} from 'lodash'
import store from "../store";
// import Constants from "../../Constants";
// import {
//     stat
// } from "fs";
import moment from "moment";
const apiUrl = process.env.VUE_APP_APIURL;
// let io = require("socket.io")(http, { origins: "*:*" });

export const apiModule = {
    state: {
        searchKeyWord: "",
        count: 0,
        liveMatches: [],
        notFitInShortList: [],
        beforeCount: 0,
        allMatches: [],
        upcomingMatches: [],
        finishedMatches: [],
        countryLeagues: [],
        myLeagues: [],
        countryTotalPages: 1,
        notificationTotalPages: 1,
        allMatchesTotalPages: 1,
        notifications: [],
        matchStandings: [],
        filter: [],
        matchHead2Head: [],
        matchesInGoal: []
    },
    getters: {
        returnMatchModalStatus() {
            return store.state.$Ui.ui.matchModalOpened;
        },
        returnFilter(state) {
            // console.log("GETTING FILTER", state.filter);
            return state.filter;
        },
        returnLiveMatchesInRawForm(state) {
            return state.liveMatches;
        },
        returnMatchesInGol(state, getters) {
            return state.matchesInGoal;
        },
        returnLiveMatches(state, getters) {
            state.beforeCount = 0
            // console.log("LIVE DATA CHECKING ",state.liveMatches);
            let LIVEMATCHES = state.liveMatches;
            LIVEMATCHES.forEach((match, index) => {
                if (getters.returnUser.appData.favMatches) {
                    getters.returnUser.appData.favMatches.forEach(favMatch => {
                        let index = match.matches.findIndex(m => m.id == favMatch)
                        if (index >= 0) {
                            match.matches[index].is_my_favorite = true
                        }
                    })
                }
                state.myLeagues.forEach(country => {
                    if (match.country_id == country.country_id) {
                        if (country.leagues.findIndex(league => league.id == match.id) >= 0) {
                            match = Object.freeze(Object.assign({}, match, {
                                is_my_league: true
                            }));
                            LIVEMATCHES[index] = match
                            // match.is_my_league = true
                            let extractedLeague = LIVEMATCHES.splice(index, 1);
                            LIVEMATCHES.unshift(extractedLeague[0]);
                        }
                    }
                })
            })
            if (!isEmpty(getters.returnSelectedFilter)) {
                // let validMatches = []
                let matchMeetsCriteriaTruthThreshold = 0
                // matchMeetsCriteriaTruthThreshold = getters.returnSelectedFilter.filters.length

                var trueFilters = []
                var matchesToShow = []
                LIVEMATCHES.forEach((league) => {
                    league.matches.forEach(match => {
                        // console.log("FILTER ", getters.returnSelectedFilter.filters)
                        for (let i = 0; i < getters.returnSelectedFilter.filters.length; i++) {
                            state.beforeCount++
                            matchMeetsCriteriaTruthThreshold = 0
                            getters.returnSelectedFilter.filters[i].forEach((filter) => {
                                // if(!matchMeetsCriteriaTruthThreshold || getters.returnSelectedFilter.relationship == Constants.FILTER_RELATIONSHIP.AND){

                                // console.log(filter.currentlySelectedFilterValue.text, "filter.currentlySelectedFilterValue.text")
                                switch (filter.currentlySelectedFilterValue.text) {
                                    case 'Shots On Target Are':
                                        if (filter.applyTo && filter.applyTo == 'local' && filter.value.singular) {
                                            if (filter.operator && filter.operator == 'more' && match && match.stats.data.length > 0 && match.stats.data[0].shots && match.stats.data[0].shots.ongoal >= Number(filter.value.singular)) {
                                                matchMeetsCriteriaTruthThreshold++
                                            } else if (filter.operator && filter.operator == 'less' && match && match.stats.data.length > 0 && match.stats.data[0].shots && match.stats.data[0].shots.ongoal <= Number(filter.value.singular)) {
                                                matchMeetsCriteriaTruthThreshold++
                                            } else if (filter.operator && filter.operator == 'exact' && match && match.stats.data.length > 0 && match.stats.data[0].shots && match.stats.data[0].shots.ongoal == Number(filter.value.singular)) {
                                                matchMeetsCriteriaTruthThreshold++
                                            }
                                        } else if (filter.applyTo && filter.applyTo == 'visitor' && filter.value.singular) {
                                            if (filter.operator && filter.operator == 'more' && match && match.stats.data.length > 0 && match.stats.data[1].shots && match.stats.data[1].shots.ongoal >= Number(filter.value.singular)) {
                                                matchMeetsCriteriaTruthThreshold++
                                            } else if (filter.operator && filter.operator == 'less' && match && match.stats.data.length > 0 && match.stats.data[1].shots && match.stats.data[1].shots.ongoal <= Number(filter.value.singular)) {
                                                matchMeetsCriteriaTruthThreshold++
                                            } else if (filter.operator && filter.operator == 'exact' && match && match.stats.data.length > 0 && match.stats.data[1].shots && match.stats.data[1].shots.ongoal == Number(filter.value.singular)) {
                                                matchMeetsCriteriaTruthThreshold++
                                            }
                                        } else {
                                            if (filter.operator && filter.operator == 'more' && match && match.stats.data.length > 0 && match.stats.data[1].shots && (match.stats.data[1].shots.ongoal >= Number(filter.value.singular) || match.stats.data[0].shots.ongoal >= Number(filter.value.singular))) {
                                                matchMeetsCriteriaTruthThreshold++
                                            } else if (filter.operator && filter.operator == 'less' && match && match.stats.data.length > 0 && match.stats.data[1].shots && (match.stats.data[1].shots.ongoal <= Number(filter.value.singular) || match.stats.data[0].shots.ongoal <= Number(filter.value.singular))) {
                                                matchMeetsCriteriaTruthThreshold++
                                            } else if (filter.operator && filter.operator == 'exact' && match && match.stats.data.length > 0 && match.stats.data[1].shots && (match.stats.data[1].shots.ongoal == Number(filter.value.singular) || match.stats.data[0].shots.ongoal == Number(filter.value.singular))) {
                                                matchMeetsCriteriaTruthThreshold++
                                            }
                                        }
                                        break;
                                    case 'Goal Attempts Are':
                                        // console.log("Match", match.stats.data )
                                        if (filter.applyTo && filter.applyTo == 'local' && filter.value.singular) {
                                            if (filter.operator && filter.operator == 'more' && match && match.stats.data.length > 0 && match.stats.data[0].shots && match.stats.data[0].shots.total >= Number(filter.value.singular)) {
                                                matchMeetsCriteriaTruthThreshold++
                                            } else if (filter.operator && filter.operator == 'less' && match && match.stats.data.length > 0 && match.stats.data[0].shots && match.stats.data[0].shots.total <= Number(filter.value.singular)) {
                                                matchMeetsCriteriaTruthThreshold++
                                            } else if (filter.operator && filter.operator == 'exact' && match && match.stats.data.length > 0 && match.stats.data[0].shots && match.stats.data[0].shots.total == Number(filter.value.singular)) {
                                                matchMeetsCriteriaTruthThreshold++
                                            }
                                        } else if (filter.applyTo && filter.applyTo == 'visitor' && filter.value.singular) {
                                            if (filter.operator && filter.operator == 'more' && match && match.stats.data.length > 0 && match.stats.data[1].shots && match.stats.data[1].shots.total >= Number(filter.value.singular)) {
                                                matchMeetsCriteriaTruthThreshold++
                                            } else if (filter.operator && filter.operator == 'less' && match && match.stats.data.length > 0 && match.stats.data[1].shots && match.stats.data[1].shots.total <= Number(filter.value.singular)) {
                                                matchMeetsCriteriaTruthThreshold++
                                            } else if (filter.operator && filter.operator == 'exact' && match && match.stats.data.length > 0 && match.stats.data[1].shots && match.stats.data[1].shots.total == Number(filter.value.singular)) {
                                                matchMeetsCriteriaTruthThreshold++
                                            }
                                        } else {
                                            // console.log(filter.operator &&  filter.operator == 'more' && match && match.stats.data.length > 0 &&   match.stats.data[1].shots  && (match.stats.data[1].shots.total >= Number(filter.value.singular) || match.stats.data[0].shots.total >= Number(filter.value.singular)))
                                            // console.log(filter.operator ,  filter.operator == 'more' , match , match.stats.data.length > 0 ,   match.stats.data[1].shots  , (match.stats.data[1].shots.total >= Number(filter.value.singular) || match.stats.data[0].shots.total >= Number(filter.value.singular)))

                                            if (filter.operator && filter.operator == 'more' && match && match.stats.data.length > 0 && match.stats.data[1].shots && (match.stats.data[1].shots.total >= Number(filter.value.singular) || match.stats.data[0].shots.total >= Number(filter.value.singular))) {
                                                matchMeetsCriteriaTruthThreshold++
                                            } else if (filter.operator && filter.operator == 'less' && match && match.stats.data.length > 0 && match.stats.data[1].shots && (match.stats.data[1].shots.total <= Number(filter.value.singular) || match.stats.data[0].shots.total <= Number(filter.value.singular))) {
                                                matchMeetsCriteriaTruthThreshold++
                                            } else if (filter.operator && filter.operator == 'exact' && match && match.stats.data.length > 0 && match.stats.data[1].shots && (match.stats.data[1].shots.total == Number(filter.value.singular) || match.stats.data[0].shots.total == Number(filter.value.singular))) {
                                                matchMeetsCriteriaTruthThreshold++
                                            }
                                        }
                                        break;
                                    case 'Match Status Is':
                                        switch (filter.applyTo) {
                                            case "first-half":
                                                if (match.time.minute <= Number(45) && match.time.status == 'LIVE') {
                                                    matchMeetsCriteriaTruthThreshold++
                                                }
                                                break;
                                            case "half-time":
                                                if (match.time.minute == Number(45) && match.time.status == 'HT') {
                                                    matchMeetsCriteriaTruthThreshold++
                                                }
                                                break;
                                            case "second-half":
                                                if (match.time.minute > Number(45) && match.time.status == 'LIVE') {
                                                    matchMeetsCriteriaTruthThreshold++
                                                }
                                                break;
                                            case "extra-time":
                                                if (match.time.minute >= Number(90) && match.time.status == 'ET') {
                                                    matchMeetsCriteriaTruthThreshold++
                                                }
                                                break;

                                        }
                                        break;

                                    case 'Total Goals Are':
                                        switch (filter.operator) {
                                            case "exact":
                                                if ((match.scores.localteam_score + match.scores.visitorteam_score) === Number(filter.value.singular)) {
                                                    matchMeetsCriteriaTruthThreshold++
                                                }
                                                break;
                                            case "less":
                                                if (match.scores.localteam_score + match.scores.visitorteam_score <= Number(filter.value.singular)) {
                                                    matchMeetsCriteriaTruthThreshold++
                                                }
                                                break;
                                            case "more":
                                                if (match.scores.localteam_score + match.scores.visitorteam_score >= Number(filter.value.singular)) {
                                                    matchMeetsCriteriaTruthThreshold++
                                                }
                                                break;
                                        }
                                        break;
                                    case 'Live Odds Are':
                                        switch (filter.applyTo) {
                                            case "Match":
                                                switch (filter.operator) {
                                                    case "exact":
                                                        if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[1].value === Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    case "less":
                                                        if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[1].value <= Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    case "more":
                                                        if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[1].value >= Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    default:
                                                        if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[1].value === Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                }
                                                break;
                                            case "local":
                                                switch (filter.operator) {
                                                    case "exact":
                                                        if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[0].value === Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    case "less":
                                                        if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[0].value <= Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    case "more":
                                                        if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[0].value >= Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    default:
                                                        if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[0].value === Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                }
                                                break;
                                            case "visitor":
                                                switch (filter.operator) {
                                                    case "exact":
                                                        if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[2].value === Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    case "less":
                                                        if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[2].value <= Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    case "more":
                                                        if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[2].value >= Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    default:
                                                        if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[2].value >= Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                }
                                                break;
                                        }
                                        break;
                                    case 'SP Odds Are':

                                        switch (filter.applyTo) {
                                            case "Match":
                                                switch (filter.operator) {
                                                    case "exact":
                                                        if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[1].value === Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    case "less":
                                                        if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[1].value <= Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    case "more":
                                                        if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[1].value >= Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    default:
                                                        if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[1].value === Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                }
                                                break;
                                            case "local":
                                                switch (filter.operator) {
                                                    case "exact":
                                                        if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[0].value === Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    case "less":
                                                        if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[0].value <= Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    case "more":

                                                        if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[0].value >= Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    default:
                                                        if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[0].value === Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                }
                                                break;
                                            case "visitor":
                                                switch (filter.operator) {
                                                    case "exact":
                                                        if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[2].value === Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    case "less":
                                                        if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[2].value <= Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    case "more":
                                                        if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[2].value >= Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    default:
                                                        if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[2].value === Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                }
                                                break;
                                        }
                                        break;
                                    case 'Score Is':
                                        switch (filter.applyTo) {
                                            case "match":
                                                switch (filter.operator) {
                                                    case "exact":
                                                        if (match.scores.localteam_score === Number(filter.value.home) && match.scores.visitorteam_score === Number(filter.value.away)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    case "less":
                                                        if (match.scores.localteam_score >= Number(filter.value.home) && match.scores.visitorteam_score >= Number(filter.value.away)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    case "more":
                                                        if (match.scores.localteam_score <= Number(filter.value.home) && match.scores.visitorteam_score <= Number(filter.value.away)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    default:
                                                        if (match.scores.localteam_score === Number(filter.value.home) && match.scores.visitorteam_score === Number(filter.value.away)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                }
                                                break;
                                            case "local":
                                                switch (filter.operator) {
                                                    case "exact":
                                                        if (match.scores.localteam_score === Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    case "less":

                                                        if (match.scores.localteam_score <= Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    case "more":
                                                        if (match.scores.localteam_score >= Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    default:
                                                        if (match.scores.localteam_score === Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                }
                                                break;
                                            case "visitor":
                                                switch (filter.operator) {
                                                    case "exact":
                                                        if (match.scores.visitorteam_score == Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    case "less":
                                                        if (match.scores.visitorteam_score <= Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    case "more":
                                                        if (match.scores.visitorteam_score >= Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                        break;
                                                    default:
                                                        if (match.scores.localteam_score === Number(filter.value.singular)) {
                                                            matchMeetsCriteriaTruthThreshold++
                                                        }
                                                }
                                                break;
                                        }
                                        break;
                                    case 'Time Is':

                                        switch (filter.operator) {
                                            case "exact":
                                                if (match.time.minute === Number(filter.value.singular)) {
                                                    matchMeetsCriteriaTruthThreshold++
                                                }
                                                break;
                                            case "less":
                                                if (match.time.minute <= Number(filter.value.singular)) {
                                                    matchMeetsCriteriaTruthThreshold++
                                                }
                                                break;
                                            case "more":
                                                // console.log("MINTE",match.time.minute >= Number(filter.value.singular))
                                                if (match.time.minute >= Number(filter.value.singular)) {
                                                    matchMeetsCriteriaTruthThreshold++
                                                }
                                                break;
                                        }


                                        break;
                                    case 'Possession Is':
                                        if (match.stats !== undefined) {
                                            if (match.stats.data !== undefined) {
                                                if (match.stats.data[0] != undefined) {
                                                    if (match.stats.data[0].possessiontime != undefined) {
                                                        switch (filter.applyTo) {

                                                            case "match":
                                                                switch (filter.operator) {
                                                                    case "exact":
                                                                        if (match.stats.data[0].possessiontime === Number(filter.value.home) && match.stats.data[1].possessiontime === Number(filter.value.away)) {
                                                                            matchMeetsCriteriaTruthThreshold++
                                                                        }
                                                                        break;
                                                                    case "less":
                                                                        if (match.stats.data[0].possessiontime <= Number(filter.value.home) && match.stats.data[1].possessiontime <= Number(filter.value.away)) {
                                                                            matchMeetsCriteriaTruthThreshold++
                                                                        }
                                                                        break;
                                                                    case "more":
                                                                        if (match.stats.data[0].possessiontime >= Number(filter.value.home) && match.stats.data[1].possessiontime >= Number(filter.value.away)) {
                                                                            matchMeetsCriteriaTruthThreshold++
                                                                        }
                                                                        break;
                                                                }
                                                                break;
                                                            case "local":
                                                                switch (filter.operator) {
                                                                    case "exact":
                                                                        if (match.stats.data[0].possessiontime === Number(filter.value.singular)) {
                                                                            matchMeetsCriteriaTruthThreshold++
                                                                        }
                                                                        break;
                                                                    case "less":
                                                                        if (match.stats.data[0].possessiontime <= Number(filter.value.singular)) {
                                                                            matchMeetsCriteriaTruthThreshold++
                                                                        }
                                                                        break;
                                                                    case "more":
                                                                        if (match.stats.data[0].possessiontime >= Number(filter.value.singular)) {
                                                                            matchMeetsCriteriaTruthThreshold++
                                                                        }
                                                                        break;
                                                                }
                                                                break;
                                                            case "visitor":
                                                                switch (filter.operator) {
                                                                    case "exact":
                                                                        if (match.stats.data[1].possessiontime === Number(filter.value.singular)) {
                                                                            matchMeetsCriteriaTruthThreshold++
                                                                        }
                                                                        break;
                                                                    case "less":
                                                                        if (match.stats.data[1].possessiontime <= Number(filter.value.singular)) {
                                                                            matchMeetsCriteriaTruthThreshold++
                                                                        }
                                                                        break;
                                                                    case "more":
                                                                        if (match.stats.data[1].possessiontime >= Number(filter.value.singular)) {
                                                                            matchMeetsCriteriaTruthThreshold++
                                                                        }
                                                                        break;
                                                                }
                                                                break;
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        break;
                                    case 'Supremacy Is':
                                        if (match.stats !== undefined) {
                                            if (match.stats.data !== undefined) {
                                                if (match.stats.data[0] != undefined) {
                                                    // console.log("MATACH ",match.supremacy.localTeam,match.supremacy.visitorTeam);
                                                    switch (filter.applyTo) {

                                                        case "match":
                                                            switch (filter.operator) {
                                                                case "exact":

                                                                    if (match.supremacy.localTeam === Number(filter.value.home) && match.supremacy.localTeam === Number(filter.value.away)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "less":
                                                                    if (match.supremacy.localTeam <= Number(filter.value.home) && match.supremacy.localTeam <= Number(filter.value.away)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "more":
                                                                    if (match.supremacy.localTeam >= Number(filter.value.home) && match.supremacy.localTeam >= Number(filter.value.away)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                            }
                                                            break;
                                                        case "local":
                                                            switch (filter.operator) {
                                                                case "exact":
                                                                    if (match.supremacy.localTeam === Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "less":
                                                                    if (match.supremacy.localTeam <= Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "more":
                                                                    if (match.supremacy.localTeam >= Number(filter.value.singular)) {
                                                                        // console.log("MATACH ",match.supremacy.localTeam,match.supremacy.visitorTeam);
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                            }
                                                            break;
                                                        case "visitor":
                                                            switch (filter.operator) {
                                                                case "exact":
                                                                    if (match.supremacy.visitorTeam === Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "less":
                                                                    if (match.supremacy.visitorTeam <= Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "more":
                                                                    if (match.supremacy.visitorTeam >= Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                            }
                                                            break;
                                                    }
                                                }
                                            }
                                        }
                                        break;
                                    case 'Corners Are':
                                        if (match.stats !== undefined) {
                                            if (match.stats.data !== undefined) {
                                                if (match.stats.data[0] != undefined) {

                                                    switch (filter.applyTo) {
                                                        case "Match":
                                                            switch (filter.operator) {
                                                                case "exact":
                                                                    if (match.stats.data[0].corners === Number(filter.value.singular) || match.stats.data[1].corners === Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "less":
                                                                    if (match.stats.data[0].corners <= Number(filter.value.singular) || match.stats.data[1].corners <= Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "more":
                                                                    if (match.stats.data[0].corners >= Number(filter.value.singular) || match.stats.data[1].corners >= Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                            }
                                                            break;
                                                        case "local":
                                                            switch (filter.operator) {
                                                                case "exact":
                                                                    if (match.stats.data[0].corners === Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "less":
                                                                    if (match.stats.data[0].corners <= Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "more":
                                                                    if (match.stats.data[0].corners >= Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                            }
                                                            break;
                                                        case "visitor":
                                                            switch (filter.operator) {
                                                                case "exact":
                                                                    if (match.stats.data[1].corners === Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "less":
                                                                    if (match.stats.data[1].corners <= Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "more":
                                                                    if (match.stats.data[1].corners >= Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                            }
                                                            break;
                                                    }
                                                }
                                            }
                                        }
                                        break;
                                    case 'Yellow Cards Are':
                                        if (match.stats !== undefined) {
                                            if (match.stats.data !== undefined) {
                                                if (match.stats.data[0] != undefined) {
                                                    // console.log(filter, "Yellow Filter");
                                                    switch (filter.applyTo) {
                                                        case "Match":
                                                            switch (filter.operator) {
                                                                case "exact":
                                                                    if (match.stats.data[0].yellowcards === Number(filter.value.singular) || match.stats.data[1].yellowcards === Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "less":
                                                                    if (match.stats.data[0].yellowcards <= Number(filter.value.singular) || match.stats.data[1].yellowcards <= Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "more":
                                                                    if (match.stats.data[0].yellowcards >= Number(filter.value.singular) || match.stats.data[1].yellowcards >= Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                            }
                                                            break;
                                                        case "local":
                                                            switch (filter.operator) {
                                                                case "exact":
                                                                    if (match.stats.data[0].yellowcards === Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "less":
                                                                    if (match.stats.data[0].yellowcards <= Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "more":
                                                                    if (match.stats.data[0].yellowcards >= Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                            }
                                                            break;
                                                        case "visitor":
                                                            switch (filter.operator) {
                                                                case "exact":
                                                                    if (match.stats.data[1].yellowcards === Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "less":
                                                                    if (match.stats.data[1].yellowcards <= Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "more":
                                                                    if (match.stats.data[1].yellowcards >= Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                            }
                                                            break;
                                                    }
                                                }
                                            }
                                        }
                                        break;
                                    case 'Red Cards Are':
                                        if (match.stats !== undefined) {
                                            if (match.stats.data !== undefined) {
                                                if (match.stats.data[0] != undefined) {
                                                    // console.log(filter, "Red Filter");
                                                    switch (filter.applyTo) {
                                                        case "Match":
                                                            switch (filter.operator) {
                                                                case "exact":
                                                                    if (match.stats.data[0].redcards === Number(filter.value.singular) || match.stats.data[1].redcards === Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "less":
                                                                    if (match.stats.data[0].redcards <= Number(filter.value.singular) || match.stats.data[1].redcards <= Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "more":
                                                                    if (match.stats.data[0].redcards >= Number(filter.value.singular) || match.stats.data[1].redcards >= Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                            }
                                                            break;
                                                        case "local":
                                                            switch (filter.operator) {
                                                                case "exact":
                                                                    if (match.stats.data[0].redcards === Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "less":
                                                                    if (match.stats.data[0].redcards <= Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "more":
                                                                    if (match.stats.data[0].redcards >= Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                            }
                                                            break;
                                                        case "visitor":
                                                            switch (filter.operator) {
                                                                case "exact":
                                                                    if (match.stats.data[1].redcards === Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "less":
                                                                    if (match.stats.data[1].redcards <= Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                                case "more":
                                                                    if (match.stats.data[1].redcards >= Number(filter.value.singular)) {
                                                                        matchMeetsCriteriaTruthThreshold++
                                                                    }
                                                                    break;
                                                            }
                                                            break;
                                                        default:

                                                            break;
                                                    }
                                                }
                                            }
                                        }
                                        break;





                                }



                            });
                            if (matchMeetsCriteriaTruthThreshold == getters.returnSelectedFilter.filters[i].length) {
                                // console.log("TIME MATCH MINUTNES",match.time.minute,match.events,match.events.data,match);
                                for (let ii = match.events.data.length - 1; ii >= 0; ii--) {
                                    //  console.log(match.events.data[ii].type == "goal" &&  ( (match.time.minute - match.events.data[ii].minute) < 500), "*****" , match.events.data.length, match.events.data[ii].type);
                                //  console.log(match.id,match.events.data[ii].type == "goal" ,match.time.minute , match.events.data[ii].minute, ((match.time.minute - match.events.data[ii].minute) < 5) , !match.color,match.color );
                                    
                                if (match.events.data[ii].type == "goal" && ((match.time.minute - match.events.data[ii].minute) < 5) && (!match.color || match.color === "green")) {
                                        if(match.events.data[ii].type == "goal" && ((match.time.minute - match.events.data[ii].minute) < 2)){
                                     
                                            match.goalText = match.events.data[ii].team_id;
                                        }
                         
                                        if( (match.time.minute > 50 && match.events.data[ii].minute < 69)  ||  match.time.minute < 20){
                                        
                                        }else{
                                        
                                            // match.color = 'green';
                                            let flag = false;
                                            for(let i = 0 ;  i <  state.matchesInGoal.length ; i++ ){
                                              if( state.matchesInGoal[i].matchId === match.id){
                                                  flag = true;
                                                  break;
                                              }
                                            }
                                            if(!flag){
                                                state.matchesInGoal.push({matchId:match.id,teamId:match.events.data[ii].team_id});
                                            }
                                            
                                            break;  
                                        }
                                          
                                    } else if (match.events.data[ii].type == "goal") {
                                        break;
                                    }
                                    
                                    

                                }
                                if (match.time.status == 'HT' || match.time.status == 'FT') {

                                    match.color = 'grey';
                                    // if (match.time.status == 'HT') {
                                    //     setTimeout(() => {
                                    //         // console.log("REMOVE")
                                    //         Vue.prototype.$io.emit("removeToShortlistAndFav", {
                                    //             match: match.id,
                                    //             _id: getters.returnUser._id
                                    //         });
                                    //         store.commit("pullMatachIdFavAndShortList", match.id);
                                    //         if (getters.returnUser.popupShow) {
                                    //             // Vue.notify({
                                    //             //     title: "Success!",
                                    //             //     text: "Removed to your shortlist!",
                                    //             //     type: "success",
                                    //             //     group: "Main",

                                    //             //   });
                                    //         }
                                    //     }, 300000);
                                    // }
                                }
                                if (match.time.status !== 'FT') {
                                    trueFilters.push({
                                        match_id: match.id
                                    });
                                }
                                break;
                            }
                            // if(matchMeetsCriteriaTruthThreshold == 1 && (getters.returnSelectedFilter.relationship == 0 || getters.returnSelectedFilter.relationship == Constants.FILTER_RELATIONSHIP.OR)){

                            //     trueFilters.push({ match_id: match.id});
                            // }
                            // else if(matchMeetsCriteriaTruthThreshold == 2 && getters.returnSelectedFilter.relationship == Constants.FILTER_RELATIONSHIP.AND){

                            //     trueFilters.push({ match_id: match.id});
                            // }
                        }
                    })


                });


                // console.log(`We need ${matchMeetsCriteriaTruthThreshold} truth(s) to push match`)




                LIVEMATCHES.forEach(league => {
                    league.matches.forEach(matchFromState => {
                        var count = trueFilters.filter(match => {

                            return match.match_id == matchFromState.id
                        })
                        // if (count.length == matchMeetsCriteriaTruthThreshold) {
                        if (count.length) {
                            matchesToShow.push(matchFromState.id)
                        }

                        // }
                        // console.log({
                        //     type: "count of match instances",
                        //     count: count.length,
                        //     needs: matchMeetsCriteriaTruthThreshold
                        // })
                    })

                })

                return LIVEMATCHES.map(league => {
                    let filtered = {
                        country: league.country,
                        country_id: league.country_id,
                        id: league.id,
                        name: league.name,
                        matches: league.matches.filter(matchFromFilter => {

                            if (matchesToShow.includes(matchFromFilter.id)) {
                                return true
                            } else {
                                return false
                            }
                        })

                    }
                    return filtered
                }).filter(league => {
                    if (league.matches.length >= 1) {
                        return true
                    } else {
                        return false
                    }
                })


            }

            LIVEMATCHES.forEach(league => {
                league.matches.forEach(() => {
                    state.beforeCount++
                })
            });
            let liveMatch = [...LIVEMATCHES];
            let searchValue = state.searchKeyWord;
            let StateMatches = [];
            //  LIVEMATCHES = [];
            // console.log(liveMatch);
            // // console.log(StateMatches);
            // console.log(searchValue,"SEACH VALE",liveMatch,LIVEMATCHES);
            if (searchValue !== "") {
                liveMatch.forEach(league => {
                    // console.log(league.name);
                    if (league.name && league.name.toLowerCase().includes(searchValue)) {
                        StateMatches.push(league);

                    } else if (league.country.data.name && league.country.data.name.toLowerCase().includes(searchValue)) {
                        StateMatches.push(league);

                    } else {
                        let tempLeague = league;
                        let leagueMatches = [];
                        let pushingLeague = false;
                        league.matches.forEach(match => {
                            // console.log(match.localTeam.data.name , match.localTeam.data.name.toLowerCase().includes(searchValue));
                            // console.log(match && match.localTeam && match.visitorTeam.data && match.visitorTeam.data.name && match.visitorTeam.data.name.includes(searchValue));
                            if (match && match.localTeam && match.localTeam.data && match.localTeam.data.name && match.localTeam.data.name.toLowerCase().includes(searchValue)) {
                                pushingLeague = true;

                                // let lastGoalEvent  = getLastGoalEvent(match);
                                leagueMatches.push(match);
                            } else if (match && match.localTeam && match.visitorTeam.data && match.visitorTeam.data.name && match.visitorTeam.data.name.toLowerCase().includes(searchValue)) {
                                pushingLeague = true;
                                // let lastGoalEvent  = getLastGoalEvent(match);

                                leagueMatches.push(match);
                            }
                        });
                        if (pushingLeague) {

                            tempLeague.matches = leagueMatches;
                            StateMatches.push(tempLeague);
                        }
                    }
                    // Object.freeze(league)
                    // LIVEMATCHES.push(league)
                });

                // console.log(StateMatches);


                return StateMatches;
            } else {
                return LIVEMATCHES;
            }

        },
        returnAllMatches(state, getters) {
            state.allMatches.forEach((match) => {
                if (getters.returnUser.appData.favMatches) {
                    getters.returnUser.appData.favMatches.forEach(favMatch => {
                        let index = match.matches.findIndex(m => m.id == favMatch)
                        if (index >= 0) {
                            match.matches[index].is_my_favorite = true
                        }
                    })
                }
            });
            state.myLeagues.forEach(country => {
                state.allMatches.forEach((match, index) => {
                    if (match.country_id == country.country_id) {
                        if (country.leagues.findIndex(league => league.id == match.id) >= 0) {
                            match = Object.freeze(Object.assign({}, match, {
                                is_my_league: true
                            }));
                            state.allMatches[index] = match
                            let extractedLeague = state.allMatches.splice(index, 1);
                            state.allMatches.unshift(extractedLeague[0]);
                        }
                    }
                })
            })



            let allMatches = [...state.allMatches];
            let searchValue = state.searchKeyWord;
            let StateMatches = [];
            //  state.liveMatches = [];
            // console.log(liveMatch);
            // // console.log(StateMatches);
            // console.log(searchValue,"SEACH VALE",liveMatch,state.liveMatches);
            if (searchValue !== "") {
                allMatches.forEach(league => {
                    // console.log(league.name);
                    if (league.name && league.name.toLowerCase().includes(searchValue)) {
                        StateMatches.push(league);

                    } else if (league.country.data.name && league.country.data.name.toLowerCase().includes(searchValue)) {
                        StateMatches.push(league);

                    } else {
                        let tempLeague = league;
                        let leagueMatches = [];
                        let pushingLeague = false;
                        league.matches.forEach(match => {
                            // console.log(match.localTeam.data.name , match.localTeam.data.name.toLowerCase().includes(searchValue));
                            // console.log(match && match.localTeam && match.visitorTeam.data && match.visitorTeam.data.name && match.visitorTeam.data.name.includes(searchValue));
                            if (match && match.localTeam && match.localTeam.data && match.localTeam.data.name && match.localTeam.data.name.toLowerCase().includes(searchValue)) {
                                pushingLeague = true;
                                leagueMatches.push(match);
                            } else if (match && match.localTeam && match.visitorTeam.data && match.visitorTeam.data.name && match.visitorTeam.data.name.toLowerCase().includes(searchValue)) {
                                pushingLeague = true;
                                leagueMatches.push(match);
                            }
                        });
                        if (pushingLeague) {
                            tempLeague.matches = leagueMatches;
                            StateMatches.push(tempLeague);
                        }
                    }
                    // Object.freeze(league)
                    // state.liveMatches.push(league)
                });

                // console.log(StateMatches);


                return StateMatches;
            } else {
                return state.allMatches
            }
        },

        returnUpcomingMatches(state) {
            // console.log("this is Calling For returnUpcomingMatches", state.upcomingMatches);
            state.myLeagues.forEach(country => {
                state.upcomingMatches.forEach((match, index) => {
                    // console.log("this is Calling For returnUpcomingMatches THERER");
                    if (match.country_id == country.country_id) {
                        if (country.leagues.findIndex(league => league.id == match.id) >= 0) {
                            match = Object.freeze(Object.assign({}, match, {
                                is_my_league: true
                            }));
                            state.upcomingMatches[index] = match
                            let extractedLeague = state.upcomingMatches.splice(index, 1);
                            state.upcomingMatches.unshift(extractedLeague[0]);
                        }
                    }
                })
            });
            let allMatches = [...state.upcomingMatches];
            let searchValue = state.searchKeyWord;
            let StateMatches = [];
            //  state.liveMatches = [];
            // console.log(liveMatch);
            // // console.log(StateMatches);
            // console.log(searchValue,"SEACH VALE",liveMatch,state.liveMatches);
            if (searchValue !== "") {
                // console.log("THERE");
                allMatches.forEach(league => {
                    // console.log(league.name);
                    if (league.name && league.name.toLowerCase().includes(searchValue)) {
                        StateMatches.push(league);

                    } else if (league.country.data.name && league.country.data.name.toLowerCase().includes(searchValue)) {
                        StateMatches.push(league);

                    } else {
                        let tempLeague = league;
                        let leagueMatches = [];
                        let pushingLeague = false;
                        league.matches.forEach(match => {
                            // console.log(match.localTeam.data.name , match.localTeam.data.name.toLowerCase().includes(searchValue));
                            // console.log(match && match.localTeam && match.visitorTeam.data && match.visitorTeam.data.name && match.visitorTeam.data.name.includes(searchValue));
                            if (match && match.localTeam && match.localTeam.data && match.localTeam.data.name && match.localTeam.data.name.toLowerCase().includes(searchValue)) {
                                pushingLeague = true;
                                leagueMatches.push(match);
                            } else if (match && match.localTeam && match.visitorTeam.data && match.visitorTeam.data.name && match.visitorTeam.data.name.toLowerCase().includes(searchValue)) {
                                pushingLeague = true;
                                leagueMatches.push(match);
                            }
                        });
                        if (pushingLeague) {
                            tempLeague.matches = leagueMatches;
                            StateMatches.push(tempLeague);
                        }
                    }
                    // Object.freeze(league)
                    // state.liveMatches.push(league)
                });

                // console.log(StateMatches);


                return StateMatches;
            } else {
                return state.upcomingMatches
            }

        },
        returnFinishedMatches(state) {
            state.myLeagues.forEach(country => {
                state.finishedMatches.forEach((match, index) => {
                    if (match.country_id == country.country_id) {
                        if (country.leagues.findIndex(league => league.id == match.id) >= 0) {
                            match = Object.freeze(Object.assign({}, match, {
                                is_my_league: true
                            }));
                            state.finishedMatches[index] = match
                            let extractedLeague = state.finishedMatches.splice(index, 1);
                            state.finishedMatches.unshift(extractedLeague[0]);
                        }
                    }
                })
            });

            let allMatches = [...state.finishedMatches];
            let searchValue = state.searchKeyWord;
            let StateMatches = [];
            //  state.liveMatches = [];
            // console.log(liveMatch);
            // // console.log(StateMatches);
            // console.log(searchValue,"SEACH VALE",liveMatch,state.liveMatches);
            if (searchValue !== "") {
                allMatches.forEach(league => {
                    // console.log(league.name);
                    if (league.name && league.name.toLowerCase().includes(searchValue)) {
                        StateMatches.push(league);

                    } else if (league.country.data.name && league.country.data.name.toLowerCase().includes(searchValue)) {
                        StateMatches.push(league);

                    } else {
                        let tempLeague = league;
                        let leagueMatches = [];
                        let pushingLeague = false;
                        league.matches.forEach(match => {
                            // console.log(match.localTeam.data.name , match.localTeam.data.name.toLowerCase().includes(searchValue));
                            // console.log(match && match.localTeam && match.visitorTeam.data && match.visitorTeam.data.name && match.visitorTeam.data.name.includes(searchValue));
                            if (match && match.localTeam && match.localTeam.data && match.localTeam.data.name && match.localTeam.data.name.toLowerCase().includes(searchValue)) {
                                pushingLeague = true;
                                leagueMatches.push(match);
                            } else if (match && match.localTeam && match.visitorTeam.data && match.visitorTeam.data.name && match.visitorTeam.data.name.toLowerCase().includes(searchValue)) {
                                pushingLeague = true;
                                leagueMatches.push(match);
                            }
                        });
                        if (pushingLeague) {
                            tempLeague.matches = leagueMatches;
                            StateMatches.push(tempLeague);
                        }
                    }
                    // Object.freeze(league)
                    // state.liveMatches.push(league)
                });

                // console.log(StateMatches);


                return StateMatches;
            } else {
                return state.finishedMatches
            }

            // return state.finishedMatches

        },
        returnSignalData(state, getters) {
            var liveMatchesCopy = [...state.liveMatches]
            return liveMatchesCopy.filter(league => {
                league.signalMatches = league.matches.filter(match => getters.returnSelectedSignal.matchesToWatch.includes(match.id))
                return league
            })
        },
        returnShortlistData(state, getters) {
            let shortListData = state.liveMatches.map(league => {
                return {
                    ...league,
                    matches: league.matches.filter(match => {
                        if (match.time.status == 'HT' || match.time.status == 'FT') {
                            match.color = 'grey';
                        }
                        // if(match.time.status == 'HT'){
                        //     Vue.prototype.$io.emit("removeToShortlistAndFav", {
                        //         match: match.id,
                        //         _id: getters.returnUser._id
                        //     });
                        //     store.commit("pullMatachIdFavAndShortList", match.id);
                        // }
                        if (getters.returnUser.appData.favMatches.includes(match.id)) {
                            for (let i = 0; i < getters.returnUser.appData.shortList.length; i++) {
                                if (getters.returnUser.appData.shortList[i]._id == match.id) {
                                    if (match.time.minute > 45 && getters.returnUser.appData.shortList[i].status == "SH") {
                                        Vue.prototype.$io.emit("removeToShortlistAndFav", {
                                            match: match.id,
                                            _id: getters.returnUser._id
                                        });
                                        store.commit("pullMatachIdFavAndShortList", match.id);
                                    }
                                }
                            }
                            return true;
                        } else {
                            //   console.log( "NOT IN SHORTLIST" ,getters.returnUser.appData.favMatches.includes(match.id) );
                            if (getters.returnUser && getters.returnUser.appData && Array.isArray(getters.returnUser.appData.favMatches) && getters.returnUser.appData.favMatches.includes(match.id)) {
                                // console.log("NOT LONGER FIT IN SHORTLIST",match.id)
                                // Vue.prototype.$io.emit("removeToShortlistAndFav", {
                                //     match: match.id,
                                //     _id: getters.returnUser._id
                                // });

                            }
                        }

                    })
                }
            }).filter(league => league.matches.length >= 1)
            shortListData.forEach((match) => {
                if (getters.returnUser.appData.favMatches) {
                    getters.returnUser.appData.favMatches.forEach(favMatch => {
                        let index = match.matches.findIndex(m => m.id == favMatch)
                        if (index >= 0) {
                            match.matches[index].is_my_favorite = true
                        }
                    })
                }
            });
            let allMatches = [...shortListData];
            let searchValue = state.searchKeyWord;
            let StateMatches = [];
            allMatches.forEach((league) => {
                league.matches.forEach(match => {
                    for (let ii = match.events.data.length - 1; ii >= 0; ii--) {
                        if(match.events.data[ii].type == "goal" && ((match.time.minute - match.events.data[ii].minute) < 2)){   
                            match.goalText = match.events.data[ii].team_id;
                        }
                        if (match.events.data[ii].type == "goal" && ((match.time.minute - match.events.data[ii].minute) < 5) &&  (!match.color || match.color === "green")) {
                            if (match.events.data[ii].type == "goal" && ((match.time.minute - match.events.data[ii].minute) < 5) && (!match.color || match.color === "green")) {
                              
                            //  match.color = 'green';

                                    // console.log("THIS IS WHY ", match.time.minute > 50 , match.events.data[ii].minute < 69 , match.time.minute < 20 )
                            if( (match.time.minute > 50 && match.events.data[ii].minute < 69)  ||  match.time.minute < 20){
                                    
                            }else{

                                let flag = false;
                             
                             
                                for(let i = 0 ;  i <  state.matchesInGoal.length ; i++ ){
                                  if( state.matchesInGoal[i].matchId === match.id){
                                      flag = true;
                                      break;
                                  }
                                }
                                if(!flag){
                                     state.matchesInGoal.push({matchId:match.id,teamId:match.events.data[ii].team_id});
                                }
                                
                                break;

                            }
                           
                         } else if (match.events.data[ii].type == "goal") {
                             break;
                         }
                        } else if (match.events.data[ii].type == "goal") {
                            break;
                        }
                    }
                });
            });

            // Sort 
            // allMatches.sort(function (a, b) {
            //     return a.time.minute - b.time.minute;
            //   });

            //   console.log("ALL MATCHES SORT",allMatches);


            if (searchValue !== "") {
                allMatches.forEach(league => {
                    if (league.name && league.name.toLowerCase().includes(searchValue)) {
                        StateMatches.push(league);
                    } else if (league.country.data.name && league.country.data.name.toLowerCase().includes(searchValue)) {
                        StateMatches.push(league);

                    } else {
                        let tempLeague = league;
                        let leagueMatches = [];
                        let pushingLeague = false;
                        league.matches.forEach(match => {
                            if (match && match.localTeam && match.localTeam.data && match.localTeam.data.name && match.localTeam.data.name.toLowerCase().includes(searchValue)) {
                                pushingLeague = true;
                                leagueMatches.push(match);
                            } else if (match && match.localTeam && match.visitorTeam.data && match.visitorTeam.data.name && match.visitorTeam.data.name.toLowerCase().includes(searchValue)) {
                                pushingLeague = true;
                                leagueMatches.push(match);
                            }
                        });
                        if (pushingLeague) {
                            tempLeague.matches = leagueMatches;
                            StateMatches.push(tempLeague);
                        }
                    }
                });
                return StateMatches;
            } else {
                return shortListData
            }
        },
        returnCountryLeagues(state) {
            state.myLeagues.forEach(myLeague => {
                let countryIndex = state.countryLeagues.findIndex(countries => countries.country_id == myLeague.country_id)
                if (countryIndex >= 0) {
                    myLeague.leagues.forEach(myLeague => {
                        let countryLeagueIndex = state.countryLeagues[countryIndex].leagues.data.findIndex(league => league.id == myLeague.id);
                        if (countryLeagueIndex >= 0) {
                            state.countryLeagues[countryIndex].leagues.data[countryLeagueIndex].is_my_league = true
                        }
                    });
                }
            });
            return state.countryLeagues
        },
        returnMyLeagues(state) {
            return state.myLeagues;
        },
        returnNotifications(state) {
            return state.notifications;
        },
        returnLiveMatchesCount(state) {
            var totalMatches = 0;
            state.liveMatches.forEach(match => {
                totalMatches = totalMatches + match.matches.length;
            });
            return totalMatches;
        },
        returnAllMatchesCount(state) {
            var totalMatches = 0;
            state.allMatches.forEach(match => {
                totalMatches = totalMatches + match.matches.length;
            });
            return totalMatches;
        },
        returnFinishedMatchesCount(state) {
            var totalMatches = 0;
            state.finishedMatches.forEach(match => {
                totalMatches = totalMatches + match.matches.length;
            });
            return totalMatches;
        },
        returnUpcomingMatchesCount(state) {
            return state.upcomingMatches.length
        },
        returnMatchStandings(state) {
            return state.matchStandings
        },
        returnMatchHead2Head(state) {
            return state.matchHead2Head
        }
    },

    actions: {
        getMatchStandings({
            commit
        }, payload) {

            if (store.state.$Ui.ui.selectedMatch.time.status == 'LIVE') {
                payload.standing = "live"
            } else {
                payload.standing = "nolive"
            }
            axios.get(apiUrl + '/api/data/standings', {
                params: payload
            }).then(resp => {

                commit("updateMatchStandings", resp.data.Standings)
            }).catch(err => console.log(err))
        },
        getMatchHead2Head({
            commit
        }, payload) {
            axios.get(apiUrl + '/api/data/head2head', {
                params: payload
            }).then(resp => {

                commit("updateMatchHead2Head", resp.data.Head2Head)
            }).catch(err => console.log(err))
        },
        requestAllMatchesFromDate({
            commit
        }, payload) {
            // console.log("THERE", payload);
            commit("updateLoading", true)
            axios.post(apiUrl + '/api/data/calendar', {
                "payload": {
                    "startdate": payload.startDate,
                    "enddate": payload.endDate
                }
            }).then(resp => {
                // console.log("UPDATE AL MATCHES _2_________________________2___________2_", resp.data)

                commit("updateAllMatches", resp.data.All)
                setTimeout(() => {
                    commit("updateLoading", false)

                }, 5000)
            }).catch(err => {
                console.log(err);
            })
        },
        requestAllMatches({
            commit
        }, payload) {
            function getAllMatches() {
                let startDate = new Date().toISOString().slice(0, 10);
                let endDate = new Date().toISOString().slice(0, 10);
                // console.log("THERE");
                //  commit("updateLoading", true) 
                axios.post(apiUrl + '/api/data/calendar', {
                    "payload": {
                        "startdate": startDate,
                        "enddate": endDate
                    }
                }).then(resp => {
                    // console.log("UPDATE AL MATCHES ______________________________________", resp.data);
                    commit("updateAllMatches", resp.data.All)
                    // console.log("THERE");
                    commit("updateLoading", false)
                }).catch(err => {
                    console.log(err);
                })
            }
            getAllMatches()
            // console.log("done")
        },
        getLiveMatches({
            state,
            getters,
            rootState,
            rootGetters,
            commit,
            dispatch
        }, payload) {
            let createPreviousNotifi = false;
            if (payload && payload.first) {
                createPreviousNotifi = true;
            }
            if (state.count === 0) {
                store.commit("updateLoading", true)
            }
            state.count++

            // console.log(state.count)
            // store.commit("updateCricle", true);
            const expireDate = new moment(localStorage.getItem("date"));
            const dateNow = new moment(new Date());
            // console.log("dateNOW",expireDate,dateNow,expireDate > dateNow );
            if (!localStorage.hasOwnProperty('date')) {
                localStorage.clear();
                window.location = "https://soccersignals.pro/login/";
                // return;
            }
            if (expireDate < dateNow) {
                localStorage.clear();
                window.location = "https://soccersignals.pro/login/";
            }
            Vue.prototype.$io.emit("LiveMatches", {
                user_id: store.getters.returnUser._id,
                createPreviousNotifi: createPreviousNotifi
            });
            // axios.get(apiUrl + '/api/data/live').then(resp => {
            //     console.log("API RESPONSE",resp)
            // store.commit("updateLoading", false);
            // store.commit("updateCricle", false);
            // commit("updateLiveMatches", resp.data.Live)
            // }).catch(err => {
            //     console.log(err)
            // })
            // unnecessary dispatch("requestFinishedMatches")
        },
        getFilters({
            state,
            getters,
            rootState,
            rootGetters,
            commit,
            dispatch
        }) {
            // console.log("filters");
            axios.get(apiUrl + '/api/accounts/filter').then(resp => {
                commit("updatefilter", resp.data)
                // console.log(resp, "filters");
            }).catch(err => {
                console.log("ERROR", err)
            });
            // dispatch("requestFinishedMatches")
        },
        requestUpcomingMatches({
            state,
            getters,
            rootState,
            rootGetters,
            commit
        }) {
            function getUpcoming() {
                axios.get(apiUrl + '/api/data/upcoming').then(resp => {
                    // console.log("Response Data ", resp.data);
                    commit("updateUpcomingMatches", resp.data.Upcoming)
                }).catch(err => console.log(err))
            }
            getUpcoming()
            // console.log("done")
        },
        requestFinishedMatches({
            state,
            getters,
            rootState,
            rootGetters,
            commit
        }) {

            axios.get(apiUrl + '/api/data/finished').then(resp => {
                commit("updateFinishedMatches", resp.data.Finished)
            }).catch(err => {
                // console.log(err)
            })
        },
        getCountryLeagues({
            commit
        }, payload) {
            return axios.get(apiUrl + '/api/data/countries', {
                params: {
                    page: payload
                }
            }).then(resp => {
                commit("updateCountryLeagues", resp.data.Countries);
                console.log(resp)
                return {
                    success: true
                }
            }).catch(err => {
                return {
                    success: false
                }
            })
        },
        getNotifications({
            commit
        }, payload) {
            axios.get(apiUrl + '/api/data/notifications?type=goal', {
                params: {
                    page: payload
                }
            }).then(resp => {
                // console.log("SHORT LIST MATCHES *********************",shortListData,resp.data);
                commit("updateNotifications", resp.data)
            }).catch(err => {
                console.log(err)
            })
        },
        setLiveMatchUpdateIsFav({
            commit
        }, payload) {
            commit("updateLiveMatchIsFav", payload);
        },
        markAllNotificationAsRead({
            commit
        }, payload) {
            axios.post(apiUrl + '/api/data/notifications/markallread', {
                payload
            }).then(resp => {
                commit("getNotifications", 1)
            })
        },
        markAllNotificationRead({
            commit
        }, payload) {
            axios.post(apiUrl + '/api/data/notifications/mark/read').then(resp => {
                // commit("updateNotifications", resp.data)
                // commit("getNotifications", 1)
            })
        }
    },
    mutations: {

        updateLiveMatchesOnSearch(state, searchValue) {
            // liveMatch;
            // console.log(searchValue);
            state.searchKeyWord = searchValue.toLowerCase();
            // let liveMatch = [...state.liveMatches];
            // let StateMatches = [];
            // state.liveMatches = [];

            // console.log(liveMatch);
            // // console.log(StateMatches);
            // state.liveMatches = StateMatches;

        },
        updateLiveMatches(state, data) {
            state.liveMatches = []
            
            if(data){
            data.sort(function (a, b) {
                if (a.country.data.name < b.country.data.name) {
                    return -1;
                }
                if (a.country.data.name > b.country.data.name) {
                    return 1;
                }
                return 0;
            });
            //   console.log(data,"Updated Sort Matches");
            data.forEach(league => {

                league.matches.forEach(match => {
                    if (store.state.$Ui.ui.selectedMatch && match.id == store.state.$Ui.ui.selectedMatch.id) {
                        store.state.$Ui.ui.selectedMatch = match;
                    }
                })
                // Object.freeze(league)
                state.liveMatches.push(league)
            });
        }
            store.commit("updateLoading", false)
        },
        updateLiveMatchIsFav(state, data) {
            // console.log(state.liveMatches, "Update US FACE");
            const liveMatchCopy = [...state.liveMatches];
            // state.liveMatches = [];
            // Object.
            state.liveMatches = liveMatchCopy.map(matches => {
                matches.matches = matches.matches.map(match => {
                    if (match.id === data.matchId) {
                        delete match.is_my_favorite;
                        if (data.status) {
                            match.is_my_favorite = data.status;
                        }
                        // console.log(match.id, match.is_my_favorite)
                        // return match;
                    }
                    // console.log(match, " MATCH");
                    return match;
                });
                // console.log(matches);
                return matches;
            });
            // console.log(state.liveMatches);
        },



        updatefilter(state, data) {
            // console.log("DATA Filter", data);

            state.filter = data;
            // this.$router.push("/scanner/live");

            store.commit("updateFilterCount", {
                filter_id: state.filter[0].id,
                count: 0
            });

            store.commit(
                "updateSelectedFilter",
                state.filter[0]
            );
        },

        updateUpcomingMatches(state, data) {
            state.upcomingMatches = []
            // console.log("Data is Coming", data);
            data.forEach(match => {
                // console.log(match);
                // Object.freeze(match)
                state.upcomingMatches.push(match)
            })
        },
        updateFinishedMatches(state, data) {
            // console.log(state, data, " UPDATE FINISHED MATCHES");
            state.finishedMatches = []
            if (data) {
                data.forEach(match => {
                    // Object.freeze(match)
                    state.finishedMatches.push(match)
                })
            }
            // dispatch("getLiveMatches")
            // store.dispatch("getLiveMatches");

        },
        updateAllMatches(state, allMatches) {
            if (allMatches.shouldClearData) {
                state.allMatches = []
            } else {
                state.allMatchesTotalPages = allMatches.total_pages
                state.allMatches = []
                allMatches.data.forEach(match => {
                    state.allMatches.push(match)
                });
                // console.log(state.allMatches.length);
                // setTimeout(()=>{

                //     commit("updateLoading", false)
                // },3000);
            }
        },
        updateCountryLeagues(state, countries) {
            if (countries.shouldClearData) {
                state.countryLeagues = []
            } else {
                state.countryTotalPages = countries.meta.pagination.total_pages
                countries.data.forEach(country => {
                    Object.freeze(country);
                    state.countryLeagues.push(country)
                });
            }

        },
        updateMatchStandings(state, standings) {
            state.matchStandings = standings

        },
        updateMatchHead2Head(state, head2head) {
            state.matchHead2Head = head2head

        },
        updateNotifications(state, notifications) {

            if (notifications.shouldClearData) {
                state.notifications = []
            } else {
                let filterNotification = [];
                for (let i = 0; i < notifications.data.length; i++) {
                    let exist = false;
                    for (let j = 0; j < state.notifications.length; j++) {
                        if (state.notifications[j]._id == notifications.data[i]._id) {
                            exist = true;
                        }

                    }
                    if (!exist) {
                        filterNotification.push(notifications.data[i]);
                    }
                }
                state.notificationTotalPages = notifications.pages
                filterNotification.forEach(notification => {
                    Object.freeze(notification);
                    state.notifications.push(notification)
                });
            }
        },
        addNotification(state, data) {
            data.is_new = true;
            state.notifications.unshift(data)
        },
        updateSelectedMatch(state, matchId) {
            // console.log(store.state.$Ui.ui.selectedMatch)
            store.state.$Ui.ui.matchModalOpened = false

            state.liveMatches.forEach(league => {
                let selectedMatch = league.matches.find(match => match.id == matchId)
                if (selectedMatch) {
                    store.state.$Ui.ui.selectedMatch = selectedMatch
                    store.state.$Ui.ui.matchModalOpened = true;
                }
            })
        },
        addMyLeague(state, league) {

            let index = state.myLeagues.findIndex(item => {
                return item.country_id == league.country_id
            })
            if (index >= 0) {
                state.myLeagues[index].leagues.push(league)
            } else {
                state.myLeagues.push({
                    country_id: league.country_id,
                    leagues: [league]
                });
            }
            let matchLeague = state.allMatches.find(match => match.id == league.id) || state.liveMatches.find(match => match.id == league.id) || state.finishedMatches.find(match => match.id == league.id) || state.upcomingMatches.find(match => match.id == league.id)
            if (matchLeague) {
                matchLeague = Object.assign({}, matchLeague, {
                    is_my_league: true
                });
                // matchLeague.is_my_league = true
            }
            let selectedCountryLeague = state.countryLeagues.find(c => c.id == league.country_id)
            if (selectedCountryLeague) {
                selectedCountryLeague.leagues.data.find(l => l.id == league.id).is_my_league = true
            }

            let allLeagues = [...state.countryLeagues];
            state.countryLeagues = []
            state.countryLeagues = allLeagues;

        },
        removeMyLeague(state, league) {
            var matchLeague = state.allMatches.find(match => match.id == league.id) || state.liveMatches.find(match => match.id == league.id) || state.finishedMatches.find(match => match.id == league.id) || state.upcomingMatches.find(match => match.id == league.id)
            if (matchLeague) {
                matchLeague = Object.assign({}, matchLeague, {
                    is_my_league: false
                });
                // matchLeague.is_my_league = false
            }
            let countryIndex = state.myLeagues.findIndex(item => item.country_id == league.country_id);
            if (state.myLeagues[countryIndex].leagues.length > 1) {
                let leagueIndex = state.myLeagues[countryIndex].leagues.findIndex(item => item.id == league.id);
                state.myLeagues[countryIndex].leagues.splice(leagueIndex, 1);
            } else {
                state.myLeagues.splice(countryIndex, 1);
            }
            let selectedCountryLeague = state.countryLeagues.find(c => c.id == league.country_id)
            if (selectedCountryLeague) {
                selectedCountryLeague.leagues.data.find(l => l.id == league.id).is_my_league = false
            }

            let allLeagues = [...state.countryLeagues];
            state.countryLeagues = []
            state.countryLeagues = allLeagues;

        },
        fetchMyLeagues(state, data) {
            let leagues = []
            data.forEach(league => {
                let leagueIndex = leagues.findIndex(item => item.country_id == league.country_id)
                if (leagueIndex >= 0) {
                    leagues[leagueIndex].leagues.push(league)
                } else {
                    leagues.push({
                        country_id: league.country_id,
                        leagues: [league]
                    })
                }
            })
            state.myLeagues = leagues
        }
    }
}