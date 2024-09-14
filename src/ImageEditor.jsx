import React, { useState } from 'react';
import { SourceImage, resizeImage, cropImage } from './Images';

const ImageEditor = () => {
  const [image, setImage] = useState(
    <SourceImage width={540} height={360}>
        <image href="https://t3.ftcdn.net/jpg/02/74/06/48/360_F_274064877_Tuq84kGOn5nhyIJeUFTUSvXaSeedAOTT.jpg" />
    </SourceImage>
  );

  const handleResize = (width, height) => {
    let updatedImage = resizeImage(width, height, image)
    setImage({ ...updatedImage });
  };

  const handleCrop = (x, y, w, h) => {
    let updatedImage = cropImage(x, y, w, h, image)
    setImage({ ...updatedImage })
  }

  return (
    <div>
      <div>
        <button onClick={() => handleResize(200, 360)}>Resize</button>
        <button onClick={() => handleCrop(25, 25, 200, 200)}>Crop</button>
      </div>
      <div>
        {image}
        <br />
        <p>Width: {image.props.width}, Height: {image.props.height}</p>
      </div>
    </div>
  );
};

export default ImageEditor;
