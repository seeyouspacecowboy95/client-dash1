export type ActivityType =
  | 'COMMUNICATION_UPDATE'
  | 'STATEMENT_DOWNLOAD'
  | 'PAYMENT'
  | 'METER_READING'
  | 'QUERY_SUBMISSION'
  | 'REPORT_DOWNLOAD'
  | 'ACCOUNT_MANAGEMENT'
  | 'PAYMENT_REMINDER'
  | 'QUERY_UPDATE'
  | 'COMMUNICATION_LOG';

export interface Activity {
  id: string;
  type: ActivityType;
  userId: string;
  description: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export type UserRole = 'user' | 'admin' | 'superadmin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  department?: string;
  name: string;
}