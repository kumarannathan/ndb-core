import { Component, Input } from "@angular/core";
import { Child } from "../../model/child";
import { OnInitDynamicComponent } from "../../../../core/view/dynamic-components/on-init-dynamic-component.interface";
import { PanelConfig } from "../../../../core/entity-components/entity-details/EntityDetailsConfig";

@Component({
  selector: "app-grouped-child-attendance",
  templateUrl: "./grouped-child-attendance.component.html",
  styleUrls: ["./grouped-child-attendance.component.scss"],
})
export class GroupedChildAttendanceComponent implements OnInitDynamicComponent {
  @Input() child: Child = new Child("");

  constructor() {}

  onInitFromDynamicConfig(config: PanelConfig) {
    this.child = config.entity as Child;
  }
}