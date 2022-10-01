import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'symbol'
})
export class SymbolPipe implements PipeTransform {

  transform(value: any, symbol: string): string {
    switch(symbol) {
      case 'USD': return String(value) + '$';
      default: return String(value) + '$';
    }
  }

}
