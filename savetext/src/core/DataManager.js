import store from 'react-native-simple-store';
import { Data, VERSION } from '../constant/value';

class DataManager {
  static async SetupData() {
    let first = await store.get(Data.First);
    if (first != false) {
      // New user
      await store.save(Data.First, false);
      await store.save(Data.Version, VERSION);
      await store.save(Data.Saved, []);
    } else {
      // Restore data
      if (await store.get(Data.Version) != VERSION) {
        // Update game
        await UpdateData();
      }     
      global.saved = await store.get(Data.Saved);
    }
  }

  async UpdateData() {

  }
}

export { DataManager };