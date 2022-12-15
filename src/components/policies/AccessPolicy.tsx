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

import { Autocomplete, Box, Button, debounce, FormControlLabel, Grid, Radio, RadioGroup, Stack } from '@mui/material';
import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  Input,
  SelectList,
  Typography,
} from 'cx-portal-shared-components';
import { ChangeEvent, useState } from 'react';

import { addBpn, deleteBpn, setAccessType, setInputBpn } from '../../features/policies/slice';
import { ILegalEntityContent, IntOption } from '../../models/ConsumerContractOffers';
import ConsumerService from '../../services/ConsumerService';
import { setFfilterCompanyOptionsLoading, setFilterCompanyOptions } from '../../store/consumerSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

const ITEMS = [
  {
    id: 1,
    title: 'Company Name',
    value: 'company',
  },
  {
    id: 2,
    title: 'Business Partner Number',
    value: 'bpn',
  },
];

export default function AccessPolicy() {
  const { accessType, bpnList, inputBpn } = useAppSelector(state => state.accessUsagePolicySlice);
  const { filterCompanyOptions, filterCompanyOptionsLoading } = useAppSelector(state => state.consumerSlice);
  const [searchFilterByType, setsearchFilterByType] = useState<string>('');
  const [dialogOpen, setdialogOpen] = useState(false);
  const dispatch = useAppDispatch();

  const showAddDialog = () => {
    setdialogOpen(prev => !prev);
  };

  const handleAccessTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newAccessType = event.target.value;
    dispatch(setAccessType(newAccessType));
    if (newAccessType === 'unrestricted') showAddDialog();
  };

  // get company name on input change
  const onChangeSearchInputValue = async (params: string) => {
    const searchStr = params.toLowerCase();
    if (searchStr.length > 2) {
      dispatch(setFilterCompanyOptions([]));
      dispatch(setFfilterCompanyOptionsLoading(true));
      const res: [] = await ConsumerService.getInstance().searchLegalEntities(searchStr);
      dispatch(setFfilterCompanyOptionsLoading(false));
      if (res.length > 0) {
        const filterContent = res.map((item: ILegalEntityContent, index) => {
          return {
            _id: index,
            bpn: item.bpn,
            value: item.name,
          };
        });
        dispatch(setFilterCompanyOptions(filterContent));
      }
    } else {
      dispatch(setFilterCompanyOptions([]));
    }
  };

  const handleSearchTypeChange = (value: string) => {
    setsearchFilterByType(value);
  };

  return (
    <>
      <Typography>ACCESS POLICY</Typography>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={accessType}
        onChange={handleAccessTypeChange}
      >
        <FormControlLabel sx={{ mt: 2 }} value="restricted" control={<Radio />} label="Restricted access" />
        {accessType === 'restricted' && (
          <>
            <Grid container spacing={2} alignItems="end">
              <Grid item xs={5}>
                <SelectList
                  keyTitle="title"
                  label="Select Search Type"
                  fullWidth
                  size="small"
                  onChangeItem={e => handleSearchTypeChange(e ? e.value : '')}
                  items={ITEMS}
                  defaultValue={ITEMS[0]}
                  disableClearable={true}
                  placeholder="Select Search Type"
                  value={searchFilterByType}
                  hiddenLabel
                />
              </Grid>
              <Grid item xs={5}>
                {searchFilterByType === 'bpn' ? (
                  <Input
                    label="Enter BPN"
                    placeholder="Enter BPN"
                    size="small"
                    value={inputBpn}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setInputBpn(e.target.value))}
                  />
                ) : (
                  <Autocomplete
                    options={filterCompanyOptions}
                    includeInputInList
                    loading={filterCompanyOptionsLoading}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e, value: any) => dispatch(setInputBpn(value.bpn))}
                    onInputChange={debounce((event, newInputValue) => {
                      onChangeSearchInputValue(newInputValue);
                    }, 1000)}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    getOptionLabel={option => {
                      return typeof option === 'string' ? option : `${option.value}`;
                    }}
                    renderInput={params => (
                      <Input {...params} label="Select a company name" placeholder="Search company name" fullWidth />
                    )}
                    renderOption={(props, option: IntOption) => (
                      <Box
                        component="li"
                        {...props}
                        key={option.bpn}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'initial!important',
                          justifyContent: 'initial',
                        }}
                      >
                        <Typography variant="subtitle1">{option.value}</Typography>
                        <Typography variant="subtitle2">{option.bpn}</Typography>
                      </Box>
                    )}
                  />
                )}
              </Grid>
              <Grid item>
                <Button variant="contained" sx={{ marginLeft: 1 }} onClick={() => dispatch(addBpn())}>
                  Add
                </Button>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                <i>Note: Your own organization will always be allowed to access the data</i>
              </Typography>
              <Stack direction="row" spacing={1} mt={bpnList.length ? 3 : 0} sx={{ flexWrap: 'wrap', gap: 1 }}>
                {bpnList.map((bpnNum: string, key: number) => (
                  <Chip color="secondary" label={bpnNum} key={key} onClick={() => dispatch(deleteBpn(bpnNum))} />
                ))}
              </Stack>
            </Box>
          </>
        )}
        <FormControlLabel sx={{ mt: 2 }} value="unrestricted" control={<Radio />} label="Unrestricted access" />
      </RadioGroup>
      <hr style={{ marginBottom: 50, marginTop: 30 }} />
      <Dialog open={dialogOpen}>
        <DialogHeader title="Unrestricted Access!" />
        <DialogContent>
          Warning! Selecting this option will make your data available to every company in the Catena-X network. Are you
          sure?
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              dispatch(setAccessType('restricted'));
              showAddDialog();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(setAccessType('unrestricted'));
              showAddDialog();
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
