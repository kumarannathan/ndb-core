import { Component } from "@angular/core";
import {
  Aggregation,
  DataAggregationService,
} from "../data-aggregation.service";
import {
  getGroupingInformationString,
  GroupByDescription,
} from "../report-row";
import moment from "moment";
import { ExportColumnConfig } from "../../../core/export/data-transformation-service/export-column-config";
import { NgIf } from "@angular/common";
import { ViewTitleComponent } from "../../../core/common-components/view-title/view-title.component";
import { SelectReportComponent } from "./select-report/select-report.component";
import { ReportRowComponent } from "./report-row/report-row.component";
import { ObjectTableComponent } from "./object-table/object-table.component";
import { DataTransformationService } from "../../../core/export/data-transformation-service/data-transformation.service";
import { EntityMapperService } from "../../../core/entity/entity-mapper/entity-mapper.service";
import { ReportConfig } from "../report-config";
import { RouteTarget } from "../../../route-target";

@RouteTarget("Reporting")
@Component({
  selector: "app-reporting",
  templateUrl: "./reporting.component.html",
  styleUrls: ["./reporting.component.scss"],
  imports: [
    NgIf,
    ViewTitleComponent,
    SelectReportComponent,
    ReportRowComponent,
    ObjectTableComponent,
  ],
  standalone: true,
})
export class ReportingComponent {
  reports: ReportConfig[];
  mode: "exporting" | "reporting" = "exporting";
  loading: boolean;

  data: any[];
  exportableData: any[];

  constructor(
    private dataAggregationService: DataAggregationService,
    private dataTransformationService: DataTransformationService,
    private entityMapper: EntityMapperService,
  ) {
    this.entityMapper
      .loadType(ReportConfig)
      .then((res) => (this.reports = res));
  }

  async calculateResults(
    selectedReport: ReportConfig,
    fromDate: Date,
    toDate: Date,
  ) {
    this.loading = true;
    this.data = [];

    // Wait for change detection
    await new Promise((res) => setTimeout(res));

    // Add one day because to date is exclusive
    const dayAfterToDate = moment(toDate).add(1, "day").toDate();

    if (selectedReport.mode === "exporting") {
      await this.createExport(
        selectedReport.aggregationDefinitions as ExportColumnConfig[],
        fromDate,
        dayAfterToDate,
      );
    } else {
      await this.createReport(
        selectedReport.aggregationDefinitions as Aggregation[],
        fromDate,
        dayAfterToDate,
      );
    }

    this.loading = false;
  }

  private async createExport(
    exportConfig: ExportColumnConfig[],
    fromDate: Date,
    toDate: Date,
  ) {
    this.data = await this.dataTransformationService.queryAndTransformData(
      exportConfig,
      fromDate,
      toDate,
    );
    this.exportableData = this.data;
    this.mode = "exporting";
  }

  private async createReport(
    aggregationDefinitions: Aggregation[],
    fromDate: Date,
    toDate: Date,
  ) {
    this.data = await this.dataAggregationService.calculateReport(
      aggregationDefinitions,
      fromDate,
      toDate,
    );
    this.exportableData = this.flattenReportRows();
    this.mode = "reporting";
  }

  private flattenReportRows(
    rows = this.data,
  ): { label: string; result: any }[] {
    const tableRows: { label: string; result: any }[] = [];
    rows.forEach((result) => {
      tableRows.push(this.createExportableRow(result.header));
      tableRows.push(...this.flattenReportRows(result.subRows));
    });
    return tableRows;
  }

  private createExportableRow(header: {
    label: string;
    groupedBy: GroupByDescription[];
    result: any;
  }): { label: string; result: any } {
    let resultLabel = header.label;
    const groupByString = getGroupingInformationString(header.groupedBy);
    if (groupByString) {
      resultLabel += " " + groupByString;
    }
    return { label: resultLabel, result: header.result };
  }
}
