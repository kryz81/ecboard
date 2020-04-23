import AppsService from '../AppsService';

jest.mock('pm2', () => ({
  describe: jest.fn(),
  list: jest.fn(),
}));

describe('AppService', () => {
  let appService: AppsService;

  beforeEach(() => {
    appService = new AppsService();
  });

  describe('getProcessList', () => {});

  describe('getProcess', () => {});
});
