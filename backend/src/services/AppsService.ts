import pm2, { ProcessDescription } from 'pm2';

interface ProcessInfo {
  pid: number;
  status: string | null;
  app: {
    name: string;
    port: number | null;
  };
}

interface EnvObject {
  [key: string]: any;
}

export default class AppsService {
  getProcessList(verbose = false): Promise<ProcessDescription[] | ProcessInfo[]> {
    return new Promise((resolve, reject) => {
      pm2.list((err, processes) => {
        if (err) {
          return reject(err);
        }
        if (verbose) {
          return resolve(processes);
        }
        resolve(this.createProcessInfo(processes));
      });
    });
  }

  getProcess(appName: string): Promise<ProcessDescription[]> {
    return new Promise((resolve, reject) => {
      pm2.describe(appName, (err, process) => {
        if (err) {
          return reject(err);
        }
        resolve(process);
      });
    });
  }

  private createProcessInfo(list: ProcessDescription[]): ProcessInfo[] {
    return list.map((process: ProcessDescription) => ({
      pid: process.pid!,
      status: process.pm2_env?.status || null,
      app: {
        name: process.name || '',
        port: (process.pm2_env as EnvObject)?.APP_PORT ? Number((process.pm2_env as EnvObject)?.APP_PORT) : null,
      },
    }));
  }
}
