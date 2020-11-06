import React, { useState } from 'react';

interface Props {
  createShape: (shapeDetails: {
    name: string;
    length: string;
    radius: string;
  }) => void;
}

const ShapeForm = ({ createShape }: Props) => {
  const [shapeName, setShapeName] = useState('select shape');
  const [length, setLength] = useState('');
  const [radius, setRadius] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createShape({ name: shapeName, length, radius });
    setShapeName('select shape');
    setLength('');
    setRadius('');
  };

  const roundShapes = ['circle', 'oval'];
  const nonRoundShapes = [
    'square',
    'rectangle',
    'trapezoid',
    'triangle',
    'parallelogram',
    'triangle-up',
    'triangle-down',
    'triangle-left',
    'triangle-right',
  ];

  return (
    <form onSubmit={handleSubmit}>
      <select value={shapeName} onChange={e => setShapeName(e.target.value)}>
        <option value="select shape" disabled>
          Select Shape
        </option>
        <option value="circle">Circle</option>
        <option value="square">Square</option>
        <option value="oval">Oval</option>
        <option value="rectangle">Rectangle</option>
        <option value="trapezoid">Trapezoid</option>
        <option value="parallelogram">Parallelogram</option>
        <option value="triangle-up">Triangle Up</option>
        <option value="triangle-down">Triangle Down</option>
        <option value="triangle-left">Triangle Left</option>
        <option value="triangle-right">Triangle Right</option>
      </select>

      <input
        className="input-field"
        type="number"
        placeholder="Length"
        value={length}
        onChange={e => setLength(e.target.value)}
        disabled={!nonRoundShapes.includes(shapeName)}
        required
      />
      <input
        className="input-field"
        type="number"
        placeholder="Radius"
        value={radius}
        onChange={e => setRadius(e.target.value)}
        disabled={!roundShapes.includes(shapeName)}
        required
      />
      <input type="submit" value="Create Shape" disabled={!length && !radius} />
    </form>
  );
};

export default ShapeForm;
