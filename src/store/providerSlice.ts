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

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProcessReport, Status } from '../models/ProcessReport';

interface IProviderSlice {
  currentUploadData: ProcessReport;
  uploadStatus: boolean;
  selectedFiles: File[];
}

const initialState: IProviderSlice = {
  currentUploadData: {
    processId: '',
    referenceProcessId: '',
    csvType: '',
    numberOfItems: 0,
    numberOfCreatedItems: 0,
    numberOfUpdatedItems: 0,
    numberOfDeletedItems: 0,
    numberOfFailedItems: 0,
    numberOfSucceededItems: 0,
    status: Status.inProgress,
    startDate: '',
    endDate: undefined,
  },
  uploadStatus: false,
  selectedFiles: [],
};
export const providerSlice = createSlice({
  name: 'providerSlice',
  initialState,
  reducers: {
    setUploadData: (state, action: PayloadAction<ProcessReport>) => {
      state.currentUploadData = action.payload;
    },
    setUploadStatus: (state, action: PayloadAction<boolean>) => {
      state.uploadStatus = action.payload;
    },
    setSelectedFiles: (state, action: PayloadAction<File>) => {
      state.selectedFiles = [action.payload];
    },
    removeSelectedFiles: state => {
      state.selectedFiles = [];
      state.uploadStatus = false;
    },
  },
});

export const { setUploadData, setSelectedFiles, setUploadStatus, removeSelectedFiles } = providerSlice.actions;
export default providerSlice.reducer;
