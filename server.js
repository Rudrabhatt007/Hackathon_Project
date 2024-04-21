const ffmpeg = require('fluent-ffmpeg');

const inputFile = 'English.mp4';
const outputFile = 'output.mp3';
const targetURL = 'http://127.0.0.1:5000/';
const fs = require('fs');
const express = require('express');
const textFile = 'quiz.txt'
var cors = require('cors')

const app = express();
app.use(cors())

app.get('/hello', (req, res) => {
    // Simulate some processing
    const message = "Hello from Node.js server!";
    convertMP4toMP3(inputFile, outputFile)
        .then((outputPath) => {
            console.log(`Conversion successful! MP3 saved at: ${outputPath}`);
            uploadMP3(targetURL);
        })
        .catch((err) => {
            console.error('Error during conversion:', err);
        });

    // Send the response
    res.send(message);
});

app.get('/quiz', (req, res) => {
    convertToJson(textFile)
        .then(jsonData => {
            // res.send(jsonData);
            res.json(jsonData);
        })
        .catch(error => {
            console.error("Error converting to JSON:", error);
        });
})


app.listen(5500, () => {
    console.log('Server listening on port 5500');
});

function readFile(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                return reject(err); // Handle errors
            }
            resolve(data);
        });
    });
}

function convertMP4toMP3(inputFile, outputFile) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputFile)
            .audioCodec('libmp3lame') // Set output audio codec to mp3
            .on('end', () => resolve(outputFile))
            .on('error', (err) => reject(err))
            .save(outputFile);
    });
}

async function convertToJson(file) {
    try {
        const textData = await readFile(file);

        // Parse the text data based on your specific format
        const jsonData = parseTextData(textData);

        return jsonData;
    } catch (error) {
        console.error("Error reading file or parsing data:", error);
        // Handle the error appropriately, like throwing a new error or returning null
    }
}

// This function needs to be implemented based on your text file format
function parseTextData(textData) {
    // Split the text by lines
    const lines = textData.split(/\r?\n/);

    // Assuming each line represents a key-value pair (question, option, or answer)
    const dataObject = {};
    for (const line of lines) {
        const [key, value] = line.split(":"); // Split by colon (:) delimiter
        if (key.trim() === "Options") {
            // Split the value by comma (,) and trim whitespaces
            dataObject[key.trim()] = value.trim().split(",").map(option => option.trim());
        } else {
            dataObject[key.trim()] = value.trim();
        }

    }
    return dataObject;
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
