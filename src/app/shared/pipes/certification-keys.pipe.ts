import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'certificationKeys'
})
export class CertificationKeysPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return Object.keys(value[0]);
  }

}
