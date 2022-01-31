import { Injectable } from '@angular/core';

import { UserIdentifier } from '../interfaces/user';
import { AllocationApiData } from '../interfaces/allocation';
import { Project, ProjectApiData } from '../interfaces/project';
import { Eotp } from '../interfaces/eotp';
import { ActivityType } from '../interfaces/activity-type';
import { ApplicationType } from '../interfaces/application-type';

@Injectable({
  providedIn: 'root'
})
export class AllocationsService {

  constructor() { }

  getAllocations(userId: UserIdentifier): AllocationApiData[] {
    return [
      {
        id: 0,
        project: {
          id: 0,
          name: 'Project1',
          board: 'board',
          component: 'gpp',
          arch: 'x86',
          type: {
            id: 'firmware',
            name: 'Firmware'
          },
          eotpOpen: [{
            id: '1231242304-2334',
            name: 'proj-board-7'
          }],
          eotpClosed: [{
            id: '1765147657-2334',
            name: 'proj-board-old-1'
          },
          {
            id: '1765147657-5785',
            name: 'proj-board-old-2'
          }]
        },
        activityType: {
          id: 'dev',
          name: 'Developpement'
        },
        duration: 1,
      },
      {
        id: 1,
        project: {
          id: 0,
          name: 'Project1',
          board: 'board',
          component: 'dsp',
          arch: 'arm',
          type: {
            id: 'firmware',
            name: 'Firmware'
          },
          eotpOpen: [{
            id: '1231242304-2334',
            name: 'proj-board-7'
          }],
          eotpClosed: [{
            id: '1765147657-2334',
            name: 'proj-board-old-1'
          },
          {
            id: '1765147657-5785',
            name: 'proj-board-old-2'
          }]
        },
        activityType: {
          id: 'support',
          name: 'Support'
        },
        duration: 10,
      },
      {
        id: 2,
        project: {
          id: 1,
          name: 'Lol project',
          board: 'magelan',
          component: 'stm32',
          arch: 'arm',
          type: {
            id: 'desktop-app',
            name: 'Desktop application'
          },
          eotpOpen: [{
            id: '110000000-0001',
            name: 'proj-lol-1'
          }],
          eotpClosed: []
        },
        activityType: {
          id: 'dev',
          name: 'Developpement'
        },
        duration: 5,
      },
    ];
  }

  getProjects(): ProjectApiData[] {
    return [
      {
        id: 0,
        name: 'Project1',
        board: 'board',
        component: 'gpp',
        arch: 'x86',
        type: {
          id: 'firmware',
          name: 'Firmware'
        },
        eotpOpen: [{
          id: '1231242304-2334',
          name: 'proj-board-7'
        }],
        eotpClosed: [{
          id: '1765147657-2334',
          name: 'proj-board-old-1'
        },
        {
          id: '1765147657-5785',
          name: 'proj-board-old-2'
        }]
      },
      {
        id: 1,
        name: 'Lol project',
        board: 'magelan',
        component: 'dsp',
        arch: 'arm',
        type: {
          id: 'desktop-app',
          name: 'Desktop application'
        },
        eotpOpen: [{
          id: '110000000-0001',
          name: 'proj-lol-1'
        }],
        eotpClosed: []
      }
    ];
  }

  getEotps(): Eotp[] {
    return [
      {
          id: '1231242304-2334',
          name: 'proj-board-7'
        },
        {
          id: '1765147657-2334',
          name: 'proj-board-old-1'
        },
        {
          id: '1765147657-5785',
          name: 'proj-board-old-2'
        },
        {
          id: '110000000-0001',
          name: 'proj-lol-1'
        },
    ];
  }

  getActivityType(): ActivityType[] {
    return [
      {
        id: 'dev',
        name: 'Developpement'
      },
      {
        id: 'support',
        name: 'Support'
      },
    ];
  }

  getApplicationType(): ApplicationType[] {
    return [
      {
        id: 'firmware',
        name: 'Firmware'
      },
      {
        id: 'desktop-app',
        name: 'Desktop application'
      },
    ];
  }

  getProjectsFromAllocationApiData(allocationApiData: AllocationApiData[]) : ProjectApiData[] {
    return allocationApiData.filter((value) => (value.project !== null)).map((value) => {
      return value.project!;
    });
  }
}
