import React from "react";
import { connect, RootStateOrAny } from "react-redux";
import {
  doGetTagsFromDb,
  doGetMenuItemsFromDb,
} from "./AddItemsInterface/ducks/actions";
import AddItemsInterface from "./AddItemsInterface";
import { Tag } from "./AddItemsInterface/interfaces";

const actions = {
  getTagsFromDb: doGetTagsFromDb,
  getMenuItemsFromDb: doGetMenuItemsFromDb,
};

function RestaurantOwnerPage({
  getTagsFromDb,
  getMenuItemsFromDb,
}: {
  getTagsFromDb: Function;
  getMenuItemsFromDb: Function;
}) {
  getTagsFromDb();
  getMenuItemsFromDb();

  return <AddItemsInterface />;
}

export default connect(null, actions)(RestaurantOwnerPage);
