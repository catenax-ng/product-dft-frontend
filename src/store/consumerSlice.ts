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

interface IConsumerSlice {
  offersLoading: boolean;
  contractOffers: IConsumerDataOffers[];
  selectedOffersList: IConsumerDataOffers[];
  selectedOffer: IConsumerDataOffers;
  isMultipleContractSubscription: boolean;
  contractAgreements: IContractAgreements[];
  isContractAgreementsLoading: boolean;
}

const initialState: IConsumerSlice = {
  offersLoading: false,
  contractOffers: [],
  selectedOffersList: [],
  selectedOffer: null,
  isMultipleContractSubscription: false,
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
  setContractAgreements,
  setIsContractAgreementsLoading,
} = consumerSlice.actions;
export default consumerSlice.reducer;
