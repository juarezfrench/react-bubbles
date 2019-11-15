import React, { useState } from "react";
import AxiosWithAuth from "./AxiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    // e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    AxiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
    // updateColors(colors,res.data);
      updateColors([colors.find(color => color.id === colorToEdit.id),res.data])
        setEditing(false);
        // (console.log("Response", res.data));
    
    })
    .catch(err => console.log("Nope, nope and nope:", err.response));
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    AxiosWithAuth()
    .delete(`api/colors/${color.id}`)
    // (res => console.log("Res:", res))
    .then(res => {
      // console.log(res);
      updateColors(colors.filter(color => color.id !== res.data));
      setEditing(false);
    })
    .catch(err =>
      console.error("Yeah, not so much - look here:", err.response)
    );
  };

  return (
    <div className="colors-wrap">
      <p>Click colors to edit</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <button className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  Delete Color
              </button>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
