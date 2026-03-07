/**
 * The parsed server name
 */
export class ServerName {
  hostname?: string|undefined;
  hostnameType?: 'ipv4'|'ipv6'|'dns'|undefined;
  ipv4?: string|undefined;
  ipv6?: string|undefined;
  dns?: string|undefined;
  _port?: string|undefined;
  port?: number|undefined;

  // Must use backticks here for as close to verbatim string as possible
  public static parseRegex: RegExp = new RegExp([
    `^(?<hostname>`, // hostname group one of ipv4, ipv6 or dns
    `(?<ipv4>[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})`, // ipv4
    `|(?<ipv6>\[[a-fA-F0-9\:\.]{2,45}\])`, // -or- ipv6
    `|(?<dns>[a-zA-Z0-9\-\.]{1,255}))`, // -or- dns and close hostname group
    `(?::(?<port>[0-9]{1,5}))?$` // optional port
  ].join(''));

  /**
   * Parses the supplied server name according to:
   * https://spec.matrix.org/v1.17/appendices/#server-name
   * @param rawServerName
   */
  public static parse(
    rawServerName: string)
    : ServerName|undefined
  {
    const serverNameParts = ServerName.parseRegex.exec(rawServerName)?.groups;

    if (!serverNameParts) {
      console.log(`Server name ${rawServerName} is not a valid matrix format`);
      return undefined;
    }

    const serverName: ServerName = {};

    serverName.hostname = serverNameParts['hostname'];
    if (!serverName.hostname) {
      console.error(`Server name ${rawServerName} passed regex validation but ` +
        `has no hostname group! The regex must be malformed!`);
      return undefined;
    }

    serverName._port = serverNameParts['port'];
    if (serverName._port) {
      serverName.port = Number(serverName._port);
      if (Number.isNaN(serverName.port)) {
        console.error(`Server name ${rawServerName} passed regex validation but ` +
          `port group was not a number! The regex must be malformed!`);
        return undefined;
      }

      if (serverName.port < 1 || serverName.port > 65535) {
        console.log(`Server name ${rawServerName} port is out of range`);
        return undefined;
      }
    }

    serverName.ipv4 = serverNameParts['ipv6'];
    if (serverName.ipv4) {
      serverName.hostnameType = 'ipv4';
    }

    serverName.ipv6 = serverNameParts['ipv6'];
    if (serverName.ipv6) {
      if (serverName.hostnameType !== undefined) {
        console.error(`Server name ${rawServerName} passed regex validation but ` +
          `multiple hostname disjunction groups matched! The regex must be malformed!`);
        return undefined;
      }
      serverName.hostnameType = 'ipv6';
    }

    serverName.dns = serverNameParts['dns'];
    if (serverName.dns) {
      if (serverName.hostnameType !== undefined) {
        console.error(`Server name ${rawServerName} passed regex validation but ` +
          `multiple hostname disjunction groups matched! The regex must be malformed!`);
        return undefined;
      }
      serverName.hostnameType = 'dns';
    }

    return serverName;
  }
}




