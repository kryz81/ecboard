import { createReadStream } from 'fs';
import AppsService from './AppsService';

export default class LogsService {
  constructor(private appsService: AppsService) {}

  async getLog(appName: string): Promise<string[] | undefined[]> {
    const [process] = await this.appsService.getProcess(appName);

    if (!process) {
      throw new Error('Process not found');
    }

    const errorPath = process.pm2_env?.pm_err_log_path;
    const outPath = process.pm2_env?.pm_out_log_path;

    const actions = [];

    if (errorPath) {
      actions.push(this.getData(errorPath));
    }
    if (outPath) {
      actions.push(this.getData(outPath));
    }

    return await Promise.all(actions);
  }

  private getData(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const stream = createReadStream(filePath, 'utf-8');
      let data = '';
      stream
        .on('error', (err) => reject(err))
        .on('data', (chunk) => data + chunk)
        .on('end', () => resolve(data));
    });
  }
}
