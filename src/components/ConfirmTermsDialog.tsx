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

import { Box, Checkbox, CircularProgress, FormControlLabel } from '@mui/material';
import { Button, Dialog, DialogActions, DialogContent, DialogHeader } from 'cx-portal-shared-components';
import React, { useState } from 'react';

import { IConsumerDataOffers } from '../models/ConsumerContractOffers';

interface IntConfirmOffer {
  offers?: IConsumerDataOffers[] | [];
  offerCount?: number;
  provider: string;
}
interface IntDialogProps {
  title?: string;
  open: boolean;
  handleButtonEvent?: (type: string) => void;
  isProgress?: boolean;
  offerObj?: IntConfirmOffer;
}

const ConfirmTermsDialog: React.FC<IntDialogProps> = ({
  title = 'Confirm',
  open = false,
  handleButtonEvent,
  isProgress = false,
  children,
  offerObj,
}) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleButton = (type: string) => {
    handleButtonEvent(type);
  };

  function splitWithFirstOcc(str: string) {
    const regX = /:(.*)/s;
    return str.split(regX);
  }

  return (
    <Dialog open={open}>
      <DialogHeader closeWithIcon onCloseWithIcon={() => handleButton('close')} title={title} />
      <DialogContent dividers sx={{ py: 3 }}>
        {children ? (
          children
        ) : (
          <>
            <Box sx={{ mb: 1 }}>
              {offerObj?.offerCount !== 0 && (
                <p>
                  <strong>{offerObj.offerCount} contract offers</strong> will be affected by this operation.
                </p>
              )}
              <p>
                You are about to enter a legally binding contract agreement for this Contract Offer with provider
                {offerObj ? (
                  <strong style={{ margin: '0 5px' }}>{`${splitWithFirstOcc(offerObj.provider)[0]}.` || '-.'}</strong>
                ) : (
                  '-.'
                )}
              </p>
              <p>Please confirm that:</p>
            </Box>
            <p>(1) You are entitled to represent your organization.</p>
            <p>(2) You have read and understood the access/usage policy.</p>
            <p>(3) Your organization will be responsible to adhere by the rules stated in the access/usage policy.</p>
            <FormControlLabel
              control={<Checkbox checked={isAgreed} onChange={() => setIsAgreed(!isAgreed)} name="gilad" />}
              label="I agree"
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" disabled={isProgress} onClick={() => handleButton('close')}>
          Cancel
        </Button>
        <Button variant="contained" disabled={isProgress || !isAgreed} onClick={() => handleButton('confirm')}>
          {isProgress ? 'Loading..' : 'Confirm'}
          {isProgress && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmTermsDialog;
