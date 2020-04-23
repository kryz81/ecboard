import pm2 from 'pm2';

export default class AppsService {
  getProcessList() {
    return new Promise((resolve, reject) => {
      pm2.list((err, processes) => {
        if (err) {
          return reject(err);
        }
        resolve(processes);
      });
    });
  }
}
