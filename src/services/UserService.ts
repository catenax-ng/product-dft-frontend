/********************************************************************************
 * Copyright (c) 2021,2022 T-Systems International GmbH
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import Keycloak from 'keycloak-js';
import { setLoggedInUser } from '../store/appSlice';
import { store } from '../store/store';
import { IUser } from '../models/User';
import { getCentralIdp, getClientId, getClientRealm } from './EnvironmentService';
import { Config } from '../utils/config';

const keycloakConfig: Keycloak.KeycloakConfig = {
  url: getCentralIdp(),
  realm: getClientRealm(),
  clientId: getClientId(),
};

const KC = new Keycloak(keycloakConfig);

const doLogin = KC.login;

const doLogout = KC.logout;

const getToken = () => KC.token;

const getParsedToken = () => KC.tokenParsed;

const updateToken = (successCallback?: () => void) => KC.updateToken(5).then(successCallback).catch(doLogin);

const getUsername = () => KC.tokenParsed.preferred_username;

const getName = () => KC.tokenParsed?.name;

const getEmail = () => KC.tokenParsed?.email;

const getCompany = () => KC.tokenParsed?.organisation;

const getTenant = () => KC.tokenParsed?.tenant;

const hasRole = (roles: string[]) => roles.some((role: string) => KC.hasRealmRole(role));

const isLoggedIn = () => !!KC.token;

const getRoles = () => KC.tokenParsed?.resource_access[keycloakConfig.clientId]?.roles;

const getLoggedUser = () => ({
  userName: getUsername(),
  name: getName(),
  email: getEmail(),
  company: getCompany(),
  tenant: getTenant(),
  token: getToken(),
  parsedToken: getParsedToken(),
});

/**
 * Initializes Keycloak instance and calls the provided
 * callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */

const initKeycloak = (onAuthenticatedCallback: (loggedUser: IUser) => unknown) => {
  KC.init({
    onLoad: 'login-required',
    silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
    pkceMethod: 'S256',
  })
    .then(authenticated => {
      if (authenticated) {
        console.log(getParsedToken());
        console.log(`${getLoggedUser()} authenticated`);
        if (
          getLoggedUser()?.parsedToken?.resource_access &&
          Object.hasOwn(getLoggedUser()?.parsedToken?.resource_access, Config.REACT_APP_CLIENT_ID)
        ) {
          onAuthenticatedCallback(getLoggedUser());
          store.dispatch(setLoggedInUser(getLoggedUser()));
        } else {
          window.location.href = '/unknown-page.html';
        }
      } else {
        doLogin();
      }
    })
    .catch(console.error);
};

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  getEmail,
  hasRole,
  getLoggedUser,
  getRoles,
};

export default UserService;
