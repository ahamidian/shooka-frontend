import {combineReducers} from 'redux'
import NavigationReducer from './NavigationReducer'
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import TicketReducer from "./TicketReducer";
import AgentReducer from "./AgentReducer";
import TeamReducer from "./TeamReducer";
import TagReducer from "./TagReducer";

export default combineReducers({
    navigation: NavigationReducer,
    user: UserReducer,
    layout: LayoutReducer,
    tickets: TicketReducer,
    agents: AgentReducer,
    teams: TeamReducer,
    tags: TagReducer,
});
