import { ProjectApiData, ProjectIdentifier } from './project';
import { ActivityType, ActivityTypeIdentifier } from './activity-type';

export type AllocationIdentifier = number;

export interface Allocation {
  id: AllocationIdentifier;
  projectId: ProjectIdentifier | undefined;
  activityTypeId: ActivityTypeIdentifier | undefined;
  duration: number;
}

export interface AllocationApiData {
  id: AllocationIdentifier;
  project: ProjectApiData | null;
  activityType: ActivityType | null;
  duration: number;
}
