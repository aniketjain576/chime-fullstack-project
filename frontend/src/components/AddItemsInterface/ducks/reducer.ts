import { Tag, Action, MenuItem } from "../interfaces";
import { RECEIVED_TAGS, RECEIVED_MENU_ITEMS } from "./types";

const initialState: { tags: Tag[]; menuItems: MenuItem[] } = {
  tags: [],
  menuItems: [],
};

export default function menuReducer(state = initialState, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case RECEIVED_TAGS: {
      return {
        ...state,
        tags: payload.tags,
      };
    }
    case RECEIVED_MENU_ITEMS: {
      return {
        ...state,
        menuItems: payload.menuItems,
      };
    }
    default:
      return state;
  }
}
