import pm2, { ProcessDescription } from 'pm2';

interface ProcessInfo {
  pid: number;
  app: {
    name: string;
    port: number | undefined;
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

  getProcess(processId: number): Promise<ProcessDescription[]> {
    return new Promise((resolve, reject) => {
      pm2.describe(processId, (err, process) => {
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
      app: {
        name: process.name || '',
        port: Number((process.pm2_env as EnvObject)?.APP_PORT),
      },
    }));
  }
}
