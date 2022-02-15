import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-validator-form',
  templateUrl: './validator-form.component.html',
  styleUrls: ['./validator-form.component.scss'],
})
export class ValidatorFormComponent implements OnInit {
  myForm: any;

  radioGroupData = [
    { name: 'Radio1', isSelected: false },
    { name: 'Radio2', isSelected: false },
  ];

  constructor() {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(4)],
        updateOn: 'submit',
      }),
      radio: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'submit',
      }),
      checkboxGroup: new FormGroup(
        {
          checkbox1: new FormControl(false),
          checkbox2: new FormControl(false),
          checkbox3: new FormControl(false),
        },
        {
          validators: [requireCheckboxesToBeCheckedValidator(1)],
          updateOn: 'submit',
        }
      ),
    });
  }

  submit() {
    this.myForm.markAllAsTouched();
  }

  get name() {
    return this.myForm.get('name');
  }
  get radio() {
    return this.myForm.get('radio');
  }
  get checkboxGroup() {
    return this.myForm.get('checkboxGroup');
  }
}

export function requireCheckboxesToBeCheckedValidator(
  minNumber: number
): ValidatorFn {
  return (formGroup: any): ValidationErrors | null => {
    // foreach formgroup to find checked checkboxes
    let checked = 0;
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.controls[key];

      if (control.value === true) {
        checked++;
      }
    });

    if (checked < minNumber) {
      return {
        required: true,
      };
    }
    return null;
  };
}
