import { Directive, forwardRef } from '@angular/core';
import {AsyncValidator, ValidationErrors, AbstractControl, NG_ASYNC_VALIDATORS} from '@angular/forms';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appUniqueRole]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueRoleValidatorDirective),
      multi: true,
    },
  ],
})
export class UniqueRoleValidatorDirective implements AsyncValidator {
  validate(control: AbstractControl): Promise<ValidationErrors | null> {
	//console.log('validating UniqueRoleValidatorDirective');
	let v = null;
	if (control.value == '')  {
		v = { invalidusername: true };
	}
	//console.log('v:' + v + " - control.value:" + control.value);
    return Promise.resolve(v);//this.validator.validate(control);
  }
}