/* eslint-disable */

import { GraphQLClient } from 'graphql-request';
import { CONFIG } from 'src/config-global';
import { GetAccessToken, isValidToken, setSession } from './auth';
import { uuidv4 } from './uuidv4';

class GqlClient extends GraphQLClient {
  auth: boolean;

  constructor(props?: { auth?: boolean; module?: string }) {
    const mod = () => {
      if (Boolean(props?.module)) {
        return `/${props?.module}/`;
      }

      return `/`;
    };

    super(`${CONFIG.app.graphqlPath}${mod()}query`);

    this.auth = props?.auth ?? true;

    this.setHeader('X-Request-Id', uuidv4());

    if (props?.auth ?? true) {
      const token = GetAccessToken();

      if (token === null) {
        return;
      }

      if (isValidToken(token)) {
        this.attachAuth();
      } else {
        this.handleLogout();
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

export default GqlClient;
