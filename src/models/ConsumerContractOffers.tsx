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
export interface IUsageControl {
  type: string;
  typeOfAccess: string;
  value?: string;
  durationUnit?: string | Record<string, never>;
}
export interface IConsumerDataOffers {
  // connectorOfferid same assetId
  connectorOfferid?: string;
  assetId?: string;
  // end assetId
  connectorId?: string;
  connectorOfferUrl?: string;
  title: string;
  version: string;
  description: string;
  created: string;
  modified: string;
  publisher: string;
  offerInfo?: string;
  policyId?: string;
  typeOfAccess: string;
  bpnNumbers: string[];
  // contractInfo and offerID same
  contractInfo?: string;
  offerId?: string;
  // end offerId
  usagePolicies: IUsageControl[];
  fileName?: string;
  fileContentType?: string;
}
export interface ILegalEntityName {
  value?: string;
  shortname?: string | null;
  type?: unknown;
  language?: unknown;
}
export interface ILegalentity {
  bpn?: string;
  identifiers?: unknown[];
  names?: ILegalEntityName[];
  legalForm?: null | unknown;
  status?: null | unknown;
}
export interface ILegalEntityContent {
  score?: number;
  legalEntity?: ILegalentity;
  name?: string;
  bpn?: string;
}
export interface ILegalEntity {
  totalElements?: number;
  totalPages?: number;
  page?: number;
  contentSize?: number;
  content?: ILegalEntityContent[];
}
export interface IntOption {
  _id: number | string;
  bpn: string;
  value: string;
}
export interface IConnectorResponse {
  bpn: string;
  connectorEndpoint: string[];
}
export interface IContractAgreementInfo {
  contractSigningDate: number | Date;
  contractStartDate: number | Date;
  contractEndDate: number | Date;
  assetId: string;
  policies: IUsageControl[];
}
export interface IContractAgreements {
  negotiationId: string;
  counterPartyAddress: string;
  state: string;
  title: string;
  organizationName: string;
  contractAgreementId?: string;
  contractAgreementInfo?: IContractAgreementInfo;
  dateCreated: number;
  dateUpdated: number;
}
