import React, { useState } from 'react';
import { SourceImage, resizeImage, cropImage, addColorContrast, addBrightness, addSaturate, addText, addCircle, addRectangle, mirrorImage } from './Images';
import { EditForm, IntField, RangeField, TextField, ColorField, DropdownField } from './EditForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faRightLeft, faSquare, faT, faCropSimple, faExpand, faCircleHalfStroke, faSun } from '@fortawesome/free-solid-svg-icons'
import './App.css'

const CommandItem = ({ label, onClick, icon }) => {
  return (
    <div key={label} className="menu_item btn btn-light" onClick={onClick}>
      <FontAwesomeIcon className="icon" icon={icon} />
      <div className="label">{label}</div>
    </div>
  );
}

const CommandMenu = ({ children }) => {
  return (
    <div className="menu border">
      {children}
    </div>
  );
}

const Preview = ({ image }) => {
  return (
    <div className="preview border">
      <svg className="container" width="100%" height="100%" viewBox={`0 0 ${image.props.width} ${image.props.height}`}>
        {image}
      </svg>
  </div>
  );
}

const CommandSettings = ({ editForm }) => {
  return (
    <div className="settings border">
      {editForm && editForm}
    </div>
  );
}

const ImageEditor = ({ sourceImage }) => {
  const [image, setImage] = useState(
    <SourceImage width={sourceImage.width} height={sourceImage.height}>
      <image href={sourceImage.src} />
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
        <ColorField name="Color" id="color" defaultValue="#cc3639" />
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
        <ColorField name="Color" id="color" defaultValue="#cc3639" />
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
        <ColorField name="Color" id="color" defaultValue="#cc3639" />
      </EditForm>
    );
  }

  const handleMirrorImage = () => {
    const defaults = {
      direction: "horizontal",
    };

    const options = [
      { name: "Horizontal", value: "horizontal" },
      { name: "Vertical", value: "vertical" },
    ]

    setEditForm(
      <EditForm
        defaultState={defaults}
        onSubmit={
          (data) => {
            setImage({ ...mirrorImage(data.direction, image) });
            setEditForm(null);
          }
        }
      >
        <DropdownField name="Direction" id="direction" options={options} defaultValue={defaults.direction} />
      </EditForm>
    );
  }

  return (
    <div className="image_editor">
      <CommandMenu>
        <CommandItem label="Resize" onClick={handleResize} icon={faExpand} />
        <CommandItem label="Crop" onClick={handleCrop} icon={faCropSimple} />
        <CommandItem label="Contrast" onClick={handleContrast} icon={faCircleHalfStroke} />
        <CommandItem label="Brightness" onClick={handleBrightness} icon={faSun} />
        <CommandItem label="Saturate" onClick={handleSaturate} icon={faCircleHalfStroke} />
        <CommandItem label="Text" onClick={handleAddText} icon={faT} />
        <CommandItem label="Circle" onClick={handleAddCircle} icon={faCircle} />
        <CommandItem label="Rectangle" onClick={handleAddRectangle} icon={faSquare} />
        <CommandItem label="Flip" onClick={handleMirrorImage} icon={faRightLeft} />
      </CommandMenu>
      <CommandSettings editForm={editForm} />
      <Preview image={image} />
    </div>
  );
};

export default ImageEditor;
