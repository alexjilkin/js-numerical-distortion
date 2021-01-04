import fs from  'fs';
import wav from 'wav';
import Speaker from 'speaker';

import {forwardEuler, odeBackwardEuler} from './numerical-methods.js'

const file = fs.createReadStream('samples/purity.wav');
const reader = new wav.Reader();
let speaker


// the "format" event gets emitted at the end of the WAVE header
reader.on('format', function (format) {
    speaker = new Speaker(format)

    reader.on('data', (chunk) => {
        const data = [...chunk].map(y => y / 3640.78).map(y => y > 4.5 ? 4.5 : y < -4.5 ? -4.5 : y)
        
        const distortion = odeBackwardEuler(0, data).map(y => y * 3640.78)
        const newBuffer = Buffer.from(distortion)
        speaker.write(newBuffer)
    })
});

file.pipe(reader);