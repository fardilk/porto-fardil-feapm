export type CodeableConceptExtendType = CodeableConceptType & {
  valueSetDisplay?: string;
  valueSetExtra?: string;
};

export type CodeableConceptType = {
  codingCode: string;
  codingSystem: string;
  codingDisplay: string;
};

export type CodeableConceptShortType = {
  code: string;
  system: string;
  display: string;
};

export type PeriodType = {
  startDatetime: any;
  stopDatetime: any;
};

export type PaginationProps = {
  page: number;
  take: number;
};

export type PaginationType = {
  status: boolean;
  message: string;
  pagination: PaginationInfoType;
};

export type NonPaginationType = {
  status: boolean;
  message: string;
};

export type MetaType = {
  createdUserID: string;
  createdDatetime: string;
  updatedUserID: string;
  updatedDatetime: string;
};

export type TerminologyType = {
  totalRow: Number;
  rowsPerPage: Number;
  page: Number;
  data: {
    resourceType: string;
    attributePath: string;
    codingCode: string;
    codingDisplay: string;
    codingSystem: string;
    code: string;
    display: string;
    description: string;
    codeSystem: string;
    parentCode: string;
  }[];
};

export type PaginationInfoType = {
  totalRow: number;
  totalPage: number;
  page: number;
};

export type PaginationListType = {
  status: boolean;
  message: string;
  pagination: PaginationInfoType;
};

export type LabelValueType = {
  id: string;
  label: string;
  value: string;
};

/**
 * @enum planned = Dijadwalkan : pasien menjadwalkan tindakan tapi pasien blm hadir di lokasi (blm check-in)
 * @enum cancelled = Batal : pasien sudah menjadwalkan tindakan, tetapi dibatalkan (sudah konfirmasi perawat)
 * @enum onHold = On-Hold : pasien sudah reservasi, masih di hold blm bisa dtg
 * @enum inProgress x= Dilayani : pasien sedang dilayani oleh dokter (ketika dokter klik mulai pelayanan di EMR)
 * @enum discharged x= Discharged : pasien sudah discharged (dokter klik selesai pelayanan)
 * @enum completed x= Pulang : pasien sudah pulang
 * @enum checkedIn x= Checked-in : pasien sudah check-in, datang hari itu di rumah sakit
 * @enum classInpatient x= Dirawat : Ketika pasien RJ sudah menjadi pasien RI
 * @enum onPlan x= Rencana Rawat : ketika pasien RJ akan menjadi pasien RI
 */
export type StatusType =
  | 'planned'
  | 'cancelled'
  | 'onHold'
  | 'inProgress'
  | 'discharged'
  | 'completed'
  | 'checkedIn'
  | 'classInpatient'
  | 'onPlan';

/**
 * @enum now = Sekarang : sedang dilayani
 * @enum present = Hadir : pasien hadir
 * @enum skip = Tidak HAdir : pasien tidak datang
 * @enum -
 */

export type CallStatusType = 'now' | 'present' | 'skip' | '-';

export type WorkOrderType = 'sent' | 'kept';

export type ItemStatusType =
  | 'verified'
  | 'collected'
  | '-'
  | 'not_verified'
  | 'process'
  | 'not_process'
  | 'workorder'
  | 'not_workorder';

export type ProcessStatusType = 'draft' | 'sent';

export type ConcoctionMethodType = 'dtd' | 'numerous';

export type DiagnoseCodeType = 'J06.9' | 'R05' | 'I10' | 'E11';

export type StatusISOPacsType = 'done' | 'incomplete';
