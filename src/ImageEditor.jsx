import React, { useState } from 'react';
import { SourceImage, resizeImage, cropImage, addColorContrast, addBrightness, addSaturate, addText, addCircle, addRectangle } from './Images';
import { EditForm, IntField, RangeField } from './EditForm'

const ImageEditor = () => {
  const [image, setImage] = useState(
    <SourceImage width={540} height={360}>
        <image href="https://t3.ftcdn.net/jpg/02/74/06/48/360_F_274064877_Tuq84kGOn5nhyIJeUFTUSvXaSeedAOTT.jpg" />
    </SourceImage>
  );

  const [editForm, setEditForm] = useState(null);

  const handleResize = () => {
    setEditForm(
      <EditForm
        defaultState={{width: image.props.width, height: image.props.height}}
        onSubmit={
          ({width, height}) => {
            setImage({ ...resizeImage(width, height, image)});
            setEditForm(null);
          }
        }
      >
        <IntField name="Width" id="width" defaultValue={image.props.width} minValue={0} />
        <IntField name="Height" id="height" defaultValue={image.props.height} minValue={0} />
      </EditForm>
    );
  };

  const handleCrop = () => {
    let width = image.props.width;
    let height = image.props.height;

    setEditForm(
      <EditForm
        defaultState={{x: 0, y: 0, width: width, height: height}}
        onSubmit={
          ({x, y, width, height}) => {
            setImage({ ...cropImage(x, y, width, height, image)});
            setEditForm(null);
          }
        }
      >
        <IntField name="X" id="x" defaultValue={0} minValue={0} />
        <IntField name="Y" id="y" defaultValue={0} minValue={0} />
        <IntField name="Width" id="width" defaultValue={width} minValue={0} />
        <IntField name="Height" id="height" defaultValue={height} minValue={0} />
      </EditForm>
    );
  };

  const handleContrast = () => {
    setEditForm(
      <EditForm
        defaultState={{contrast: 1.0}}
        onSubmit={
          ({contrast}) => {
            setImage({ ...addColorContrast(contrast, image)});
            setEditForm(null);
          }
        }
      >
        <RangeField id="contrast" name="Contrast" min={0.0} max={2.0} defaultValue={1.0} />
      </EditForm>
    );
  }

  const handleBrightness = (brightnessCoef) => {
    let updatedImage = addBrightness(brightnessCoef, image)
    setImage({ ...updatedImage })
  }

  const handleSaturate = (saturateCoef) => {
    let updatedImage = addSaturate(saturateCoef, image)
    setImage({ ...updatedImage })
  }

  const handleAddText = (position, fontSettings, text) => {
    let updatedImage = addText(position, fontSettings, text, image)
    setImage({ ...updatedImage })
  }

  const handleAddCircle = (position, settings) => {
    let updatedImage = addCircle(position, settings, image)
    setImage({ ...updatedImage })
  }

  const handleAddRectangle = (position, settings) => {
    let updatedImage = addRectangle(position, settings, image)
    setImage({ ...updatedImage })
  }

  return (
    <div>
      <div>
        <button onClick={() => handleResize()}>Resize</button>
        <button onClick={() => handleCrop(25, 25, 200, 200)}>Crop</button>
        <button onClick={() => handleContrast()}>Contrast</button>
        <button onClick={() => handleBrightness(1.5)}>Brightness</button>
        <button onClick={() => handleSaturate(2.0)}>Saturate</button>
        <button onClick={() => handleAddText({ x: 10, y: 10 }, { fontSize: 2, textColor: "red" }, "Hello world")}>Text</button>
        <button onClick={() => handleAddCircle({ x: 100, y: 100 }, { radius: 50, color: "red" })}>Circle</button>
        <button onClick={() => handleAddRectangle({ x: 100, y: 100}, { width: 200, height: 100, color: 'red' })}>Rectangle</button>
      </div>
      <div>
        {editForm && editForm}
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
