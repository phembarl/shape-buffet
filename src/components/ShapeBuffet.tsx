import React, { useState, useEffect } from 'react';
import { shapeStyle } from '../helpers';
import ShapeForm from './ShapeForm';

interface ShapeState {
  name: string;
  length: string;
  radius: string;
  color: string;
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

  useEffect(() => {
    localStorage.shape = JSON.stringify(shape);
  }, [shape]);

  const createShape = (shapeDetails: ShapeState) => {
    const { name, length, radius, color } = shapeDetails;
    setShape({ name, length, radius, color });
  };

  const chosenShapeStyle = shapeStyle(shape);

  return (
    <div className="ShapeBuffet">
      <ShapeForm createShape={createShape} />
      <div className="shape-container">
        <div
          className={`shape ${shape.name}`}
          style={{ ...chosenShapeStyle, backgroundColor: shape.color }}
          data-testid="shape-div"
        ></div>
        <h3 className="shape-name">{shape.name}</h3>
      </div>
    </div>
  );
};

export default ShapeBuffet;
