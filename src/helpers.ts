export const shapeStyle = (shape: {
  name: string;
  length: string;
  radius: string;
  color: string;
}) => {
  const diameter = `${Number(shape.radius) * 2}px`;
  const color = shape.color ? shape.color : '#ff6363';

  const shapeStyles: {
    [index: string]: {
      width: string;
      height: string;
      borderRadius?: string;
      borderLeft?: string;
      borderRight?: string;
      borderBottom?: string;
      borderTop?: string;
    };
  } = {
    circle: {
      width: diameter,
      height: diameter,
      borderRadius: '50%',
    },
    oval: {
      width: diameter,
      height: `${shape.radius}px`,
      borderRadius: '50%',
    },
    square: {
      width: `${shape.length}px`,
      height: `${shape.length}px`,
    },
    rectangle: {
      width: `${shape.length}px`,
      height: `${Number(shape.length) / 2}px`,
    },
    trapezoid: {
      borderLeft: `${Number(shape.length) / 4}px solid transparent`,
      borderRight: `${Number(shape.length) / 4}px solid transparent`,
      borderBottom: `${Number(shape.length) / 2}px solid ${color}`,
      width: `${shape.length}px`,
      height: '0',
    },
    parallelogram: {
      width: `${shape.length}px`,
      height: `${Number(shape.length) / 2}px`,
    },
    'triangle-up': {
      width: '0',
      height: '0',
      borderBottom: `${Number(shape.length)}px solid ${color}`,
      borderLeft: `${Number(shape.length) / 2}px solid transparent`,
      borderRight: `${Number(shape.length) / 2}px solid transparent`,
    },
    'triangle-down': {
      width: '0',
      height: '0',
      borderTop: `${Number(shape.length)}px solid ${color}`,
      borderLeft: `${Number(shape.length) / 2}px solid transparent`,
      borderRight: `${Number(shape.length) / 2}px solid transparent`,
    },
    'triangle-left': {
      width: '0',
      height: '0',
      borderRight: `${Number(shape.length)}px solid ${color}`,
      borderTop: `${Number(shape.length) / 2}px solid transparent`,
      borderBottom: `${Number(shape.length) / 2}px solid transparent`,
    },
    'triangle-right': {
      width: '0',
      height: '0',
      borderLeft: `${Number(shape.length)}px solid ${color}`,
      borderTop: `${Number(shape.length) / 2}px solid transparent`,
      borderBottom: `${Number(shape.length) / 2}px solid transparent`,
    },
    egg: {
      width: diameter,
      height: `${Number(shape.radius) * 2 + 50}px`,
    },
  };

  return shapeStyles[shape.name];
};
