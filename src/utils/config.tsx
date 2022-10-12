/********************************************************************************
 * Copyright (c) 2021,2022 T-Systems International GmbH
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const win = window as any;
const envSettings = win._env_;

export class Config {
  static REACT_APP_API_URL = envSettings?.REACT_APP_API_URL;

  static REACT_APP_FILESIZE = envSettings?.REACT_APP_FILESIZE;

  static REACT_APP_DEFAULT_COMPANY_BPN = envSettings?.REACT_APP_DEFAULT_COMPANY_BPN;

  static REACT_APP_CLIENT_ID = envSettings?.REACT_APP_CLIENT_ID;

  static REACT_APP_KEYCLOAK_URL = envSettings?.REACT_APP_KEYCLOAK_URL;

  static REACT_APP_KEYCLOAK_REALM = envSettings?.REACT_APP_KEYCLOAK_REALM;
}
