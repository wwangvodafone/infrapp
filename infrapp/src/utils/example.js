import React, { Component }  from 'react';
import FullScreenViewer from './FullScreen';
import Slides from '../Slide';
import Main from '../components/Main';
import Test from '../test';
import emitter from '../events';


function viewImage1(e1) {
 //const viewer = new FullScreenViewer();
  console.log("example" + e1 );
  //viewer.show(e1, e2);
  const greeting = 'Hello Function Component!';
  //window.location.assign('Finger.js');
  //window.open('Slide.js', '_blank');
  window.open(e1);
}

function statistic(e1) {
  emitter.emit('activeTab', '4');
  emitter.emit("imagelocation", e1);
  //window.open("graph.html");
}

function viewImage() {
  const viewer = new FullScreenViewer();
Array.from(document.querySelectorAll('.gallery-items')).forEach((elem) => {
  elem.addEventListener('click', function (ev) {
    const imgSrc = elem.src;
    //const highResolutionImage = elem.getAttribute('data-high-res-src');
    const highResolutionImage = elem.highResolutionImage;
    console.log("In the example.js");
    viewer.show(imgSrc, highResolutionImage);
  });
});
}

export  {viewImage1, statistic};
