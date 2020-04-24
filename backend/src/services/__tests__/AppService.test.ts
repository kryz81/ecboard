import AppsService from '../AppsService';
import * as pm2 from 'pm2';

jest.mock('pm2', () => ({
  describe: jest.fn((appName: string, cb: any) => cb(null, processesFixture)),
  list: jest.fn((cb: any) => cb(null, processesFixture)),
}));

describe('AppService', () => {
  let appService: AppsService;

  beforeEach(() => {
    jest.clearAllMocks();
    appService = new AppsService();
  });

  describe('getProcessList', () => {
    it('returns process list with relevant properties', async () => {
      const result = await appService.getProcessList();

      expect(result).toEqual([
        { pid: 10, app: { name: 'app 1', port: 3000 } },
        { pid: 20, app: { name: 'app 2', port: 4000 } },
      ]);
    });

    it('returns all properties with verbose mode', async () => {
      const result = await appService.getProcessList(true);

      expect(result).toEqual(processesFixture);
    });
  });

  describe('getProcess', () => {
    it('calls pm2 and returns process with given app name', async () => {
      const result = await appService.getProcess('ecboard');

      expect(pm2.describe).toBeCalledWith('ecboard', expect.anything());
      expect(result).toEqual(processesFixture);
    });
  });
});

const processesFixture = [
  {
    pid: 10,
    pm_id: 1,
    name: 'app 1',
    monit: {
      memory: 1,
    },
    pm2_env: {
      APP_PORT: 3000,
      DB_HOST: 'host',
    },
  },
  {
    pid: 20,
    pm_id: 2,
    name: 'app 2',
    monit: {
      memory: 1,
    },
    pm2_env: {
      APP_PORT: 4000,
      DB_HOST: 'host',
    },
  },
];
