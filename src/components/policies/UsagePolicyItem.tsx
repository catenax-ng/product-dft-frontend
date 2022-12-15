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

import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from '@mui/material';
import { Input, SelectList } from 'cx-portal-shared-components';

import { setDurationUnit } from '../../features/policies/slice';
import { useAppDispatch, useAppSelector } from '../../store/store';

interface FreeTextProps {
  restrictionType: string;
  setRestrictionType: (restrictionType: string) => void;
  constraintType: string;
  displayText: string;
  inputFreeText: string;
  setInputFreeText: (freeText: string) => void;
}

export default function UsagePolicyItem({
  restrictionType,
  setRestrictionType,
  constraintType,
  displayText,
  inputFreeText,
  setInputFreeText,
}: FreeTextProps) {
  const { durationUnit } = useAppSelector(state => state.accessUsagePolicySlice);
  const dispatch = useAppDispatch();
  const DURATION_UNITS = [
    {
      id: 0,
      title: 'Hour',
      value: 'HOUR',
    },
    {
      id: 1,
      title: 'Day',
      value: 'DAY',
    },
    {
      id: 2,
      title: 'Month',
      value: 'MONTH',
    },
    {
      id: 3,
      title: 'Year',
      value: 'YEAR',
    },
  ];
  function checkErrors() {
    if (constraintType === 'Duration') {
      const result = /^[1-9]\d*$/.test(inputFreeText);
      return !result;
    } else if (restrictionType === 'RESTRICTED' && inputFreeText === '') {
      return true;
    }
  }
  return (
    <Box component="form" noValidate autoComplete="off">
      <FormLabel sx={{ mb: 2 }}>{constraintType} restriction</FormLabel>
      <RadioGroup row value={restrictionType} onChange={e => setRestrictionType(e.target.value)}>
        <FormControlLabel value="UNRESTRICTED" control={<Radio />} label="Unrestricted" />
        <FormControlLabel value="RESTRICTED" control={<Radio />} label="Restricted" />
      </RadioGroup>

      <Box>
        {restrictionType === 'RESTRICTED' && (
          <>
            <FormLabel sx={{ my: 1, display: 'block' }}>{displayText}</FormLabel>
            <Stack direction="row" alignItems={'flex-end'} spacing={2}>
              <Input
                label="Enter a value"
                placeholder="Enter a value"
                size="small"
                type={constraintType === 'Duration' ? 'number' : 'text'}
                InputProps={{
                  inputProps: { min: 1 },
                }}
                value={inputFreeText}
                required
                error={checkErrors()}
                onChange={e => {
                  setInputFreeText(e.target.value);
                }}
              />
              {constraintType === 'Duration' && (
                <FormControl sx={{ minWidth: 150 }} size="small">
                  {/* need to replace with cx-lib selectList */}
                  <SelectList
                    keyTitle="title"
                    value={durationUnit}
                    defaultValue={DURATION_UNITS[0]}
                    items={DURATION_UNITS}
                    label="Select Duraion"
                    placeholder="Select Duraion"
                    disableClearable={true}
                    onChangeItem={e => {
                      dispatch(setDurationUnit(e.value));
                    }}
                  />
                </FormControl>
              )}
            </Stack>
          </>
        )}
      </Box>
    </Box>
  );
}
