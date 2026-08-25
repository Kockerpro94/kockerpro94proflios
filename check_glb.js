const fs = require('fs');
const buffer = fs.readFileSync('c:/Users/admin/Desktop/kockerpro94proflio-main/public/models/Commodore710_33.5.glb');
const magic = buffer.readUInt32LE(0);
const jsonChunkLength = buffer.readUInt32LE(12);
const jsonChunkType = buffer.readUInt32LE(16);
const jsonStr = buffer.toString('utf8', 20, 20 + jsonChunkLength);
const gltf = JSON.parse(jsonStr);
console.log('Nodes in the GLB:');
gltf.nodes.forEach(n => console.log(n.name));
