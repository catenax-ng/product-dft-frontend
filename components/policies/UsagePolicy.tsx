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

import { Box } from '@mui/material';
import {
  setCustom,
  setCustomValue,
  setDuration,
  setDurationValue,
  setPurpose,
  setPurposeValue,
  setRole,
  setRoleValue,
} from '../../store/accessUsagePolicySlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import UsagePolicyItem from './UsagePolicyItem';

export default function UsagePolicy() {
  const { duration, durationValue, purpose, purposeValue, role, roleValue, custom, customValue } = useAppSelector(
    state => state.accessUsagePolicySlice,
  );
  const dispatch = useAppDispatch();

  return (
    <>
      <p>
        <b className="text-[#444444] mb-2">USAGE POLICY</b>
      </p>
      <Box sx={{ mt: 2 }}>
        <UsagePolicyItem
          restrictionType={duration}
          setRestrictionType={e => dispatch(setDuration(e))}
          constraintType="Duration"
          displayText="Usage allowed from contract start  "
          inputFreeText={durationValue}
          setInputFreeText={e => dispatch(setDurationValue(e))}
        />
      </Box>
      <Box sx={{ mt: 4 }}>
        <UsagePolicyItem
          restrictionType={purpose}
          setRestrictionType={e => dispatch(setPurpose(e))}
          constraintType="Purpose"
          displayText="Usage allowed only for the purpose "
          inputFreeText={purposeValue}
          setInputFreeText={e => dispatch(setPurposeValue(e))}
        />
      </Box>
      <Box sx={{ mt: 4 }}>
        <UsagePolicyItem
          restrictionType={role}
          setRestrictionType={e => dispatch(setRole(e))}
          constraintType="Role"
          displayText="Usage allowed only by individuals with the following roles/characteristics "
          inputFreeText={roleValue}
          setInputFreeText={e => dispatch(setRoleValue(e))}
        />
      </Box>
      <Box sx={{ mt: 4 }}>
        <UsagePolicyItem
          restrictionType={custom}
          setRestrictionType={e => dispatch(setCustom(e))}
          constraintType="Custom"
          displayText="Usage must comply to the following additional conditions "
          inputFreeText={customValue}
          setInputFreeText={e => dispatch(setCustomValue(e))}
        />
      </Box>
    </>
  );
}
