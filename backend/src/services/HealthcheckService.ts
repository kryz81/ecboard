import { MongoClient } from 'mongodb';
import { MONGODB_HOST } from '../config/config';

export default class HealthcheckService {
  async getHealth() {
    const [mongodb] = await Promise.all([this.checkMongoDb()]);

    return {
      mongodb,
    };
  }

  private async checkMongoDb(): Promise<boolean> {
    try {
      await MongoClient.connect(String(MONGODB_HOST));
      return true;
    } catch {
      return false;
    }
  }
}
