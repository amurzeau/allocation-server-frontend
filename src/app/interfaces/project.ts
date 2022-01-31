import { Eotp, EotpIdentifier } from './eotp';
import { ApplicationType, ApplicationTypeIdentifier } from './application-type';

export type ProjectIdentifier = number;

export interface Project {
    id: ProjectIdentifier;
    name: string;
    board: string;
    target: string;
    type: ApplicationTypeIdentifier;
    eotpOpen: EotpIdentifier[];
    eotpClosed: EotpIdentifier[];
}

export interface ProjectApiData {
    id: ProjectIdentifier;
    name: string;
    board: string;
    target: string;
    type: ApplicationType;
    eotpOpen: Eotp[];
    eotpClosed: Eotp[];
}
