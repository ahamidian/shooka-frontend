export const getTimeSince = (time) => {
  let timeAgo = "";

  const SECOND = 1000;
  const MINUTE = SECOND * 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;
  const WEEK = DAY * 7;
  const MONTH = DAY * 30;
  const YEAR = DAY * 365;

  let diffInMillis = (new Date().valueOf()) - (new Date(time).valueOf());
  if (diffInMillis < MINUTE) {
    timeAgo = Math.round(diffInMillis / SECOND) + " seconds"
  } else if (diffInMillis < HOUR) {
    timeAgo = Math.round(diffInMillis / MINUTE) + " minutes and " + Math.round((diffInMillis % MINUTE) / SECOND) + " seconds"
  } else if (diffInMillis < DAY) {
    timeAgo = Math.round(diffInMillis / HOUR) + " hours and " + Math.round((diffInMillis % HOUR) / MINUTE) + " minutes"
  } else if (diffInMillis < MONTH) {
    timeAgo = Math.round(diffInMillis / DAY) + " days and " + Math.round((diffInMillis % DAY) / HOUR) + " hours"
  } else if (diffInMillis < YEAR) {
    timeAgo = Math.round(diffInMillis / MONTH) + " months and " + Math.round((diffInMillis % MONTH) / DAY) + " days"
  } else {
    timeAgo = Math.round(diffInMillis / YEAR) + " years and " + Math.round((diffInMillis % YEAR) / MONTH) + " months"
  }
  return timeAgo
};

export const getAgentOptions = (agents,initialOptions) => {
    agents.map(agent => initialOptions.push({value: agent.id, label: agent.name, image: agent.avatar}));
    return initialOptions
};

export const getTeamOptions = (teams,initialOptions) => {
    teams.map(team => initialOptions.push({value: team.id, label: team.name}));
    return initialOptions
};

export const getTagOptions = (tags,initialOptions) => {
    tags.map(tag => initialOptions.push({value: tag.id, label: tag.name}));
    return initialOptions
};

export const getPriorityOptions = () => {
    return [{value: 1, label: "1"}, {value: 2, label: "2"}, {value: 3, label: "3"}, {value: 4, label: "4"},
        {value: 5, label: "5"}, {value: 6, label: "6"}, {value: 7, label: "7"}, {value: 8, label: "8"},
        {value: 9, label: "9"}, {value: 10, label: "10"}]
};

export const getStatusOptions = ()=> {
   return [{value: 0, label: "Awaiting User"}, {value: 1, label: "Awaiting Agent"}, {
       value: 2,
       label: "Resolved"
   }]
};
