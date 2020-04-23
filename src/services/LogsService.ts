import pm2 from 'pm2';
import AppsService from './AppsService';

export default class LogsService {
  constructor(private appsService: AppsService) {}

  async getErrorLog(processId: number): Promise<string | undefined> {
    const [process] = await this.appsService.getProcess(processId);

    if (!process) {
      throw new Error('Process not found');
    }

    return process.pm2_env?.pm_err_log_path;
  }
}
