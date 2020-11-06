import React, { useState, useEffect } from 'react';
import { shapeStyle } from '../helpers';
import ShapeForm from './ShapeForm';

const ShapeBuffet = () => {
  const initalState = {
    name: '',
    length: '',
    radius: '',
  };

  const [shape, setShape] = useState(() => {
    const localData = localStorage.shape;
    return localData ? JSON.parse(localData) : initalState;
  });

  useEffect(() => {
    localStorage.shape = JSON.stringify(shape);
  }, [shape]);

  const createShape = (shapeDetails: {
    name: string;
    length: string;
    radius: string;
  }) => {
    const { name, length, radius } = shapeDetails;
    setShape({ name, length, radius });
  };

  const chosenShapeStyle = shapeStyle(shape);

  return (
    <div className="ShapeBuffet">
      <ShapeForm createShape={createShape} />
      <div className="shape-container">
        <div
          className={`shape ${shape.name}`}
          style={{ ...chosenShapeStyle, backgroundColor: '' }}
        ></div>
      </div>
    </div>
  );
};

export default ShapeBuffet;
