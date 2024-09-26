import React from 'react';

export const SourceImage = ({ width, height, children }) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
    {children}
  </svg>
);

export const resizeImage = (width, height, image) => {
  let sourceWidth = image.props.width
  let sourceHeight = image.props.height

  return (
    <SourceImage width={width} height={height}>
      <svg width={width} height={height} viewBox={`0 0 ${sourceWidth} ${sourceHeight}`} preserveAspectRatio="none">
        {image}
      </svg>
    </SourceImage>
  );
}

export const cropImage = (x, y, width, height, image) => {
  return (
    <SourceImage width={width} height={height}>
      <svg width={width} height={height} viewBox={`${x} ${y} ${width} ${width}`}>
        {image}
      </svg>
    </SourceImage>
  );
}

export const addColorContrast = (contrastCoef, image) => {
  let sourceWidth = image.props.width
  let sourceHeight = image.props.height

  return (
    <svg width={sourceWidth} height={sourceHeight} viewBox={`0 0 ${sourceWidth} ${sourceHeight}`}>
      <filter id="contrast">
        <feComponentTransfer>
          <feFuncR type="linear" slope={`${contrastCoef}`} intercept={0.5 * (1 - contrastCoef)} />
          <feFuncG type="linear" slope={`${contrastCoef}`} intercept={0.5 * (1 - contrastCoef)} />
          <feFuncB type="linear" slope={`${contrastCoef}`} intercept={0.5 * (1 - contrastCoef)} />
        </feComponentTransfer>
      </filter>

      <svg width={sourceWidth} height={sourceHeight} viewBox={`0 0 ${sourceWidth} ${sourceHeight}`} filter="url(#contrast)">
        {image}
      </svg>
    </svg>
  );
}

export const addBrightness = (brightnessCoef, image) => {
  let sourceWidth = image.props.width
  let sourceHeight = image.props.height

  return (
    <svg width={sourceWidth} height={sourceHeight} viewBox={`0 0 ${sourceWidth} ${sourceHeight}`}>
      <filter id="brightness">
        <feComponentTransfer>
          <feFuncR type="linear" slope={`${brightnessCoef}`} />
          <feFuncG type="linear" slope={`${brightnessCoef}`} />
          <feFuncB type="linear" slope={`${brightnessCoef}`} />
        </feComponentTransfer>
      </filter>

      <svg width={sourceWidth} height={sourceHeight} viewBox={`0 0 ${sourceWidth} ${sourceHeight}`} filter="url(#brightness)">
        {image}
      </svg>
    </svg>
  );
}

export const addSaturate = (saturateCoef, image) => {
  let sourceWidth = image.props.width
  let sourceHeight = image.props.height

  return (
    <svg width={sourceWidth} height={sourceHeight} viewBox={`0 0 ${sourceWidth} ${sourceHeight}`}>
      <filter id="saturate">
        <feColorMatrix type="saturate" values={`${saturateCoef}`} />
      </filter>

      <svg width={sourceWidth} height={sourceHeight} viewBox={`0 0 ${sourceWidth} ${sourceHeight}`} filter="url(#saturate)">
        {image}
      </svg>
    </svg>
  );
}

export const addText = (position, fontSettings, text, image) => {
  let sourceWidth = image.props.width
  let sourceHeight = image.props.height

  const { fontSize, textColor } = fontSettings;
  const { x, y } = position;

  return (
    <svg width={sourceWidth} height={sourceHeight} viewBox={`0 0 ${sourceWidth} ${sourceHeight}`}>
      {image}
      <text x={x} y={y} fontSize={`${fontSize}em`} fill={textColor} dominantBaseline="hanging">
        {text}
      </text>
    </svg>
  );
};

export const addCircle = (position, settings, image) => {
  let sourceWidth = image.props.width
  let sourceHeight = image.props.height

  const { x, y } = position;
  const { color, radius } = settings;

  return (
    <svg width={sourceWidth} height={sourceHeight} viewBox={`0 0 ${sourceWidth} ${sourceHeight}`}>
      {image}
      <circle cx={x} cy={y} r={radius} fill={color} />
    </svg>
  );
};

export const addRectangle = (position, settings, image) => {
  let sourceWidth = image.props.width
  let sourceHeight = image.props.height

  const { x, y } = position;
  const { width, height, color } = settings;

  return (
    <svg width={sourceWidth} height={sourceHeight} viewBox={`0 0 ${sourceWidth} ${sourceHeight}`}>
      {image}
      <rect x={x} y={y} width={width} height={height} fill={color} />
    </svg>
  );
};

const _toRadians = (angle) => (angle * Math.PI) / 180.0;

const _rotatePoint = (point, angle) => {
  const rad = _toRadians(angle);
  const { x, y } = point;

  const rotatedX = x * Math.cos(rad) - y * Math.sin(rad);
  const rotatedY = x * Math.sin(rad) + y * Math.cos(rad);

  return { x: rotatedX, y: rotatedY };
};

const _getRotatedImageSize = (w, h, angle) => {
  const points = [
    { x: -0.5 * w, y: 0.5 * h },    // Top-left
    { x: 0.5 * w, y: 0.5 * h },     // Top-right
    { x: -0.5 * w, y: -0.5 * h },   // Bottom-left
    { x: 0.5 * w, y: -0.5 * h }     // Bottom-right
  ];

  const rotatedPoints = points.map(point => _rotatePoint(point, angle));

  const maxX = Math.max(...rotatedPoints.map(p => p.x));
  const maxY = Math.max(...rotatedPoints.map(p => p.y));

  return {
    width: Math.abs(maxX),
    height: Math.abs(maxY)
  };
};

export const rotateImage = (angle, image) => {
  let sourceWidth = image.props.width;
  let sourceHeight = image.props.height;

  let sourceCenterX = 0.5 * sourceWidth;
  let sourceCenterY = 0.5 * sourceHeight;

  const normalizedAngle = angle % 360;

  const { width: newWidth, height: newHeight } = _getRotatedImageSize(sourceWidth, sourceHeight, angle);

  return (
    <svg width={2 * newWidth} height={2 * newHeight} viewBox={`${sourceCenterX - newWidth} ${sourceCenterY - newHeight} ${2 * newWidth} ${2 * newHeight}`}>
      <g transform={`rotate(${normalizedAngle} ${sourceCenterX} ${sourceCenterY})`}>
        {image}
      </g>
    </svg>
  );
};
