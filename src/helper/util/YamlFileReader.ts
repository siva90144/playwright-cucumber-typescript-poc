import * as fs from 'fs';
import * as yaml from 'js-yaml';

interface EnvironmentDetails {
    [key: string]: any;
}

interface ClientData {
    [env: string]: EnvironmentDetails;
}

interface ClientDetails {
    [client: string]: ClientData;
}

export default class YamlFileReader {
 
    private data: ClientDetails;

    constructor(filePath: string) {
        const { clientData } = this.parseYAML(filePath);
        this.data = clientData;
    }

    private parseYAML(filePath: string): { clientData: ClientDetails } {
        const yamlData: string = fs.readFileSync(filePath, 'utf8');
        const parsedData = yaml.load(yamlData) as ClientDetails;
        return { clientData: parsedData };
    }

    getSettings(client: string, env: string): EnvironmentDetails {
        const clientData = this.data[client];
        const commonData=this.data['globalcommon'];
        if (clientData) {
            const clientEnvData = clientData[env];
            const commonEnvData = commonData[env];            
            if (clientEnvData) {
                return { ...commonEnvData, ...clientEnvData };
            } else {
                throw new Error(`Environment '${env}' not found for client '${client}'.`);
            }
        } else {
            throw new Error(`Client '${client}' not found.`);
        }
    }
    
}
