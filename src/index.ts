import Server from './app/Server';
import App from './app/App';

const app = new App();

new Server(app).start();
