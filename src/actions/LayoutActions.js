export const TOGGLE_TWO_COLUMN_ENABLED = 'toggleTwoColumnEnabled';
export const TOGGLE_MESSAGE_CARD_TYPE = 'toggleMessageCardType';
export const TOGGLE_TICKET_SETTING = 'toggleTicketSetting';
export const OPEN_TAB = 'openTab';
export const CLOSE_TAB = 'closeTab';
export const CHANGE_TAB = 'changeTab';


export const toggleTwoColumnEnabled = () => ({
  type: TOGGLE_TWO_COLUMN_ENABLED,
});

export const toggleMessageCardType = () => ({
  type: TOGGLE_MESSAGE_CARD_TYPE,
});

export const toggleTicketSetting = () => ({
  type: TOGGLE_TICKET_SETTING,
});

export const openTab = (tab) => ({
  type: OPEN_TAB,
  payload: {tab}
});

export const closeTab = (UID) => ({
  type: CLOSE_TAB,
  payload: {UID}
});

export const changeTab = (UID) => ({
  type: CHANGE_TAB,
  payload: {UID}
});
