
import YamlFileReader from '../helper/util/YamlFileReader';

class AppConfiguration {

  private static config: Map<string,string>=new Map<string,string>;
  private static defaultEnvironment: string = process.env.npm_config_env || 'qa';
  private static defaultClient: string = process.env.environment || 'qa';


  public static setClient(client: string) {
    const parser = new YamlFileReader(`src/resources/config/configuration.yaml`);
    console.log("client name: "+client)
    const details = parser.getSettings(client, AppConfiguration.defaultEnvironment);
     for (let [key, value] of Object.entries(details)) {
       this.config.set(key, value);           
    } 
  }


  public static getBaseURL() {
    return this.config.get('url');
}
public static async getClient(): Promise<string | undefined>{
    return this.config.get('name');
}

/*  public static async getValue(key: string):Promise<string | undefined> {
     return this.config.get(key);
  } */
  public static async getValue(key: string): Promise<string> {
    let defaultValue: string = '';
    const value: string | undefined = await this.config.get(key);
    return value ?? defaultValue;
}

}

export default AppConfiguration;