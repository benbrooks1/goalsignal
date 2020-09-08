// Local Team

var localTeamValue = Number;
var visitorTeamValue = Number;

function whoRoundsUp() {
  if (localTeamValue > visitorTeamValue) {
    return "localTeam";
  } else if (visitorTeamValue > localTeamValue) {
    return "visitorTeam";
  }
}

export function localTeamSupremacy(baseObject) {
  localTeamValue =
    (((Number(baseObject.localTeam_stats.attacks.dangerous_attacks) +
      Number(baseObject.localTeam_stats.shots.ongoal)) *
      10) /
      ((Number(baseObject.localTeam_stats.attacks.dangerous_attacks) +
        Number(baseObject.localTeam_stats.shots.ongoal)) *
        10 +
        Number(baseObject.visitorTeam_stats.attacks.dangerous_attacks) +
        Number(baseObject.visitorTeam_stats.shots.ongoal) * 10)) *
    100;
  if (whoRoundsUp() == "localTeam") {
    return Math.ceil(localTeamValue);
  } else if (whoRoundsUp() == "visitorTeam") {
    return Math.floor(localTeamValue);
  }
}

// Visitor Team
export function visitorTeamSupremacy(baseObject) {
  visitorTeamValue =
    ((Number(baseObject.visitorTeam_stats.attacks.dangerous_attacks) +
      Number(baseObject.visitorTeam_stats.shots.ongoal) * 10) /
      (Number(baseObject.localTeam_stats.attacks.dangerous_attacks) +
        Number(baseObject.localTeam_stats.shots.ongoal) * 10 +
        Number(baseObject.visitorTeam_stats.attacks.dangerous_attacks) +
        Number(baseObject.visitorTeam_stats.shots.ongoal) * 10)) *
    100;
  if (whoRoundsUp() == "localTeam") {
    return Math.floor(visitorTeamValue);
  } else if (whoRoundsUp() == "visitorTeam") {
    return Math.ceil(visitorTeamValue);
  }
}
