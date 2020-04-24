import { APP_PORT } from '../config/config';
import App from './App';

export default class Server {
  constructor(private app: App) {}

  start() {
    if (!APP_PORT) {
      throw new Error('Server port not definied');
    }

    this.app.init().listen(Number(APP_PORT), () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${APP_PORT}`);
    });
  }
}
