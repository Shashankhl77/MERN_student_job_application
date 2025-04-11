import { Document, Schema, Model, model, SchemaOptions } from "mongoose";

export interface IAppication {
  company?: string;
  role?: string;
  status?: ApplicationStatus;
  link?: string;
  dateOfApplication: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export enum ApplicationStatus {
  APPLIED = "APPLIED",
  REJECTED = "REJECTED",
  OFFER = "OFFER",
  INTERVIEW = "INTERVIEW",
}

export interface IAppicationData extends IAppication, Document {}

export const ApplicationSchema = new Schema<IAppicationData>(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    status: {
      type: String,
      enum: ApplicationStatus,
      default: ApplicationStatus.APPLIED,
    },
    dateOfApplication: { type: String, required: true },
    link: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ApplicationModel = model<IAppicationData>(
  "JobApplication",
  ApplicationSchema
);
