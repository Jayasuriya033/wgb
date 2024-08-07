import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sgtoinr'
})
export class SgtoinrPipe implements PipeTransform {

  transform(value: number, ...args: number[]): unknown {
   

    return value;
  }

}
