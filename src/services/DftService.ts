/* eslint-disable @typescript-eslint/no-explicit-any */
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

import HttpService from './HttpService';
class DftService extends HttpService {
  public constructor() {
    super({});
  }

  private static classInstance?: DftService;

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new DftService();
    }
    return this.classInstance;
  }

  public async getReportById(id: string) {
    const res = await this.instance({
      method: 'GET',
      url: `/processing-report/${id}`,
    });
    return res;
  }

  public async getUploadHistory(params: unknown) {
    const res = await this.instance({
      method: 'GET',
      url: '/processing-report',
      params,
    });
    return res;
  }

  public async uploadData(data: FormData) {
    const res = await this.instance({
      method: 'POST',
      url: '/upload',
      data,
    });
    return res;
  }

  public async submitSubmodalData(url: string, data: unknown) {
    const res = await this.instance({
      method: 'POST',
      url,
      data,
    });
    return res;
  }

  public async fetchConsumerDataOffers(providerUrl: string) {
    const res = await this.instance({
      method: 'GET',
      url: `/query-data-offers?providerUrl=${providerUrl}`,
    });
    return res;
  }

  public async subscribeToOffers(offers: unknown) {
    const res = await this.instance({
      method: 'POST',
      url: '/subscribe-data-offers',
      data: offers,
    });
    return res;
  }

  // Get company name by free text
  public async searchLegalEntities(searchStr: string) {
    const res = await this.instance({
      method: 'GET',
      url: `/legal-entities?searchText=${searchStr}&page=0&size=40`,
    });
    return res.data;
  }

  // Get connectors by bpn number
  public async searchConnectoByBPN(payload: string[]) {
    const res = await this.instance({
      method: 'POST',
      url: '/connectors-discovery',
      data: payload,
    });
    return res.data;
  }

  public async getContractAgreementsList(offSet: number, maxLimit: number) {
    const res = await this.instance({
      method: 'GET',
      url: `/contract-offers?offset=${offSet}&limit=${maxLimit}`,
    });
    return res;
  }
}

export default DftService;
