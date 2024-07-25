/* eslint-disable */

import { GraphQLClient } from 'graphql-request';
import { GetAccessToken, isValidToken, setSession } from './auth';
import { CONFIG } from 'src/config-global';

class gqlClient extends GraphQLClient {
  auth: boolean;

  constructor(auth: boolean = true) {
    super(`${CONFIG.app.graphqlPath}/query`);
    this.auth = auth;
    if (auth) {
      const token = GetAccessToken();
      if (token === null) {
        return;
      }
      if (isValidToken(token)) {
        this.setHeader('Authorization', `Bearer ${token}`);
      } else {
        this.setHeader('Authorization', `Bearer`);
        // this.handleLogout();
      }
    }
  }

  attachAuth = () => {
    const token = GetAccessToken();
    if (token === null) {
      return;
    }
    this.setHeader('Authorization', `Bearer ${token}`);
  };

  detachAuth = () => {
    this.setHeader('Authorization', '');
  };

  handleLogout = () => {
    try {
      setSession(null);
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  };
}

export default gqlClient;
