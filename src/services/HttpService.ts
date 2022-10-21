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

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { toastProps } from '../helpers/ToastOptions';
import { setLoggedInUser } from '../store/appSlice';
import { store } from '../store/store';
import { HOST } from './ApiHelper';
import UserService from './UserService';

abstract class HttpService {
  protected readonly instance: AxiosInstance;

  public constructor(requestConfig: AxiosRequestConfig) {
    this.instance = axios.create(requestConfig);
    this.instance.interceptors.request.use(request => {
      request.baseURL = HOST;
      if (UserService.isLoggedIn()) {
        const cb = () => {
          store.dispatch(setLoggedInUser(UserService.getLoggedUser()));
          request.headers.Authorization = `Bearer ${UserService.getToken()}`;
          return Promise.resolve(request);
        };
        return UserService.updateToken(cb);
      }
    });

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        toast.error('Something went wrong!', toastProps());
        Promise.reject(error.response);
      },
    );
  }
}

export default HttpService;
