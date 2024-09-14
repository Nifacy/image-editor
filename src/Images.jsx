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

export const addColorContrast = (r, g, b, image) => {
  let sourceWidth = image.props.width
  let sourceHeight = image.props.height

  return (
    <svg width={sourceWidth} height={sourceHeight} viewBox={`0 0 ${sourceWidth} ${sourceHeight}`}>
      <filter id="contrast">
        <feComponentTransfer>
          <feFuncR type="linear" slope={`${r}`} />
          <feFuncG type="linear" slope={`${g}`} />
          <feFuncB type="linear" slope={`${b}`} />
        </feComponentTransfer>
      </filter>

      <svg width={sourceWidth} height={sourceHeight} viewBox={`0 0 ${sourceWidth} ${sourceHeight}`} filter="url(#contrast)">
        {image}
      </svg>
    </svg>
  );
}
