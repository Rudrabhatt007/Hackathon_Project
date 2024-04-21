const ffmpeg = require('fluent-ffmpeg');

const inputFile = 'English.mp4';
const outputFile = 'output.mp3';
const targetURL = 'http://127.0.0.1:5000/';
const express = require("express");
const fs = require('fs');

const app = express();

convertMP4toMP3(inputFile, outputFile)
  .then((outputPath) => {
    console.log(`Conversion successful! MP3 saved at: ${outputPath}`);
    uploadMP3(targetURL);
  })
  .catch((err) => {
    console.error('Error during conversion:', err);
  });

function convertMP4toMP3(inputFile, outputFile) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputFile)
      .audioCodec('libmp3lame') // Set output audio codec to mp3
      .on('end', () => resolve(outputFile))
      .on('error', (err) => reject(err))
      .save(outputFile);
  });
}

async function uploadMP3(targetURL) {
    try {
  
      await fetch(targetURL, {
        method: 'GET',
      });
  
      console.log('MP3 uploaded successfully!');
      
    } catch (err) {
      console.error('Error uploading MP3:', err);
    }
  }

// Example usage (replace with your actual file paths)



