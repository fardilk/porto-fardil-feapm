import type { Nullable } from "src/types/common";

export type InsertBookingProps = {
  errorMessage?: string;
};

export type CheckinResponse = {
  booking: {
    bookingID: string;
    payplanClass: "GENERAL" | "BPJS" | "INSURANCE" | "COMPANY";
    notes: string;
    bpjs: Nullable<{
      performerServiceName: string;
      referralDate: string;
      referralNumber: string;
      subscriberCategory: string;
      subscriberClass: string;
      subscriberInstitution: string;
      subscriberNumber: string;
      subscriberStatus: string;
    }>;
    patient: {
      nik: string;
      name: string;
      birthDttm: string;
      birthPlace: string;
      phone: string;
      email: string;
      address: string;
      gender: string;
      bloodType: string;
      bloodRhesus: string;
    };
    encounter: {
      healthcareServiceName: string;
      practitionerName: string;
      scheduleSlotDate: string;
      scheduleSlotStartTime: string;
    };
  }
};

export type InformationType = {
  data: CheckinResponse
};
