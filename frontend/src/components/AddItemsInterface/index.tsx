import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { FormTypes, Tag, MenuItem } from "./interfaces";
import { RootStateOrAny, connect } from "react-redux";
import {
  doGetTagsFromDb,
  doAddTagToDb,
  doAddMenuItemToDb,
} from "./ducks/actions";

const select = (state: RootStateOrAny) => ({
  availableTags: state.menuInfo.tags,
  menuItems: state.menuInfo.menuItems,
});

const actions = {
  getTagsFromDb: doGetTagsFromDb,
  addTagToDb: doAddTagToDb,
  addMenuItemToDb: doAddMenuItemToDb,
};

function AddItemsInterface({
  availableTags,
  addTagToDb,
  addMenuItemToDb,
}: {
  availableTags: Tag[];
  addTagToDb: Function;
  addMenuItemToDb: Function;
}) {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [tagSelector, setTagSelector] = useState("Tag (optional)");
  const [formType, setFormType] = useState(FormTypes.ADD_MENU_ITEM);

  const toggleButtonMessage =
    formType === FormTypes.ADD_MENU_ITEM ? "Create a tag" : "Add a menu item";

  function handleSubmit(e: any) {
    e.preventDefault();

    if (fieldsAreEmpty()) {
      return;
    }

    submitForm();

    setName("");
    setTag("");
    setTagSelector("Tag (optional)");
    return;
  }

  function handleChange(e: any) {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        return;
      case "tag":
        setTag(e.target.value);
        return;
      case "tag-selector":
        setTagSelector(e.target.value);
        return;
      default:
        return;
    }
  }

  return (
    <Container>
      <FormWrapper>
        {formType === FormTypes.ADD_TAG ? (
          <TextInput
            name='tag'
            onChange={handleChange}
            value={tag}
            type='text'
            placeholder='Tag'
            autoComplete='none'
          />
        ) : (
          <>
            <TextInput
              name='name'
              onChange={handleChange}
              value={name}
              type='text'
              placeholder='Menu Item'
              autoComplete='none'
            />
            <SubjectInputWrapper>
              <SubjectInput
                name='tag-selector'
                onChange={handleChange}
                value={tagSelector}
                style={{
                  color:
                    tagSelector === "Tag (optional)"
                      ? "rgba(0, 0, 0, 0.5)"
                      : "#333",
                }}
              >
                <SubjectPlaceholder disabled selected hidden>
                  Tag (optional)
                </SubjectPlaceholder>
                {availableTags.map((tag) => {
                  return (
                    <SubjectOption value={tag.tagName}>
                      {tag.tagName}
                    </SubjectOption>
                  );
                })}
              </SubjectInput>
            </SubjectInputWrapper>
          </>
        )}

        <SubmitButton onClick={handleSubmit}>Add</SubmitButton>
        <ToggleFormButton onClick={() => toggleFormType()}>
          {toggleButtonMessage}
        </ToggleFormButton>
      </FormWrapper>
    </Container>
  );

  function fieldsAreEmpty() {
    if (formType === FormTypes.ADD_MENU_ITEM) {
      if (name.trim() === "") {
        return true;
      }
      return false;
    }
    if (tag.trim() === "") {
      return true;
    }
    return false;
  }

  function toggleFormType() {
    if (formType === FormTypes.ADD_MENU_ITEM) {
      setFormType(FormTypes.ADD_TAG);
      return;
    }
    setFormType(FormTypes.ADD_MENU_ITEM);
  }

  function submitForm() {
    if (formType === FormTypes.ADD_TAG) {
      addTagToDb({ tagName: tag });
    } else {
      if (tagSelector === "Tag (optional)") {
        addMenuItemToDb({ name, tag: null });
      } else {
        addMenuItemToDb({ name, tag: tagSelector });
      }
    }
  }
}

export default connect(select, actions)(AddItemsInterface);

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 300px;
  width: 85%;
`;

const ToggleFormButton = styled.div`
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid black;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  background-color: #166446;
  padding: 5px;
  max-width: 135px;
  display: flex;
`;

const SubjectInputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const FormWrapper = styled.form`
  border-radius: 20px;
  border: 4px solid #166446;
  padding: 15px;
  display: flex;
  flex-direction: column;
  max-width: 700px;
  min-height: 150px;
  width: 100%;
`;

const TextInput = styled.input`
  display: block;
  outline: none;
  border-radius: 20px;
  background: white;
  color: black;
  border: none;
  font-weight: bold;
  flex: 1;
  border: 4px solid #166446;
  color: #333;
  margin: 0 auto;
  padding: 8px 12px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
  font-size: 20px;
  max-height: 60px;
`;

const SubjectInput = styled.select`
  display: block;
  margin: 0 auto;
  outline: none;
  padding: 8px 12px;
  border-radius: 20px;
  color: black;
  border: none;
  font-weight: bold;
  font-size: 20px;
  border: 4px solid #166446;
  color: white;
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
`;

const SubjectOption = styled.option`
  color: black;
  font-weight: bold;
  font-size: 20px;
`;

const SubjectPlaceholder = styled(SubjectOption)``;

const SubmitButton = styled.button`
  cursor: pointer;
  border: 4px solid #166446;
  outline: none;
  background: white;
  box-sizing: border-box;
  border-radius: 50px;
  font-size: 1.3em;
  font-weight: bold;
  width: 20%;
  margin: 0 auto;
`;
