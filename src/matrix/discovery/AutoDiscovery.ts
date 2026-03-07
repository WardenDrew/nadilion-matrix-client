import {ServerName} from 'src/matrix/models/ServerName';

interface WellKnownMatrixClient {
  'm.homeserver': WellKnownMatrixClientHomeserver|undefined;
  'm.identity_server': WellKnownMatrixClientIdentityServer|undefined;
}

interface WellKnownMatrixClientHomeserver {
  base_url: string|undefined;
}

interface WellKnownMatrixClientIdentityServer {
  base_url: string|undefined;
}

interface ClientVersionsResponse {
  versions: string[]|undefined;
  unstable_features: { [key: string]: boolean; }|undefined;
}

export class AutoDiscovery {
  serverNameHint: ServerName|undefined;

  constructor(serverNameHint: ServerName|undefined) {
    this.serverNameHint = serverNameHint;
  }

  public async discover() {
    if (!this.serverNameHint?.hostname) {
      console.log('Server name hint did not contain a hostname!');
      return undefined;
    }

    const wellKnownResponse = await fetch(
      `https://${this.serverNameHint.hostname}/.well-known/matrix/client`);

    if (wellKnownResponse.status === 404) {
      console.log('.well-known/matrix/client not found!')
      return undefined; // matrix permits using other mechanisms here
    }

    if (wellKnownResponse.status !== 200) {
      console.log(`.well-known/matrix/client responded with ` +
        `${wellKnownResponse.status} status!`);
      return undefined;
    }

    const wellKnownMatrixClient = (await wellKnownResponse
      .json()) as WellKnownMatrixClient;

    if (!wellKnownMatrixClient) {
      console.log('.well-known/matrix/client was not valid JSON!');
      return undefined;
    }

    const homeserverBaseUrl = wellKnownMatrixClient['m.homeserver']
      ?.base_url?.replace(/\/+$/, '');

    if (!homeserverBaseUrl) {
      console.error('.well-known/matrix/client did not contain a homeserver base_url!');
      return undefined;
    }

    if (!homeserverBaseUrl.startsWith('https://')) {
      console.error('homeserver base_url did not start with https://!');
      return undefined;
    }

    const homeserverClientVersionsResponse = await fetch(
      `${homeserverBaseUrl}/_matrix/client/versions`);

    if (homeserverClientVersionsResponse.status !== 200) {
      console.error('Received error response from homeserver!');
      return undefined;
    }

    const homeserverClientVersions = (await homeserverClientVersionsResponse
      .json()) as ClientVersionsResponse;

    if (!homeserverClientVersions?.versions ||
      homeserverClientVersions.versions.length === 0) {
      console.log('Failed to parse homeserver client versions or no versions were sent!');
      return undefined;
    }

    console.log(homeserverClientVersions);

    const identityServerBaseUrl = wellKnownMatrixClient['m.identity_server']
      ?.base_url?.replace(/\/+$/, '');

    if (identityServerBaseUrl) {

      if (!identityServerBaseUrl.startsWith('https://')) {
        console.error('identity_server was specified with no base_url starting with https://');
        return undefined;
      }

      const identityServerClientVersionsResponse = await fetch(
        `${identityServerBaseUrl}/_matrix/identity/v2`);

      if (identityServerClientVersionsResponse.status !== 200) {
        console.error('Received error response from identity server!');
        return undefined;
      }

      const identityServerClientVersions = (await identityServerClientVersionsResponse
        .json()) as ClientVersionsResponse;

      if (!identityServerClientVersions?.versions ||
        identityServerClientVersions.versions.length === 0) {
        console.log('Failed to parse identity server client versions or no versions were sent!');
        return undefined;
      }

      console.log(identityServerClientVersions);
    }

    return homeserverBaseUrl;
  }
}
