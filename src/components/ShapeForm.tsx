import React, { useState } from 'react';

interface IProps {
  createShape: (shapeDetails: {
    name: string;
    length: string;
    radius: string;
    color: string;
  }) => void;
}

const ShapeForm = ({ createShape }: IProps) => {
  const [shapeName, setShapeName] = useState('select shape');
  const [length, setLength] = useState('');
  const [radius, setRadius] = useState('');
  const [color, setColor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createShape({ name: shapeName, length, radius, color });
    setShapeName('select shape');
    setLength('');
    setRadius('');
    setColor('');
  };

  const roundShapes = ['circle', 'oval', 'egg'];
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
      <select
        value={shapeName}
        onChange={e => setShapeName(e.target.value)}
        data-testid="shape-select"
      >
        <option value="select shape" disabled>
          Select Shape
        </option>
        <option value="circle">Circle</option>
        <option value="oval">Oval</option>
        <option value="egg">Egg</option>
        <option value="square">Square</option>
        <option value="rectangle">Rectangle</option>
        <option value="trapezoid">Trapezoid</option>
        <option value="parallelogram">Parallelogram</option>
        <option value="triangle-up">Triangle Up</option>
        <option value="triangle-down">Triangle Down</option>
        <option value="triangle-left">Triangle Left</option>
        <option value="triangle-right">Triangle Right</option>
      </select>

      <select
        value={color}
        onChange={e => setColor(e.target.value)}
        data-testid="color-select"
      >
        <option value="" disabled>
          Default Color
        </option>
        <option value="#e94560">Red</option>
        <option value="#ffbd69">Yellow</option>
        <option value="#29c7ac">Green</option>
        <option value="#bc6ff1">Purple</option>
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
