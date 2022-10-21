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

import React, { useEffect, useState } from 'react';
import { Box, Chip, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { Refresh } from '@mui/icons-material';
import { DataGrid, GridRenderCellParams, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { convertEpochToDate, epochToDate } from '../utils/utils';
import { styled } from '@mui/material/styles';
import styles from '../styles.module.scss';
import { useAppDispatch, useAppSelector } from '../store/store';
import DftService from '../services/DftService';
import { handleBlankCellValues, MAX_CONTRACTS_AGREEMENTS } from '../helpers/ConsumerOfferHelper';
import { setContractAgreements, setIsContractAgreementsLoading } from '../store/consumerSlice';
import { IContractAgreements } from '../models/ConsumerContractOffers';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorIcon from '@mui/icons-material/Error';

const ContractHistory: React.FC = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const { contractAgreements, isContractAgreementsLoading } = useAppSelector(state => state.consumerSlice);
  const dispatch = useAppDispatch();

  const renderContractAgreementStatus = (params: GridRenderCellParams) => {
    switch (params.value) {
      case 'CONFIRMED':
        return (
          <Chip
            color="success"
            icon={<CheckCircleIcon fontSize="small" />}
            title={params.value}
            label={params.value}
            variant="outlined"
          />
        );
      case 'DECLINED':
        return (
          <Chip
            color="error"
            icon={<CancelIcon fontSize="small" />}
            title={params.value}
            label={params.value}
            variant="outlined"
          />
        );
      case 'ERROR':
        return (
          <Chip
            color="warning"
            icon={<ErrorIcon fontSize="small" />}
            title={params.value}
            label={params.value}
            variant="outlined"
          />
        );
      default:
        return <Chip color="default" title={params.value} label={params.value} variant="outlined" />;
    }
  };
  const columns = [
    {
      field: 'contractAgreementId',
      width: 230,
      editable: false,
      headerName: 'Contract Agreement ID',
      renderHeader: () => <strong>Contract Agreement ID</strong>,
      valueGetter: (params: GridValueGetterParams) => handleBlankCellValues(params.row.contractAgreementId),
    },
    {
      field: 'contractAgreementInfo.assetId',
      width: 230,
      editable: false,
      headerName: 'Asset ID',
      renderHeader: () => <strong>Asset ID</strong>,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.contractAgreementInfo ? params.row.contractAgreementInfo?.assetId : '-',
    },
    {
      field: 'counterPartyAddress',
      width: 350,
      editable: false,
      headerName: 'Counter Party Address',
      renderHeader: () => <strong>Counter Party Address</strong>,
      valueGetter: (params: GridValueGetterParams) => handleBlankCellValues(params.row.counterPartyAddress),
    },
    {
      field: 'title',
      width: 100,
      editable: false,
      headerName: 'Title',
      renderHeader: () => <strong>Title</strong>,
      valueGetter: (params: GridValueGetterParams) => handleBlankCellValues(params.row.title),
    },
    {
      field: 'organizationName',
      width: 120,
      editable: false,
      headerName: 'Organization',
      renderHeader: () => <strong>Organization</strong>,
      valueGetter: (params: GridValueGetterParams) => handleBlankCellValues(params.row.organizationName),
    },
    {
      field: 'contractAgreementInfo.contractSigningDate',
      width: 160,
      editable: false,
      headerName: 'Signing Date',
      renderHeader: () => <strong>Signing Date</strong>,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.contractAgreementInfo?.contractSigningDate
          ? convertEpochToDate(params.row.contractAgreementInfo.contractSigningDate)
          : '-',
    },
    {
      field: 'contractAgreementInfo.contractEndDate',
      width: 160,
      editable: false,
      headerName: 'End Date',
      renderHeader: () => <strong>End Date</strong>,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.contractAgreementInfo?.contractEndDate
          ? convertEpochToDate(params.row.contractAgreementInfo.contractEndDate)
          : '-',
    },
    {
      field: 'state',
      width: 150,
      editable: false,
      headerName: 'Status',
      renderHeader: () => <strong>Status</strong>,
      renderCell: renderContractAgreementStatus,
    },
  ];

  const fetchContractAgreements = async () => {
    dispatch(setIsContractAgreementsLoading(true));
    try {
      const response = await DftService.getInstance().getContractAgreementsList(0, MAX_CONTRACTS_AGREEMENTS);
      const contractAgreementsList = response.data;
      contractAgreementsList.sort((contract1: IContractAgreements, contract2: IContractAgreements) => {
        const d1 = epochToDate(contract1.dateUpdated).valueOf();
        const d2 = epochToDate(contract2.dateUpdated).valueOf();
        return d2 - d1;
      });
      dispatch(setContractAgreements(contractAgreementsList));
      dispatch(setIsContractAgreementsLoading(false));
    } catch (error) {
      dispatch(setContractAgreements([]));
      dispatch(setIsContractAgreementsLoading(false));
    }
  };

  const ColorButton = styled(Button)<ButtonProps>(() => ({
    color: styles.white,
    backgroundColor: styles.blue,
    '&:hover': {
      backgroundColor: styles.white,
      color: styles.blue,
    },
  }));

  useEffect(() => {
    dispatch(setContractAgreements([]));
    fetchContractAgreements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-1 py-6 px-10">
      <Grid container spacing={2}>
        <Grid item xs={6} my={4}>
          <Typography variant="h4">Contract Agreements History</Typography>
        </Grid>
        <Grid item xs={6} my={4} className="text-right">
          <ColorButton variant="contained" onClick={() => fetchContractAgreements()}>
            <span>
              <Refresh />
              <span style={{ marginLeft: 5 }}>Refresh</span>
            </span>
          </ColorButton>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ height: 'auto', overflow: 'auto', width: '100%' }}>
            <DataGrid
              sx={{ py: 1 }}
              autoHeight={true}
              getRowId={row => row.negotiationId}
              rows={contractAgreements}
              columns={columns}
              loading={isContractAgreementsLoading}
              pagination
              pageSize={pageSize}
              onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
              rowsPerPageOptions={[10, 25, 50, 100]}
              components={{
                Toolbar: GridToolbar,
                LoadingOverlay: LinearProgress,
                NoRowsOverlay: () => (
                  <Stack height="100%" alignItems="center" justifyContent="center">
                    No Contract agreements!
                  </Stack>
                ),
                NoResultsOverlay: () => (
                  <Stack height="100%" alignItems="center" justifyContent="center">
                    Contract agreements not found!
                  </Stack>
                ),
              }}
              componentsProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                  printOptions: { disableToolbarButton: true },
                },
              }}
              disableColumnMenu
              disableColumnSelector
              disableDensitySelector
              disableSelectionOnClick
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContractHistory;
