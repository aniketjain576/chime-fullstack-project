import { RootStateOrAny } from "react-redux";
import { ThunkAction } from "redux-thunk";

export enum FormTypes {
  ADD_MENU_ITEM = "ADD_MENU_ITEM",
  ADD_TAG = "ADD_TAG",
}

export interface Action {
  type: string;
  payload: {
    tags?: Tag;
    menuItems?: MenuItem[];
  };
}

export interface Tag {
  id?: number;
  tagName: string;
}

export interface MenuItem {
  id?: number;
  name: string;
  tag: string;
}

export type ThunkResult<R> = ThunkAction<
  R,
  RootStateOrAny,
  undefined,
  { type: string }
>;
export type NormalThunk = ThunkResult<void | undefined | null>;
