import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DynamicValidatorsService } from "../../entity-form/dynamic-form-validators/dynamic-validators.service";

@Component({
  selector: "app-error-hint",
  templateUrl: "./error-hint.component.html",
})
export class ErrorHintComponent {
  @Input() form: FormControl;

  constructor(public validatorService: DynamicValidatorsService) {}
}