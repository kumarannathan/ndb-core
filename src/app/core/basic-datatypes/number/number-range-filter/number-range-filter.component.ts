import { Component, Input } from "@angular/core";
import { Entity } from "../../../entity/model/entity";
import { MatFormFieldModule } from "@angular/material/form-field";
import {
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";
import {
  NumericRange,
  RangeInputComponent,
} from "./range-input/range-input.component";
import { NumberFilter } from "../../../filter/filters/numberFilter";

@Component({
  selector: "app-date-range-filter",
  templateUrl: "./number-range-filter.component.html",
  styleUrls: ["./number-range-filter.component.scss"],
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, RangeInputComponent],
})
export class NumberRangeFilterComponent<T extends Entity> {
  @Input() filterConfig: NumberFilter<T>;

  formControl: FormControl<NumericRange>;

  private validatorFunction: ValidatorFn = (): ValidationErrors | null => {
    if (
      this.formControl.value.from &&
      this.formControl.value.to &&
      this.formControl.value.from === this.formControl.value.to
    ) {
      return {
        sameValue: "The from value is the same as the to value.",
      };
    } else {
      return null;
    }
  };

  constructor() {
    this.formControl = new FormControl<NumericRange>({ from: 0, to: 1 });
    this.formControl.addValidators([this.validatorFunction]);

    this.formControl.valueChanges.subscribe((value) => {
      console.log(this.formControl.valid, this.formControl.errors);
    });
  }
}
