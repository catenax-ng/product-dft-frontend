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

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid, Divider } from '@mui/material';
import { IConsumerDataOffers } from '../models/ConsumerContractOffers';

interface IntDialogProps {
  open: boolean;
  offerObj?: IConsumerDataOffers;
  handleButtonEvent?: (flag: string) => void;
  isMultiple?: boolean;
}

const OfferDetailsDialog: React.FC<IntDialogProps> = ({ open, offerObj, handleButtonEvent, isMultiple }) => {
  const [offer] = useState(offerObj);

  const { typeOfAccess, bpnNumbers, title, created, description, publisher, usagePolicies, fileContentType } = offer;

  const closeModal = (flag: string) => {
    handleButtonEvent(flag);
  };

  function splitWithFirstOcc(str: string) {
    const regX = /:(.*)/s;
    return str.split(regX);
  }

  return (
    <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={() => closeModal('close')}>
      <DialogTitle>Offer Details</DialogTitle>
      {isMultiple ? (
        <>
          <DialogContent dividers>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ mb: 1, display: 'block' }}>
                  Usage Policy
                </Typography>
              </Grid>
              {usagePolicies.map((item, index) => {
                return (
                  <Grid item xs={6} sx={{ mb: 1 }} key={index}>
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                      {item.type.toLowerCase()}
                    </Typography>
                    <Typography variant="body2">
                      Type:
                      <strong>{item.typeOfAccess}</strong>
                    </Typography>

                    {item.typeOfAccess.toLowerCase() !== 'unrestricted' && (
                      <>
                        <Typography variant="body2">
                          Value:
                          <strong>{item.value || '-'}</strong>
                        </Typography>
                      </>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogContent dividers>
            <Grid container>
              <Grid item xs={6} sx={{ mb: 1 }}>
                <Typography variant="body2">Title</Typography>
                <Typography variant="body2">
                  <strong>{title || '-'}</strong>
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ mb: 1 }}>
                <Typography variant="body2">Creation Date</Typography>
                <Typography variant="body2">
                  <strong>{created || '-'}</strong>
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ mb: 1 }}>
                <Typography variant="body2">Data Format</Typography>
                <Typography variant="body2">
                  <strong>{fileContentType || '-'}</strong>
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ mb: 1 }}>
                <Typography variant="body2">Description</Typography>
                <Typography variant="body2">
                  <strong>{description || '-'}</strong>
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ mb: 1 }}>
                <Typography variant="body2">Publisher</Typography>
                <Typography variant="body2">
                  <strong>{splitWithFirstOcc(publisher)[0] || '-'}</strong>
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ mb: 1 }}>
                <Typography variant="body2">Publisher URL</Typography>
                <Typography variant="body2">
                  <strong>{splitWithFirstOcc(publisher)[1] || '-'}</strong>
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ m: 1 }} />
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ mb: 1, display: 'block' }}>
                  Access Type
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Type</Typography>
                <Typography variant="body2">
                  <strong>{typeOfAccess}</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {typeOfAccess.toLowerCase() !== 'unrestricted' && (
                  <>
                    <Typography variant="body2">BPN Numbers</Typography>
                    <Typography variant="body2" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {bpnNumbers.map((i, k) => {
                        return (
                          <strong key={k}>
                            {k !== 0 ? ', ' : ''} {i}
                          </strong>
                        );
                      })}
                    </Typography>
                  </>
                )}
              </Grid>
            </Grid>

            <Divider sx={{ m: 1 }} />
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ mb: 1, display: 'block' }}>
                  Usage Policy
                </Typography>
              </Grid>
              {usagePolicies.map((item, index) => {
                return (
                  <Grid item xs={6} sx={{ mb: 1 }} key={index}>
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                      {item.type.toLowerCase()}
                    </Typography>
                    <Typography variant="body2">
                      Type:
                      <strong>{item.typeOfAccess}</strong>
                    </Typography>

                    {item.typeOfAccess.toLowerCase() !== 'unrestricted' && (
                      <>
                        <Typography variant="body2">
                          Value:
                          <strong>
                            {item.type.toLowerCase() === 'duration'
                              ? `${item.value} ${item.durationUnit}` || '-'
                              : item.value || '-'}
                          </strong>
                        </Typography>
                      </>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </DialogContent>
        </>
      )}
      <DialogActions>
        <Button variant="outlined" onClick={() => closeModal('close')}>
          Close
        </Button>
        <Button variant="contained" onClick={() => closeModal('subscribe')}>
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OfferDetailsDialog;
