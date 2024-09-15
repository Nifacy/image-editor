import React, { useState } from 'react';
import './App.css';
import ImageEditor from './ImageEditor';
import ChoosePicture from './ChoosePicture';


const App = () => {
  const [ image, setImage ] = useState(null);

  return (
    <>{image ?
      <div className="app_container">
        <div className="test_block">
          <ImageEditor sourceImage={image} />
        </div>
      </div>
      :
      <ChoosePicture onSubmit={setImage}/>
    }</>
  );
}

export default App;
