export interface Statement {
    id: string;
    date: string;
    amount: number;
    status: 'paid' | 'unpaid' | 'overdue';
    reference: string;
    pdfUrl: string;
  }
  
  export interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
  }