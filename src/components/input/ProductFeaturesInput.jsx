import React, { useState, useEffect } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { makeStyles } from "@material-ui/core";
import "./styles.css";

// const KeyCodes = {
//   comma: 188,
//   enter: 13,
// };

// const delimiters = [KeyCodes.comma, KeyCodes.enter];

// function ProductFeaturesInput({ features, onChange }) {
//   const [tags, setTags] = useState(
//     features.map((feature) => ({ id: feature, text: feature }))
//   );

//   const handleDelete = (i) => {
//     const newTags = tags.filter((tag, index) => index !== i);
//     setTags(newTags);
//     onChange(newTags.map((tag) => tag.text)); // Cập nhật lại features
//   };

//   const handleAddition = (tag) => {
//     setTags([...tags, tag]);
//     onChange([...tags, tag].map((tag) => tag.text)); // Cập nhật lại features
//   };

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
    marginTop: 10,
    marginBottom: 10,
  },
  textInput: {
    fontSize: "1.3rem",
    marginTop: 10,
    marginBottom: 10,
    "& .Mui-disabled": {
      color: "blue",
    },
  },
}));

const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};

const SEPARATORS = {
  ENTER: "Enter",
  TAB: "Tab",
  COMMA: ",",
  SPACE: " ",
  SEMICOLON: ";",
};

// const suggestions = COUNTRIES.map((country) => {
//   return {
//     id: country,
//     text: country,
//     className: '',
//   };
// });

function ProductFeaturesInput(props) {
  const classes = useStyles();
  const { features, onChange } = props;
  console.log("child " + features + " type " + typeof features);

  let initialTags = [];
  if (features && features.length > 0 && features[0] !== "" && features) {
    initialTags = features.map((feature, index) => ({
      id: feature,
      text: feature,
    }));
  }
  const [tags, setTags] = useState(initialTags);

  const handleAddition = (tag) => {
    const newTags = [...tags, tag];
    setTags(newTags);
    onChange(newTags.map((tag) => tag.text));
    // setTags([...tags, tag]);
    // onChange([...tags, tag].map((tag) => tag.text));
  };

  // useEffect(() => {
  //   if (features && features.length > 0) {
  //     const initialTags = features.map((feature, index) => ({
  //       id: index,
  //       text: feature,
  //     }));
  //     setTags(initialTags);
  //   }
  // }, [features]);

  const handleDelete = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onChange(newTags.map((tag) => tag.text)); // Gọi hàm onChange để cập nhật state ở component cha
  };

  const onTagUpdate = (index, newTag) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1, newTag);
    setTags(updatedTags);
    onChange(updatedTags.map((tag) => tag.text)); // Gọi hàm onChange để cập nhật state ở component cha
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
    onChange(newTags.map((tag) => tag.text));
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const onClearAll = () => {
    setTags([]);
    onChange([]); // Gọi hàm onChange để cập nhật state ở component cha
  };
  return (
    <div className={classes.formControl}>
      <label className={classes.textInput}>Product Features</label>
      <div>
        <ReactTags
          tags={tags}
          // suggestions={suggestions}
          separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          onTagUpdate={onTagUpdate}
          inputFieldPosition="bottom"
          editable
          clearAll
          onClearAll={onClearAll}
          maxTags={7}
          allowAdditionFromPaste
        />
      </div>
    </div>
  );
}

export default ProductFeaturesInput;
