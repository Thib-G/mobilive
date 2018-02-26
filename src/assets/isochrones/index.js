import iso15 from './15min';
import iso30 from './30min';
import iso45 from './45min';
import iso60 from './60min';

const polyCoords = coords => coords.split(',')
  .map(latlon => latlon.split(' ')
    .map(coord => parseFloat(coord)));

export const polyCoords15 = polyCoords(iso15);
export const polyCoords30 = polyCoords(iso30);
export const polyCoords45 = polyCoords(iso45);
export const polyCoords60 = polyCoords(iso60);
