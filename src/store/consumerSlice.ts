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

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IConsumerDataOffers, IContractAgreements } from '../models/ConsumerContractOffers';

export interface IntOption {
  _id: number | string;
  bpn: string;
  value: string;
}

export interface IntConnectorItem {
  id: number;
  value: string;
}

interface IConsumerSlice {
  offersLoading: boolean;
  contractOffers: IConsumerDataOffers[];
  selectedOffersList: IConsumerDataOffers[];
  selectedOffer: IConsumerDataOffers;
  isMultipleContractSubscription: boolean;
  searchFilterByType: string;
  filterProviderUrl: string;
  filterCompanyOptions: IntOption[];
  filterCompanyOptionsLoading: boolean;
  filterSelectedCompanyOption: IntOption | null;
  filterSelectedBPN: string | null;
  filterConnectors: IntConnectorItem[];
  filterSelectedConnector: string;
  contractAgreements: IContractAgreements[];
  isContractAgreementsLoading: boolean;
}

const initialState: IConsumerSlice = {
  offersLoading: false,
  contractOffers: [],
  selectedOffersList: [],
  selectedOffer: null,
  isMultipleContractSubscription: false,
  // search filter
  searchFilterByType: 'company',
  filterProviderUrl: '',
  filterCompanyOptions: [],
  filterCompanyOptionsLoading: false,
  filterSelectedCompanyOption: null,
  filterSelectedBPN: '',
  filterConnectors: [],
  filterSelectedConnector: '',
  contractAgreements: [],
  isContractAgreementsLoading: false,
};

export const consumerSlice = createSlice({
  name: 'consumerSlice',
  initialState,
  reducers: {
    setOffersLoading: (state, action: PayloadAction<boolean>) => {
      state.offersLoading = action.payload;
    },
    setContractOffers: (state, action: PayloadAction<IConsumerDataOffers[]>) => {
      state.contractOffers = action.payload;
    },
    setSelectedOffersList: (state, action: PayloadAction<IConsumerDataOffers[]>) => {
      state.selectedOffersList = action.payload;
    },
    setSelectedOffer: (state, action: PayloadAction<IConsumerDataOffers>) => {
      state.selectedOffer = action.payload;
    },
    setIsMultipleContractSubscription: (state, action: PayloadAction<boolean>) => {
      state.isMultipleContractSubscription = action.payload;
    },
    setSearchFilterByType: (state, action: PayloadAction<string>) => {
      state.searchFilterByType = action.payload;
    },
    setFilterProviderUrl: (state, action: PayloadAction<string>) => {
      state.filterProviderUrl = action.payload;
    },
    setFilterCompanyOptions: (state, action: PayloadAction<IntOption[]>) => {
      state.filterCompanyOptions = action.payload;
    },
    setFfilterCompanyOptionsLoading: (state, action: PayloadAction<boolean>) => {
      state.filterCompanyOptionsLoading = action.payload;
    },
    setSelectedFilterCompanyOption: (state, action: PayloadAction<IntOption>) => {
      state.filterSelectedCompanyOption = action.payload;
    },
    setFilterSelectedBPN: (state, action: PayloadAction<string>) => {
      state.filterSelectedBPN = action.payload;
    },
    setFilterConnectors: (state, action: PayloadAction<IntConnectorItem[]>) => {
      state.filterConnectors = action.payload;
    },
    setFilterSelectedConnector: (state, action: PayloadAction<string>) => {
      state.filterSelectedConnector = action.payload;
    },
    setContractAgreements: (state, action: PayloadAction<IContractAgreements[]>) => {
      state.contractAgreements = action.payload;
    },
    setIsContractAgreementsLoading: (state, action: PayloadAction<boolean>) => {
      state.isContractAgreementsLoading = action.payload;
    },
  },
});

export const {
  setOffersLoading,
  setContractOffers,
  setSelectedOffersList,
  setSelectedOffer,
  setIsMultipleContractSubscription,
  setSearchFilterByType,
  setFilterProviderUrl,
  setFilterCompanyOptions,
  setFfilterCompanyOptionsLoading,
  setSelectedFilterCompanyOption,
  setFilterConnectors,
  setFilterSelectedConnector,
  setFilterSelectedBPN,
  setContractAgreements,
  setIsContractAgreementsLoading,
} = consumerSlice.actions;
export default consumerSlice.reducer;
