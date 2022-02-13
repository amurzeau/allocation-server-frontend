import { Eotp, EotpIdentifier } from './eotp';
import { ApplicationType, ApplicationTypeIdentifier } from './application-type';

export type ProjectIdentifier = number;

export interface Project {
  id: ProjectIdentifier;
  name: string | undefined;
  board: string | undefined;
  component: string | undefined;
  arch: string | undefined;
  type: ApplicationTypeIdentifier | undefined;
  eotpOpen: EotpIdentifier[];
  eotpClosed: EotpIdentifier[];
}

export interface ProjectApiData {
  id: ProjectIdentifier;
  name: string;
  board: string;
  component: string;
  arch: string;
  type: ApplicationType;
  eotpOpen: Eotp[];
  eotpClosed: Eotp[];
}
