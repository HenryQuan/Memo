import store from 'react-native-simple-store';
import { Data, VERSION, Admoob, AdmobIOS } from '../constant/value';
import { Platform } from 'react-native';
import { AdMobInterstitial } from 'react-native-admob';

class DataManager {
  static async SetupData() {
    let first = await store.get(Data.First);
    if (first != false) {
      // New user
      await store.save(Data.First, false);
      await store.save(Data.Version, VERSION);
      await store.save(Data.Saved, []);
      await store.save(Data.Ads, false);
    } else {
      // Restore data
      console.log(await store.get(Data.Ads));
      if (await store.get(Data.Version) != VERSION) {
        // Update game
        await this.UpdateData();
      }     
      global.saved = await store.get(Data.Saved);
      global.ads = await store.get(Data.Ads);
      // Show ads
      if (global.ads == true) {
        AdMobInterstitial.setAdUnitID(Platform.OS == 'ios' ? AdmobIOS : Admoob);
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
      }
    }
  }

  static async UpdateData() {
    // Update version
    await store.save(Data.Version, VERSION);
    // Setup new data
    if (await store.get(Data.Ads) == null) await store.save(Data.Ads, false)
  }
}

export { DataManager };