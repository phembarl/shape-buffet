import React, { useState, useEffect } from 'react';
import { shapeStyle } from '../helpers';
import ShapeForm from './ShapeForm';
import ColorPicker from 'react-pick-color';

interface ShapeState {
  name: string;
  length: string;
  radius: string;
  color?: string;
}

const ShapeBuffet = () => {
  const initalState = {
    name: '',
    length: '',
    radius: '',
    color: '',
  };

  const [shape, setShape] = useState(() => {
    const localData = localStorage.shape;
    return localData ? JSON.parse(localData) : initalState;
  });

  const [pickerColor, setPickerColor] = useState(shape.color || '#ff6363');

  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    localStorage.shape = JSON.stringify(shape);
  }, [shape]);

  useEffect(() => {
    setColor(pickerColor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickerColor]);

  const createShape = (shapeDetails: ShapeState) => {
    const { name, length, radius } = shapeDetails;
    setShape({ ...shape, name, length, radius });
  };

  const clearShape = () => {
    setShape(initalState);
    setShowPicker(false);
  };

  const setColor = (color: string) => {
    setShape({ ...shape, color });
  };

  const chosenShapeStyle = shapeStyle(shape);

  return (
    <div className="ShapeBuffet">
      <div className="controls">
        <ShapeForm createShape={createShape} />
        <button
          className="toggle-picker"
          onClick={() => setShowPicker(!showPicker)}
          disabled={!shape.name}
        >
          {showPicker ? 'Hide Color Picker' : 'Change Color'}
        </button>

        <button
          className="clear-btn"
          onClick={clearShape}
          disabled={!shape.name}
        >
          Clear
        </button>
      </div>

      <div className="container">
        {showPicker && (
          <ColorPicker
            color={pickerColor}
            onChange={color => setPickerColor(color.hex)}
            className="color-picker"
          />
        )}

        <div className="shape-container">
          <div
            className={`shape ${shape.name}`}
            style={{ ...chosenShapeStyle, backgroundColor: shape.color }}
            data-testid="shape-div"
          ></div>
          <h3 className="shape-name">{shape.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default ShapeBuffet;
