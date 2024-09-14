import React, { useState } from 'react';
import { SourceImage, resizeImage } from './Images';

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

  return (
    <div>
      <button onClick={() => handleResize(200, 360)}>Resize</button>
      {image}
    </div>
  );
};

export default ImageEditor;
