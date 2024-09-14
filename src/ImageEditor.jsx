import React, { useState } from 'react';
import { SourceImage, resizeImage, cropImage, addColorContrast, addBrightness, addSaturate, addText, addCircle, addRectangle } from './Images';
import { EditForm, IntField, RangeField, TextField } from './EditForm'

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
          (data) => {
            const [width, height] = [Number(data.width), Number(data.height)];
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
          (data) => {
            const [x, y, width, height] = [Number(data.x), Number(data.y), Number(data.width), Number(data.height)];
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
          (data) => {
            const contrast = Number(data.contrast);
            setImage({ ...addColorContrast(contrast, image)});
            setEditForm(null);
          }
        }
      >
        <RangeField id="contrast" name="Contrast" min={0.0} max={2.0} defaultValue={1.0} />
      </EditForm>
    );
  }

  const handleBrightness = () => {
    setEditForm(
      <EditForm
        defaultState={{brightness: 1.0}}
        onSubmit={
          (data) => {
            const brightness = Number(data.brightness);
            setImage({ ...addBrightness(brightness, image)});
            setEditForm(null);
          }
        }
      >
        <RangeField id="brightness" name="Brightness" min={0.0} max={2.0} defaultValue={1.0} />
      </EditForm>
    );
  }

  const handleSaturate = () => {
    setEditForm(
      <EditForm
        defaultState={{saturate: 1.0}}
        onSubmit={
          (data) => {
            const saturate = Number(data.saturate);
            setImage({ ...addSaturate(saturate, image)});
            setEditForm(null);
          }
        }
      >
        <RangeField id="saturate" name="Saturate" min={0.0} max={2.0} defaultValue={1.0} />
      </EditForm>
    );
  }

  const handleAddText = () => {
    setEditForm(
      <EditForm
        defaultState={{
          x: 0,
          y: 0,
          size: 1,
          color: "black",
          text: "",
        }}
        onSubmit={
          (data) => {
            const [x, y, size] = [Number(data.x), Number(data.y), Number(data.size)];
            const {color, text} = data;
            setImage({ ...addText({x: x, y: y}, {fontSize: size, textColor: color}, text, image)});
            setEditForm(null);
          }
        }
      >
        <IntField name="X" id="x" defaultValue={0} minValue={0} />
        <IntField name="Y" id="y" defaultValue={0} minValue={0} />
        <IntField name="Size" id="size" defaultValue={1} minValue={1} />
        <TextField name="Color" id="color" defaultValue="black" />
        <TextField name="Text" id="text" />
      </EditForm>
    );
  }

  const handleAddCircle = () => {
    setEditForm(
      <EditForm
        defaultState={{
          x: 0,
          y: 0,
          radius: 1,
          color: "red",
        }}
        onSubmit={
          (data) => {
            const [x, y, radius] = [Number(data.x), Number(data.y), Number(data.radius)];
            setImage({ ...addCircle({x: x, y: y}, {radius: radius, color: data.color}, image)});
            setEditForm(null);
          }
        }
      >
        <IntField name="X" id="x" defaultValue={0} minValue={0} />
        <IntField name="Y" id="y" defaultValue={0} minValue={0} />
        <IntField name="Radius" id="radius" defaultValue={1} minValue={1} />
        <TextField name="Color" id="color" defaultValue="red" />
      </EditForm>
    );
  }

  const handleAddRectangle = (position, settings) => {
    let updatedImage = addRectangle(position, settings, image)
    setImage({ ...updatedImage })
  }

  return (
    <div>
      <div>
        <button onClick={() => handleResize()}>Resize</button>
        <button onClick={() => handleCrop()}>Crop</button>
        <button onClick={() => handleContrast()}>Contrast</button>
        <button onClick={() => handleBrightness()}>Brightness</button>
        <button onClick={() => handleSaturate()}>Saturate</button>
        <button onClick={() => handleAddText()}>Text</button>
        <button onClick={() => handleAddCircle()}>Circle</button>
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
