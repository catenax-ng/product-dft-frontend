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
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChangeEvent } from 'react';
import Swal from 'sweetalert2';
import { addBpn, deleteBpn, setAccessType, setInputBpn } from '../../store/accessUsagePolicySlice';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { Config } from '../../utils/config';

export default function AccessPolicy() {
  const { accessType, bpnList, inputBpn } = useAppSelector(state => state.accessUsagePolicySlice);
  const dispatch = useAppDispatch();
  const defaultCompanyBPN = Config.REACT_APP_DEFAULT_COMPANY_BPN;

  const showAccessTypeChangeAlert = async () => {
    const result = await Swal.fire({
      title: 'Unrestricted Access!',
      html: '<p> Warning! Selecting this option will make your data available to every company in the Catena-X network. Are you sure? </p>',
      icon: 'warning',
      confirmButtonColor: '#01579b',
      showCancelButton: true,
    });
    if (result.dismiss === Swal.DismissReason.cancel) {
      dispatch(setAccessType('restricted'));
    }
  };
  const handleAccessTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newAccessType = event.target.value;
    dispatch(setAccessType(newAccessType));
    if (newAccessType === 'unrestricted') showAccessTypeChangeAlert();
  };

  return (
    <>
      <p>
        <b className="text-[#444444]">ACCESS POLICY</b>
      </p>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={accessType}
        onChange={handleAccessTypeChange}
      >
        <FormControlLabel className="py-2" value="restricted" control={<Radio />} label="Restricted access" />
        {accessType === 'restricted' && (
          <Box>
            <Grid item xs={12}>
              <TextField
                label="Enter BPN"
                variant="outlined"
                size="small"
                value={inputBpn}
                onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setInputBpn(e.target.value))}
              />
              <Button variant="contained" sx={{ marginLeft: 1 }} onClick={() => dispatch(addBpn())}>
                Add
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ maxWidth: 260, marginTop: 1 }}>
                <CardContent>
                  <List style={{ maxHeight: 200, overflow: 'auto' }} dense>
                    <ListItem divider disablePadding>
                      {defaultCompanyBPN}
                    </ListItem>
                    {bpnList.map((bpnNum: string, key: number) => (
                      <ListItem
                        divider
                        disablePadding
                        key={key}
                        secondaryAction={
                          bpnNum !== defaultCompanyBPN && (
                            <IconButton
                              onClick={() => dispatch(deleteBpn(bpnNum))}
                              edge="end"
                              aria-label="delete"
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          )
                        }
                      >
                        <ListItemText primary={bpnNum} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Box>
        )}
        <FormControlLabel className="py-2" value="unrestricted" control={<Radio />} label="Unrestricted access" />
      </RadioGroup>
      <hr style={{ marginBottom: 50 }} />
    </>
  );
}
