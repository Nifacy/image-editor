import React, { useState } from 'react';
import { SourceImage, resizeImage, cropImage, addColorContrast,addLightTemperature, addLine, addBrightness, addSaturate, addText, addCircle, addRectangle, addFilter, addExposure, rotateImage, mirrorImage } from './Images';
import { EditForm, IntField, RangeField, TextField, ColorField, DropdownField } from './EditForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHurricane, faCircle, faRightLeft, faRotateRight, faRotateLeft, faSquare, faT, faCropSimple, faExpand, faCircleHalfStroke, faSun, faMagicWandSparkles, faThermometer } from '@fortawesome/free-solid-svg-icons'
import './App.css'

const CommandItem = ({ label, onClick, icon }) => {
  return (
    <div key={label} className="menu_item btn btn-light" onClick={onClick}>
      <FontAwesomeIcon className="icon" icon={icon} />
      <div className="label">{label}</div>
    </div>
  );
}

const RotateButton = ({ degrees, icon, onClick }) => {
  return (
    <button type="button" className="btn btn-light" onClick={() => onClick(degrees)}>
      <div class="content">
        <FontAwesomeIcon icon={icon} />
        <div class="degrees">{degrees}&deg;</div>
      </div>
    </button>
  );
}

const RotateButtonContainer = ({ onClick }) => {
  return (
    <div class="rotate_panel">
      <RotateButton onClick={onClick} icon={faRotateRight} degrees={90} />
      <RotateButton onClick={onClick} icon={faRotateLeft} degrees={-90} />
      <RotateButton onClick={onClick} icon={faRotateRight} degrees={45} />
      <RotateButton onClick={onClick} icon={faRotateLeft} degrees={-45} />
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

  const handleAddExposure = () => {
    const defaults = { exposure: 0.0 };

    setEditForm(
      <EditForm
        defaultState={defaults}
        onSubmit={
          (data) => {
            setImage({ ...addExposure(Number(data.exposure), image) });
            setEditForm(null);
          }
        }
      >
        <RangeField name="Exposure" id="exposure" min={-1.0} max={1.0} />
      </EditForm>
    );
    addExposure
  }

  const handleRotateImage = () => {
    const defaults = {
      angle: 0.0
    };

    const _rotateImage = (angle) => {
      setImage({ ...rotateImage(angle, image) });
      setEditForm(null);
    };

    setEditForm(
      <EditForm
        defaultState={defaults}
        onSubmit={(data) => _rotateImage(Number(data.angle))}
      >
        <RangeField name="Angle" id="angle" min={0.0} max={360.0} defaultValue={defaults.angle} />
        <RotateButtonContainer onClick={_rotateImage} />
      </EditForm>
    )
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

  const handleAddFilter = () => {
    const defaults = {
      filter: "black-white"
    };

    const options = [
      { name: "Black & White", value: "black-white" },
      { name: "Sepia", value: "sepia" },
      { name: "Vintage", value: "vintage" },
    ];

    setEditForm(
      <EditForm
        defaultState={defaults}
        onSubmit={
          (data) => {
            setImage({ ...addFilter(data.filter, image) });
            setEditForm(null);
          }
        }
      >
        <DropdownField name="Filter" id="filter" options={options} defaultValue={defaults.filter} />
      </EditForm>
    );
  }

  const handleAddLightTemperature = () => {
    const defaults = {
      temperature: 0.0
    };
  
    setEditForm(
      <EditForm
        defaultState={defaults}
        onSubmit={
          (data) => {
            setImage({ ...addLightTemperature(data.temperature, image) });
            setEditForm(null);
          }
        }
      >
        <RangeField name="Temperature" id="temperature" defaultValue={defaults.temperature} min={-1.0} max={1.0} />
      </EditForm>
    );
  }

  const handleAddLine = () => {
    const defaults = {
      startX: 0,
      startY: 0,
      endX: 50,
      endY: 50,
      color: "#cc3639",
      weight: 2,
    };

    setEditForm(
      <EditForm
        defaultState={defaults}
        onSubmit={
          (data) => {
            const [ startX, startY, endX, endY, weight ] = [
              Number(data.startX),
              Number(data.startY),
              Number(data.endX),
              Number(data.endY),
              Number(data.weight)
            ];

            const position = {
              start: { x: startX, y: startY },
              end: { x: endX, y: endY }
            };

            const settings = {
              color: data.color,
              weight: weight
            };

            setImage({ ...addLine(position, settings, image) });
            setEditForm(null);
          }
        }
      >
        <IntField name="Start (x)" id="startX" defaultValue={defaults.startX} minValue={0} />
        <IntField name="Start (y)" id="startY" defaultValue={defaults.startY} minValue={0} />

        <IntField name="End (x)" id="endX" defaultValue={defaults.endX} minValue={0} />
        <IntField name="End (y)" id="endY" defaultValue={defaults.endY} minValue={0} />

        <IntField name="Weight" id="weight" defaultValue={defaults.weight} minValue={1} />
        <ColorField name="Color" id="color" defaultValue={defaults.color} />
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
        <CommandItem label="Rotate" onClick={handleRotateImage} icon={faRotateRight} />
        <CommandItem label="Text" onClick={handleAddText} icon={faT} />
        <CommandItem label="Circle" onClick={handleAddCircle} icon={faCircle} />
        <CommandItem label="Rectangle" onClick={handleAddRectangle} icon={faSquare} />
        <CommandItem label="Filter" onClick={handleAddFilter} icon={faMagicWandSparkles} />
        <CommandItem label="Exposure" onClick={handleAddExposure} icon={faHurricane} />
        <CommandItem label="Flip" onClick={handleMirrorImage} icon={faRightLeft} />
        <CommandItem label="Line" onClick={handleAddLine} icon={faSquare} />
      <CommandItem label="Temperature" onClick={handleAddLightTemperature} icon={faThermometer} />
      </CommandMenu>
      <CommandSettings editForm={editForm} />
      <Preview image={image} />
    </div>
  );
};

export default ImageEditor;
