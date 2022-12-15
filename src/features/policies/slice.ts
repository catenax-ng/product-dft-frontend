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

import { Config } from '../../utils/config';

// Define a type for the slice state
interface IAccessPolicyState {
  uploadUrl: string;
  uploadData: unknown;
  uploadType: string;
  openDialog: boolean;
  accessType: string;
  bpnList: Array<string>;
  inputBpn: string;
  companyBpn: string;
  duration: string;
  purpose: string;
  role: string;
  custom: string;
  durationValue: string;
  purposeValue: string;
  roleValue: string;
  customValue: string;
  durationUnit: string;
  showValidationError: boolean;
}

// Define the initial state using that type
const initialState: IAccessPolicyState = {
  uploadUrl: '',
  uploadData: '',
  uploadType: '',
  openDialog: false,
  accessType: 'restricted',
  bpnList: [],
  inputBpn: '',
  companyBpn: Config.REACT_APP_DEFAULT_COMPANY_BPN,
  duration: 'UNRESTRICTED',
  purpose: 'UNRESTRICTED',
  role: 'UNRESTRICTED',
  custom: 'UNRESTRICTED',
  durationValue: '',
  purposeValue: '',
  roleValue: '',
  customValue: '',
  durationUnit: 'HOUR',
  showValidationError: true,
};

export const accessUsagePolicySlice = createSlice({
  name: 'accessUsagePolicySlice',
  initialState,
  reducers: {
    setAccessType: (state, action: PayloadAction<string>) => {
      state.accessType = action.payload;
    },
    setInputBpn: (state, action: PayloadAction<string>) => {
      state.inputBpn = action.payload;
    },
    addBpn: state => {
      if (state.inputBpn) {
        state.bpnList = [...state.bpnList, state.inputBpn];
        state.inputBpn = '';
      }
    },
    deleteBpn: (state, action: PayloadAction<string>) => {
      state.bpnList = state.bpnList.filter(item => item !== action.payload);
    },
    setDuration: (state, action: PayloadAction<string>) => {
      state.duration = action.payload;
    },
    setPurpose: (state, action: PayloadAction<string>) => {
      state.purpose = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setCustom: (state, action: PayloadAction<string>) => {
      state.custom = action.payload;
    },
    setDurationValue: (state, action: PayloadAction<string>) => {
      state.durationValue = action.payload;
    },
    setDurationUnit: (state, action: PayloadAction<string>) => {
      state.durationUnit = action.payload;
    },
    setPurposeValue: (state, action: PayloadAction<string>) => {
      state.purposeValue = action.payload;
    },
    setRoleValue: (state, action: PayloadAction<string>) => {
      state.roleValue = action.payload;
    },
    setCustomValue: (state, action: PayloadAction<string>) => {
      state.customValue = action.payload;
    },
    handleDialogOpen: (state, action: PayloadAction<{ data?: unknown; url?: string; type?: string }>) => {
      state.openDialog = true;
      state.uploadUrl = action.payload.url;
      state.uploadData = action.payload.data;
      state.uploadType = action.payload.type;
    },
    handleDialogClose: state => Object.assign(state, initialState),
    checkFieldValidations: state => {
      const durationCheck = state.duration === 'RESTRICTED' && state.durationValue === '';
      const purposeCheck = state.purpose === 'RESTRICTED' && state.purposeValue === '';
      const roleCheck = state.role === 'RESTRICTED' && state.roleValue === '';
      if (durationCheck || purposeCheck || roleCheck) {
        state.showValidationError = true;
      } else {
        state.showValidationError = false;
      }
    },
  },
});

export const {
  setAccessType,
  setInputBpn,
  addBpn,
  deleteBpn,
  handleDialogOpen,
  handleDialogClose,
  setDuration,
  setDurationValue,
  setDurationUnit,
  setPurpose,
  setPurposeValue,
  setCustom,
  setCustomValue,
  setRole,
  setRoleValue,
  checkFieldValidations,
} = accessUsagePolicySlice.actions;

export default accessUsagePolicySlice.reducer;
