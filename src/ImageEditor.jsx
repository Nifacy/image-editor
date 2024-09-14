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
    const defaults = {
      width: image.props.width,
      height: image.props.height,
    };

    setEditForm(
      <EditForm
        defaultState={defaults}
        onSubmit={
          (data) => {
            const [width, height] = [Number(data.width), Number(data.height)];
            setImage({ ...resizeImage(width, height, image) });
            setEditForm(null);
          }
        }
      >
        <IntField name="Width" id="width" defaultValue={defaults.width} minValue={0} />
        <IntField name="Height" id="height" defaultValue={defaults.height} minValue={0} />
      </EditForm>
    );
  };

  const handleCrop = () => {
    const defaults = {
      x: 0,
      y: 0,
      width: image.props.width,
      height: image.props.height,
    }

    setEditForm(
      <EditForm
        defaultState={defaults}
        onSubmit={
          (data) => {
            const [x, y, width, height] = [Number(data.x), Number(data.y), Number(data.width), Number(data.height)];
            setImage({ ...cropImage(x, y, width, height, image) });
            setEditForm(null);
          }
        }
      >
        <IntField name="X" id="x" defaultValue={defaults.x} minValue={0} />
        <IntField name="Y" id="y" defaultValue={defaults.y} minValue={0} />
        <IntField name="Width" id="width" defaultValue={defaults.width} minValue={0} />
        <IntField name="Height" id="height" defaultValue={defaults.height} minValue={0} />
      </EditForm>
    );
  };

  const handleContrast = () => {
    const defaults = {
      contrast: 1.0,
    };

    setEditForm(
      <EditForm
        defaultState={defaults}
        onSubmit={
          (data) => {
            const contrast = Number(data.contrast);
            setImage({ ...addColorContrast(contrast, image) });
            setEditForm(null);
          }
        }
      >
        <RangeField id="contrast" name="Contrast" min={0.0} max={2.0} defaultValue={defaults.contrast} />
      </EditForm>
    );
  }

  const handleBrightness = () => {
    setEditForm(
      <EditForm
        defaultState={{ brightness: 1.0 }}
        onSubmit={
          (data) => {
            const brightness = Number(data.brightness);
            setImage({ ...addBrightness(brightness, image) });
            setEditForm(null);
          }
        }
      >
        <RangeField id="brightness" name="Brightness" min={0.0} max={2.0} defaultValue={1.0} />
      </EditForm>
    );
  }

  const handleSaturate = () => {
    const defaults = {
      saturate: 1.0,
    };

    setEditForm(
      <EditForm
        defaultState={defaults}
        onSubmit={
          (data) => {
            const saturate = Number(data.saturate);
            setImage({ ...addSaturate(saturate, image) });
            setEditForm(null);
          }
        }
      >
        <RangeField id="saturate" name="Saturate" min={0.0} max={2.0} defaultValue={defaults.saturate} />
      </EditForm>
    );
  }

  const handleAddText = () => {
    const defaults = {
      x: 0,
      y: 0,
      size: 1,
      color: "black",
      text: "",
    };

    setEditForm(
      <EditForm
        defaultState={defaults}
        onSubmit={
          (data) => {
            const [x, y, size] = [Number(data.x), Number(data.y), Number(data.size)];
            const { color, text } = data;
            setImage({ ...addText({ x: x, y: y }, { fontSize: size, textColor: color }, text, image) });
            setEditForm(null);
          }
        }
      >
        <IntField name="X" id="x" defaultValue={defaults.x} minValue={0} />
        <IntField name="Y" id="y" defaultValue={defaults.y} minValue={0} />
        <IntField name="Size" id="size" defaultValue={defaults.size} minValue={1} />
        <TextField name="Color" id="color" defaultValue={defaults.color} />
        <TextField name="Text" id="text" defaultValue={defaults.text} />
      </EditForm>
    );
  }

  const handleAddCircle = () => {
    const defaults = {
      x: 0,
      y: 0,
      radius: 1,
      color: "red",
    };

    setEditForm(
      <EditForm
        defaultState={defaults}
        onSubmit={
          (data) => {
            const [x, y, radius] = [Number(data.x), Number(data.y), Number(data.radius)];
            setImage({ ...addCircle({ x: x, y: y }, { radius: radius, color: data.color }, image) });
            setEditForm(null);
          }
        }
      >
        <IntField name="X" id="x" defaultValue={defaults.x} minValue={0} />
        <IntField name="Y" id="y" defaultValue={defaults.y} minValue={0} />
        <IntField name="Radius" id="radius" defaultValue={defaults.radius} minValue={1} />
        <TextField name="Color" id="color" defaultValue={defaults.color} />
      </EditForm>
    );
  }

  const handleAddRectangle = () => {
    const defaults = {
      x: 10,
      y: 10,
      width: 50,
      height: 50,
      color: "red",
    };

    setEditForm(
      <EditForm
        defaultState={defaults}
        onSubmit={
          (data) => {
            const [x, y, w, h] = [Number(data.x), Number(data.y), Number(data.width), Number(data.height)];
            setImage({ ...addRectangle({ x: x, y: y }, { width: w, height: h, color: data.color }, image) });
            setEditForm(null);
          }
        }
      >
        <IntField name="X" id="x" defaultValue={defaults.x} minValue={0} />
        <IntField name="Y" id="y" defaultValue={defaults.y} minValue={0} />
        <IntField name="Width" id="width" defaultValue={defaults.width} minValue={0} />
        <IntField name="Height" id="height" defaultValue={defaults.height} minValue={0} />
        <TextField name="Color" id="color" defaultValue={defaults.color} />
      </EditForm>
    );
  }

  return (
    <div>
      <div>
        <button onClick={handleResize}>Resize</button>
        <button onClick={handleCrop}>Crop</button>
        <button onClick={handleContrast}>Contrast</button>
        <button onClick={handleBrightness}>Brightness</button>
        <button onClick={handleSaturate}>Saturate</button>
        <button onClick={handleAddText}>Text</button>
        <button onClick={handleAddCircle}>Circle</button>
        <button onClick={handleAddRectangle}>Rectangle</button>
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
