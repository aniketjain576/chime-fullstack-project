import axios from "axios";
import { NormalThunk, Tag, MenuItem } from "../interfaces";
import { RECEIVED_TAGS, RECEIVED_MENU_ITEMS } from "./types";
import { BACKEND_URL } from "../../../constants";

export function doGetTagsFromDb(): NormalThunk {
  return (dispatch, getState) => {
    axios.get(`${BACKEND_URL}/tag`).then((res) => {
      dispatch({
        type: RECEIVED_TAGS,
        payload: { tags: res.data },
      });
    });
  };
}

export function doAddTagToDb(tag: Tag): NormalThunk {
  return (dispatch, getState) => {
    axios.post(`${BACKEND_URL}/tag`, tag).then(() => {
      dispatch(doGetTagsFromDb());
    });
  };
}

export function doGetMenuItemsFromDb(): NormalThunk {
  return (dispatch, getState) => {
    axios.get(`${BACKEND_URL}/menu-item`).then((res) => {
      dispatch({
        type: RECEIVED_MENU_ITEMS,
        payload: { menuItems: res.data },
      });
    });
  };
}

export function doAddMenuItemToDb(menuItem: MenuItem): NormalThunk {
  return (dispatch, getState) => {
    axios.post(`${BACKEND_URL}/menu-item`, menuItem).then(() => {
      dispatch(doGetMenuItemsFromDb());
    });
  };
}
