import {
    TOGGLE_TWO_COLUMN_ENABLED,
    TOGGLE_MESSAGE_CARD_TYPE,
    TOGGLE_TICKET_SETTING,
    CLOSE_TAB,
    OPEN_TAB,
    CHANGE_TAB,
    UPDATE_TAB
} from "../actions/LayoutActions";
import _ from 'lodash'
import history from '../history'

const initialState = {
    twoColumnEnabled: false,
    tabs: [],
    activeTab: null,
    singleTab: null,
    messageCardType: 1,
    ticketSettingsInSide: true
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TOGGLE_TICKET_SETTING:
            return {
                ...state,
                ticketSettingsInSide: !state.ticketSettingsInSide,
            };

        case TOGGLE_MESSAGE_CARD_TYPE:
            return {
                ...state,
                messageCardType: state.messageCardType === 3 ? 1 : state.messageCardType + 1,
            };

        case TOGGLE_TWO_COLUMN_ENABLED:
            if (state.twoColumnEnabled) {
                return {
                    ...state,
                    twoColumnEnabled: false,
                    tabs: [state.singleTab, ...state.tabs],
                };
            } else {
                return {
                    ...state,
                    twoColumnEnabled: true,
                    tabs: [...state.tabs.filter(tab => tab.UID !== state.singleTab.UID)],
                    activeTab: state.activeTab === state.singleTab.UID ? state.tabs[1].UID : state.activeTab,
                };
            }

        case OPEN_TAB:
            let newTabs;
            let newSingleTab = (action.payload.tab.type === "ticketList") ? action.payload.tab : state.singleTab;

            if (!state.tabs.some(tab => tab.UID === action.payload.tab.UID)) {
                newTabs = [...state.tabs, action.payload.tab];
            } else {
                if (state.tabs.some(tab => _.isEqual(tab, action.payload.tab))) {
                    newTabs = state.tabs;
                } else {
                    newTabs = [...state.tabs.map(tab => tab.UID === action.payload.tab.UID ? action.payload.tab : tab)];
                }
            }
            history.push("/" + action.payload.tab.UID);
            return {
                ...state,
                tabs: newTabs,
                activeTab: action.payload.tab.UID,
                singleTab: newSingleTab
            };

        case CLOSE_TAB:
            let nextActiveTab = state.activeTab;
            if (state.activeTab === action.payload.UID) {
                let currentIndex = state.tabs.map(tab => tab.UID).indexOf(action.payload.UID);
                if (state.tabs.length === currentIndex + 1) {
                    nextActiveTab = state.tabs[currentIndex - 1].UID;
                } else {
                    nextActiveTab = state.tabs[currentIndex + 1].UID;
                }
            }
            history.push("/" + nextActiveTab);
            return {
                ...state,
                tabs: [...state.tabs.filter(tab => tab.UID !== action.payload.UID)],
                activeTab: nextActiveTab
            };

        case CHANGE_TAB:
            history.push("/" + action.payload.UID);
            return {
                ...state,
                activeTab: action.payload.UID,
            };
        case UPDATE_TAB:
            return {
                ...state,
                tabs: [...state.tabs.map(tab => (tab.UID === action.payload.UID) ? action.payload.tab : tab)],
                activeTab: (state.activeTab === action.payload.UID) ? action.payload.tab.UID : state.activeTab
            };

        default:
            return state;
    }
}
