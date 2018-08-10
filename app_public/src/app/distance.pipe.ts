import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  /**
   * Takes in distance, formats it, and returns
   * it as a string in metres, or km's rounded
   * to the nearest decimal
   */
  transform(distance: number): string {
    // checks if input is a finite numeric value
    const _isNumeric = function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    if (distance && _isNumeric(distance)) {
      let thisDistance = '0';
      let unit = 'm';
      if (distance > 1000) {
        thisDistance = (distance/1000).toFixed(1);
        unit = 'km';
      }
      else {
        thisDistance = Math.floor(distance).toString();
      }
      return thisDistance + unit;
    }
    else {
      return '?'
    }
  }

}
