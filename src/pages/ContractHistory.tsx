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

import { Refresh } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Chip, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import { DataGrid, GridRenderCellParams, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from 'cx-portal-shared-components';
import React, { useEffect, useState } from 'react';

import Permissions from '../components/Permissions';
import { handleBlankCellValues, MAX_CONTRACTS_AGREEMENTS } from '../helpers/ConsumerOfferHelper';
import { IContractAgreements } from '../models/ConsumerContractOffers';
import ConsumerService from '../services/ConsumerService';
import { setContractAgreements, setIsContractAgreementsLoading } from '../store/consumerSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { convertEpochToDate, epochToDate } from '../utils/utils';

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
      flex: 1,
      editable: false,
      headerName: 'Contract Agreement ID',
      renderHeader: () => <strong>Contract Agreement ID</strong>,
      valueGetter: (params: GridValueGetterParams) => handleBlankCellValues(params.row.contractAgreementId),
    },
    {
      field: 'contractAgreementInfo.assetId',
      flex: 1,
      editable: false,
      headerName: 'Asset ID',
      renderHeader: () => <strong>Asset ID</strong>,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.contractAgreementInfo ? params.row.contractAgreementInfo?.assetId : '-',
    },
    {
      field: 'counterPartyAddress',
      flex: 1,
      editable: false,
      headerName: 'Counter Party Address',
      renderHeader: () => <strong>Counter Party Address</strong>,
      valueGetter: (params: GridValueGetterParams) => handleBlankCellValues(params.row.counterPartyAddress),
    },
    {
      field: 'title',
      flex: 1,
      editable: false,
      headerName: 'Title',
      renderHeader: () => <strong>Title</strong>,
      valueGetter: (params: GridValueGetterParams) => handleBlankCellValues(params.row.title),
    },
    {
      field: 'organizationName',
      flex: 1,
      editable: false,
      headerName: 'Organization',
      renderHeader: () => <strong>Organization</strong>,
      valueGetter: (params: GridValueGetterParams) => handleBlankCellValues(params.row.organizationName),
    },
    {
      field: 'contractAgreementInfo.contractSigningDate',
      flex: 1,
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
      flex: 1,
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
      flex: 1,
      editable: false,
      headerName: 'Status',
      renderHeader: () => <strong>Status</strong>,
      renderCell: renderContractAgreementStatus,
    },
  ];

  const fetchContractAgreements = async () => {
    dispatch(setIsContractAgreementsLoading(true));
    try {
      const response = await ConsumerService.getInstance().getContractAgreementsList(0, MAX_CONTRACTS_AGREEMENTS);
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

  useEffect(() => {
    dispatch(setContractAgreements([]));
    fetchContractAgreements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ flex: 1, p: 4 }}>
      <Permissions values={['consumer_view_contract_agreement']} fullPage={true}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6} my={4}>
            <Typography variant="h4">Contract Agreements History</Typography>
          </Grid>
          <Grid item xs={6} my={4} textAlign={'right'}>
            <Button size="small" variant="contained" onClick={() => fetchContractAgreements()}>
              <Refresh />
              &nbsp; Refresh
            </Button>
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
      </Permissions>
    </Box>
  );
};

export default ContractHistory;
