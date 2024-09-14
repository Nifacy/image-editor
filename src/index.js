import React from 'react';
import { createRoot } from 'react-dom/client';
import { SourceImage, resizeImage } from './Images';

const container = document.getElementById('app');
const root = createRoot(container);
const sourceImage = (
  <SourceImage width={540} height={360}>
    <image href="https://t3.ftcdn.net/jpg/02/74/06/48/360_F_274064877_Tuq84kGOn5nhyIJeUFTUSvXaSeedAOTT.jpg" />
  </SourceImage>
);

root.render(resizeImage(320, 360, sourceImage));
