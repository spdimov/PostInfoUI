import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertNumber',
})
export class ConvertNumberPipe implements PipeTransform {

  transform(number: number, args?: any): any {
    if (isNaN(number)) return null;
    if (number === null) return null;
    if (number === 0) return 0;
    let abs = Math.abs(number);
    const rounder = Math.pow(10, 1);
    let key = '';

    const powers = [
        {key: 'M', value: Math.pow(10, 6)},
        {key: 'K', value: 1000}
    ];

    for (let i = 0; i < powers.length; i++) {
        let reduced = abs / powers[i].value;
        reduced = Math.round(reduced * rounder) / rounder;
        if (reduced >= 1) {
            abs = reduced;
            key = powers[i].key;
            break;
        }
    }
    return (key!='' ? abs + key + '+' : abs + key);
}

}
