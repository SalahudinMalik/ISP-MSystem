export class Globals {
    // hostname: string = window.location.hostname;
    hostname: string = 'localhost';
    port: string = window.location.port;
    weburl: string = 'http://' + this.hostname  + ':3000/api';
    fn_parseFloatIgnoreCommas(varString: String): any {
      const stringWithoutComma = varString.replace(',', '');
      return parseFloat(stringWithoutComma);
    }
}
