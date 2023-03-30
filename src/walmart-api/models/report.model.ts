export class WM_ReportRequestParams {
  reportType: string;
  reportVersion?: string;
}

export class WM_AllReportRequestParams extends WM_ReportRequestParams {
  requestStatus?: string;
  requestSubmissionStartDate?: string;
  requestSubmissionEndDate?: string;
}

export class WM_CreateReportBody {
  rowFilters?: WM_EnumFilter[] | WM_RangeFilter;
  excludeColumns?: string[];
}

export class WM_EnumFilter {
  values?: string[];
  columnNames?: string;
  type?: WM_FilterType;
}

export class WM_RangeFilter {
  from?: string;
  to?: string;
  rowFilterType?: WM_FilterType;
  columnNames?: string;
}

export enum WM_FilterType {
  rangeFilter = 'rangeFilter',
  enumFilter = 'enumFilter',
}

export enum WM_RequestStatus {
  RECEIVED = 'RECEIVED',
  INPROGRESS = 'INPROGRESS',
  READY = 'READY',
  ERROR = 'ERROR',
}

export enum WM_ReportType {
  ITEM = 'ITEM',
  INVENTORY = 'INVENTORY',
  CANCELLATION = 'CANCELLATION',
  DELIVERY_DEFECT = 'DELIVERY_DEFECT',
  ITEM_PERFORMANCE = 'ITEM_PERFORMANCE',
  PROMO = 'PROMO',
  RETURN_OVERRIDES = 'RETURN_OVERRIDES',
  CPA = 'CPA',
  SHIPPING_CONFIGURATION = 'SHIPPING_CONFIGURATION',
  SHIPPING_PROGRAM = 'SHIPPING_PROGRAM',
}

export class WM_ReportResponse {
  downloadUrl?: string;
  downloadURLExpirationTime?: string;
  requestId?: string;
  requestStatus?: WM_RequestStatus;
  requestSubmissionDate?: string;
  reportType?: WM_ReportType;
  reportVersion?: string;
  reportGenerationDate?: string;
}

export class WM_ReportStatusResponse {
  requestId?: string;
  requestStatus?: WM_RequestStatus;
  requestSubmissionDate?: string;
  reportType?: WM_ReportType;
  reportVersion?: string;
  reportGenerationDate?: string;
  payload?: WM_CreateReportBody;
}
