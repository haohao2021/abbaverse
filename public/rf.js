// Assuming 'data' is the object loaded from 'data.json'
// and 'spotifyIds' is the object loaded from 'spotifyId.json'
const data = require('./data.json');
const spotifyIds = require('./spotifyId.json');



for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const originalSong = data[key].original_song;
      const spotifyId = spotifyIds[originalSong] || 'Not Found';
      data[key].spotifyId = spotifyId;
    }
  }
  
  // Assuming you are using Node.js or similar environment to write the updated data to a file
  const fs = require('fs');
  fs.writeFileSync('updatedData.json', JSON.stringify(data, null, 2));
  