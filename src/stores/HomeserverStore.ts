import { defineStore } from 'pinia';

export const useHomeserverStore = defineStore('homeserver', {
  state: () => ({
    displayName: 'Nadilion Community',
    serverName: 'nadilion.com',
    hostName: 'server.matrix.nadilion.com',
    port: undefined,
    banner: 'https://picsum.photos/id/17/800/200',
    overviewBanner: 'https://picsum.photos/id/20/800/400',
    overview: [
      'This Matrix home-server is operated by Nadilion, a volunteer-run community dedicated ' +
      'to providing stable, privacy-respecting communication infrastructure for diverse ' +
      'online communities. The goal is simple: give communities a place where conversations ' +
      'belong to the people participating in them, not to an advertising platform.',
      'Nadilion is maintained by a small group of engineers and community stewards who ' +
      'handle maintenance, moderation, and federation. The server participates fully ' +
      'in the Matrix network, allowing members to communicate with users across thousands ' +
      'of other homeservers while still benefiting from the policies and safety standards ' +
      'established locally.',
    ],
  }),
})
