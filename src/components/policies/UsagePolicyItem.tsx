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

import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { setDurationUnit } from '../../store/accessUsagePolicySlice';
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
  const durationUnits = [
    {
      label: 'Hour',
      value: 'HOUR',
    },
    {
      label: 'Day',
      value: 'DAY',
    },
    {
      label: 'Month',
      value: 'MONTH',
    },
    {
      label: 'Year',
      value: 'YEAR',
    },
  ];
  function checkErrors() {
    if (constraintType === 'Duration') {
      console.log(constraintType);
      const result = /^[1-9]\d*$/.test(inputFreeText);
      console.log(result);
      return !result;
    } else if (restrictionType === 'RESTRICTED' && inputFreeText === '') {
      return true;
    }
  }
  return (
    <Box component="form" noValidate autoComplete="off">
      <FormLabel className="text-2xl text-[#444444] mb-4">
        <b>{constraintType} restriction</b>
      </FormLabel>
      <RadioGroup row value={restrictionType} onChange={e => setRestrictionType(e.target.value)}>
        <FormControlLabel value="UNRESTRICTED" control={<Radio />} label="Unrestricted" />
        <FormControlLabel value="RESTRICTED" control={<Radio />} label="Restricted" />
      </RadioGroup>

      <Box>
        {restrictionType === 'RESTRICTED' && (
          <>
            <FormLabel sx={{ my: 1, display: 'block' }}>{displayText}</FormLabel>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Enter a value"
                variant="outlined"
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
                <FormControl sx={{ minWidth: 80 }} size="small">
                  <Select
                    value={durationUnit}
                    onChange={e => {
                      dispatch(setDurationUnit(e.target.value));
                    }}
                  >
                    {durationUnits.map(item => (
                      <MenuItem key={item.label} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Stack>
          </>
        )}
      </Box>
    </Box>
  );
}
