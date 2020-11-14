import React, { useState, useEffect } from 'react';
import { shapeStyle } from '../helpers';
import ShapeForm from './ShapeForm';
import ColorPicker from 'react-pick-color';
import { v4 as uuid4 } from 'uuid';

interface ShapeState {
  name: string;
  length: string;
  radius: string;
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
  const [prevShapes, setPrevShapes] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [history, setHistory] = useState('history');

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
    setPrevShapes([
      ...prevShapes,
      { name, length, radius, color: pickerColor, id: uuid4() },
    ]);
  };

  const clearShape = () => {
    setShape(initalState);
    setPickerColor('#ff6363');
    setShowPicker(false);
  };

  const setColor = (color: string) => {
    setShape({ ...shape, color });
  };

  const handleHistory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const histShape = prevShapes.find(prevShape => prevShape.id === value);
    setShape(histShape);
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

        <select className="history" value={history} onChange={handleHistory}>
          <option value="history" disabled>
            History
          </option>
          {prevShapes.map(sh => (
            <option value={sh.id}>
              {sh.name} - {sh.length || sh.radius}
            </option>
          ))}
        </select>
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
          />
          <h3 className="shape-name">{shape.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default ShapeBuffet;
