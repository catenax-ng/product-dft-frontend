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

import { Dialog, DialogTitle, DialogContent, Box, DialogActions, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { toastProps } from '../../helpers/ToastOptions';
import { Status, CsvTypes, ProcessReport } from '../../models/ProcessReport';
import DftService from '../../services/DftService';
import { handleDialogClose } from '../../store/accessUsagePolicySlice';
import { setPageLoading } from '../../store/appSlice';
import { setUploadData, setUploadStatus } from '../../store/providerSlice';
import { useAppSelector, useAppDispatch } from '../../store/store';
import AccessPolicy from './AccessPolicy';
import UsagePolicy from './UsagePolicy';

const defaultUploadData: ProcessReport = {
  processId: '',
  csvType: CsvTypes.unknown,
  numberOfItems: 0,
  numberOfFailedItems: 0,
  numberOfSucceededItems: 0,
  status: Status.inProgress,
  startDate: '',
  endDate: undefined,
};

export default function PoliciesDialog() {
  const {
    openDialog,
    accessType,
    bpnList,
    companyBpn,
    uploadUrl,
    uploadData,
    uploadType,
    duration,
    durationValue,
    durationUnit,
    purpose,
    purposeValue,
    role,
    roleValue,
    custom,
    customValue,
  } = useAppSelector(state => state.accessUsagePolicySlice);
  const { currentUploadData, selectedFiles } = useAppSelector(state => state.providerSlice);
  const [showError, setshowError] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const durationCheck = duration === 'RESTRICTED' && durationValue === '';
    const purposeCheck = purpose === 'RESTRICTED' && purposeValue === '';
    const roleCheck = role === 'RESTRICTED' && roleValue === '';
    setshowError(() => durationCheck || purposeCheck || roleCheck);
    return () => {};
  }, [duration, durationValue, purpose, purposeValue, role, roleValue]);

  const clearUpload = () => {
    dispatch(setPageLoading(false));
    dispatch(setUploadStatus(true));
    dispatch(setPageLoading(false));
    dispatch(handleDialogClose());
  };

  const processingReport = (r: { data: ProcessReport }, processId: string) => {
    dispatch(setUploadData(r.data));
    if (r?.data?.status !== Status.completed && r?.data?.status !== Status.failed) {
      // if status !== 'COMPLETED' && status !== 'FAILED' -> set interval with 2 seconds to refresh data
      const interval = setInterval(
        () =>
          DftService.getInstance()
            .getReportById(processId)
            .then(result => {
              dispatch(setUploadData(result.data));
              if (result?.data?.status === Status.completed || result.data.status === Status.failed) {
                clearInterval(interval);
                clearUpload();
              }
            }),
        2000,
      );
    } else {
      clearUpload();
      dispatch(setUploadData(defaultUploadData));
      if (r?.data?.status === Status.completed && r?.data?.numberOfFailedItems === 0) {
        toast.success('Upload completed!', toastProps());
      } else if (r?.data?.status === Status.completed && r?.data?.numberOfFailedItems > 0) {
        toast.warning('Upload completed with warnings!', toastProps());
      } else {
        toast.error('Upload failed!', toastProps());
      }
    }
  };

  const processingReportFirstCall = (processId: string) => {
    setTimeout(async () => {
      DftService.getInstance()
        .getReportById(processId)
        .then(response => {
          processingReport(response, processId);
        })
        .catch(error => {
          // if process id not ready - repeat request
          if (error.response.status === 404) {
            processingReportFirstCall(processId);
          } else {
            clearUpload();
          }
        });
    }, 2000);
  };

  const payload = {
    bpn_numbers: accessType === 'restricted' ? [companyBpn, ...bpnList] : [],
    type_of_access: accessType,
    row_data: uploadData,
    usage_policy: [
      {
        type: 'DURATION',
        typeOfAccess: duration,
        value: durationValue,
        durationUnit: durationUnit,
      },
      {
        type: 'ROLE',
        typeOfAccess: role,
        value: roleValue,
      },
      {
        type: 'PURPOSE',
        typeOfAccess: purpose,
        value: purposeValue,
      },
      {
        type: 'CUSTOM',
        typeOfAccess: custom,
        value: customValue,
      },
    ],
  };
  const submitData = async () => {
    try {
      dispatch(setPageLoading(true));
      const response = await DftService.getInstance().submitSubmodalData(uploadUrl, payload);
      // first call
      processingReportFirstCall(response.data);
    } catch (error) {
      dispatch(setUploadData({ ...currentUploadData, status: Status.failed }));
      clearUpload();
    }
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', selectedFiles[0]);
    formData.append('meta_data', JSON.stringify(payload));

    try {
      dispatch(setPageLoading(true));
      const resp = await DftService.getInstance().uploadData(formData);
      const processId = resp.data;
      // first call
      processingReportFirstCall(processId);
    } catch (error) {
      dispatch(setUploadData({ ...currentUploadData, status: Status.failed }));
      clearUpload();
    }
  };

  function handleSubmitData() {
    if (showError) return;
    switch (uploadType) {
      case 'file':
        uploadFile();
        break;
      case 'json':
        submitData();
        break;
      default:
        break;
    }
  }

  return (
    <Dialog
      open={openDialog}
      onClose={() => dispatch(handleDialogClose())}
      sx={{ '&.MuiModal-root': { zIndex: 100 }, '& .MuiDialog-paper': { width: '450px' } }}
    >
      <DialogTitle>
        <b>Policies</b>
      </DialogTitle>
      <DialogContent>
        <Box>
          <AccessPolicy />
        </Box>
        <Box>
          <UsagePolicy />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" sx={{ mr: 2 }} onClick={() => dispatch(handleDialogClose())}>
          Close
        </Button>
        <Button variant="contained" onClick={handleSubmitData}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
