import { ProjectApiData, ProjectIdentifier } from './project';
import { ActivityType, ActivityTypeIdentifier } from './activity-type';

export type AllocationIdentifier = number;

export interface Allocation {
  id: AllocationIdentifier;
  project: ProjectIdentifier | undefined;
  activityType: ActivityTypeIdentifier | undefined;
  duration: number;
}

export interface AllocationApiData {
  id: AllocationIdentifier;
  project: ProjectApiData;
  activityType: ActivityType;
  duration: number;
}
