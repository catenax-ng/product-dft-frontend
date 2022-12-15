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

import { configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import appSlice from '../features/app/slice';
import notificationSlice from '../features/notifiication/slice';
import accessUsagePolicySlice from '../features/policies/slice';
import submodelSlice from '../features/submodels/slice';
import consumerSlice from './consumerSlice';
import providerSlice from './providerSlice';

export const reducers = {
  appSlice: appSlice,
  accessUsagePolicySlice: accessUsagePolicySlice,
  providerSlice: providerSlice,
  consumerSlice: consumerSlice,
  notificationSlice: notificationSlice,
  submodelSlice: submodelSlice,
};

export const store = configureStore({
  reducer: {
    appSlice: appSlice,
    accessUsagePolicySlice: accessUsagePolicySlice,
    providerSlice: providerSlice,
    consumerSlice: consumerSlice,
    notificationSlice: notificationSlice,
    submodelSlice: submodelSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
