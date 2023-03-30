export class WM_Error {
  code: string;
  field?: string;
  description?: string;
  info?: string;
  severity?: WM_Severity;
  category?: string;
  causes?: WM_Cause[];
  errorIdentifiers?: any;
  component?: string;
  type?: string;
  serviceName?: string;
  gatewayErrorCategory?: WM_GatewayErrorCategory;
}

export class WM_Cause {
  code?: string;
  field?: string;
  type?: string;
  description?: string;
}

export enum WM_Severity {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export enum WM_Category {
  APPLICATION = 'APPLICATION',
  SYSTEM = 'SYSTEM',
  REQUEST = 'REQUEST',
  DATA = 'DATA',
}

export enum WM_GatewayErrorCategory {
  INTERNAL_DATA_ERROR = 'INTERNAL_DATA_ERROR',
  EXTERNAL_DATA_ERROR = 'EXTERNAL_DATA_ERROR',
  SYSTEM_ERROR = 'SYSTEM_ERROR',
}

export class WM_Meta {
  totalCount?: number;
  limit?: number;
  nextCursor?: string;
}
