/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { Box, Button, Grid, LinearProgress, Stack, TextField, Typography } from '@mui/material';
import { DataGrid, GridSelectionModel, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import OfferDetailsDialog from '../components/OfferDetailsDialog';
import ConfirmTermsDialog from '../components/ConfirmTermsDialog';
import { arraysEqual, handleBlankCellValues } from '../helpers/ConsumerOfferHelper';
import DftService from '../services/DftService';
import {
  setContractOffers,
  setSelectedOffer,
  setOffersLoading,
  setSelectedOffersList,
  setIsMultipleContractSubscription,
} from '../store/consumerSlice';
import { useAppSelector, useAppDispatch } from '../store/store';
import { toast } from 'react-toastify';
import { toastProps } from '../helpers/ToastOptions';
import Swal from 'sweetalert2';

export const ConsumeData: React.FC = () => {
  const [providerUrl, setProviderUrl] = useState('');
  const { contractOffers, offersLoading, selectedOffer, selectedOffersList, isMultipleContractSubscription } =
    useAppSelector(state => state.consumerSlice);
  const [isOpenOfferDialog, setIsOpenOfferDialog] = useState<boolean>(false);
  const [isOpenOfferConfirmDialog, setIsOpenOfferConfirmDialog] = useState<boolean>(false);
  const [isOfferSubLoading, setIsOfferSubLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const dispatch = useAppDispatch();

  const columns = [
    {
      field: 'title',
      width: 330,
      headerName: 'Title',
      renderHeader: () => <strong>Title</strong>,
    },
    {
      field: 'assetId',
      width: 150,
      headerName: 'Asset ID',
      renderHeader: () => <strong>Asset ID</strong>,
    },
    {
      field: 'created',
      width: 150,
      editable: false,
      headerName: 'Created on',
      renderHeader: () => <strong>Created on</strong>,
      valueGetter: (params: GridValueGetterParams) => handleBlankCellValues(params.row.created),
    },
    {
      field: 'publisher',
      width: 130,
      editable: false,
      headerName: 'Publisher',
      renderHeader: () => <strong>Publisher</strong>,
      valueGetter: (params: GridValueGetterParams) => handleBlankCellValues(params.row.publisher.split(':')[0]),
    },
    {
      field: 'typeOfAccess',
      width: 150,
      editable: false,
      headerName: 'Access type',
      renderHeader: () => <strong>Access type</strong>,
    },
    {
      field: 'bpnNumbers',
      width: 180,
      editable: false,
      headerName: 'BPN',
      renderHeader: () => <strong>BPN</strong>,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.bpnNumbers.length > 0
          ? params.row.bpnNumbers.filter((bpn: string) => bpn !== 'null' || bpn !== null)
          : '-',
    },
    {
      field: 'description',
      width: 300,
      editable: false,
      headerName: 'Description',
      renderHeader: () => <strong>Description</strong>,
      valueGetter: (params: GridValueGetterParams) => handleBlankCellValues(params.row.description),
    },
  ];

  const toggleDialog = (flag: boolean) => {
    setIsOpenOfferDialog(flag);
    if (flag === false) {
      dispatch(setSelectedOffer(null));
    }
  };

  /**
   * Handle offer details dialog action button event
   * @param type: 'close', 'subscribe': type of button
   */
  const handleDetailsButtonEvent = (type: string) => {
    if (type === 'close') {
      toggleDialog(false);
    } else if (type === 'subscribe') {
      // open policy dialog
      setIsOpenOfferConfirmDialog(true);
    }
  };

  /**
   * Toggle terms and condition confirm dialog
   * @param flag: 'close', 'confirm': type of button
   */
  const handleConfirmTermDialog = async (flag: string) => {
    if (flag === 'close') {
      setIsOpenOfferConfirmDialog(false);
    } else if (flag === 'confirm') {
      try {
        let payload;
        const offersList: unknown[] = [];
        // multiselect or single selecte
        if (isMultipleContractSubscription) {
          selectedOffersList.map(offer => {
            offersList.push({
              offerId: offer.offerId || '',
              assetId: offer.assetId || '',
              policyId: offer.policyId || '',
            });
          });
          payload = {
            connectorId: selectedOffersList[0].connectorId,
            providerUrl: providerUrl,
            offers: offersList,
            policies: selectedOffersList[0].usagePolicies,
          };
        } else {
          const { usagePolicies, offerId, assetId, policyId, connectorId } = selectedOffer;
          offersList.push({
            offerId: offerId || '',
            assetId: assetId || '',
            policyId: policyId || '',
          });
          payload = {
            connectorId: connectorId,
            providerUrl: providerUrl,
            offers: offersList,
            policies: usagePolicies,
          };
        }
        setIsOfferSubLoading(true);
        const response = await DftService.getInstance().subscribeToOffers(payload);
        setIsOfferSubLoading(false);
        if (response.status == 200) {
          toast.success('Contract offers subscription successfully initiated', toastProps());
          setIsOpenOfferDialog(false);
          setIsOpenOfferConfirmDialog(false);
          dispatch(setIsMultipleContractSubscription(false));
          dispatch(setSelectedOffer(null));
          dispatch(setSelectedOffersList([]));
          setSelectionModel([]);
        }
      } catch (error) {
        setIsOfferSubLoading(false);
        toast.error('Contract offers subscription failed!', toastProps());
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onRowClick = (params: any) => {
    dispatch(setSelectedOffer(params.row));
    toggleDialog(true);
  };

  const fetchConsumerDataOffers = async () => {
    dispatch(setOffersLoading(true));
    try {
      const response = await DftService.getInstance().fetchConsumerDataOffers(providerUrl);
      dispatch(setContractOffers(response.data));
      dispatch(setOffersLoading(false));
    } catch (error) {
      dispatch(setContractOffers([]));
      dispatch(setOffersLoading(false));
    }
  };

  // enter key fetch data
  const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 || e.code == 'Enter') {
      fetchConsumerDataOffers();
    }
  };

  const checkoutSelectedOffers = () => {
    let isUsagePoliciesEqual = false;
    const useCasesList: any[] = [];
    selectedOffersList.map(offer => {
      if (offer.usagePolicies.length > 0) {
        useCasesList.push(offer.usagePolicies);
      }
    });
    useCasesList.forEach(useCase => {
      if (arraysEqual(useCasesList[0], useCase)) isUsagePoliciesEqual = true;
      else isUsagePoliciesEqual = false;
    });
    if (isUsagePoliciesEqual) {
      setIsOpenOfferDialog(true);
      dispatch(setIsMultipleContractSubscription(true));
    } else {
      Swal.fire({
        title: 'Usage policies are not identical!',
        html: '<p> The contract offers within your search results do not have an identical usage policy. Subscribing to multiple offers is only available for contract offers that have an identical policy. </p>',
        icon: 'error',
        confirmButtonColor: '#01579b',
      });
      setIsOpenOfferDialog(false);
      dispatch(setIsMultipleContractSubscription(false));
    }
  };

  const init = () => {
    dispatch(setContractOffers([]));
    dispatch(setSelectedOffer(null));
    dispatch(setSelectedOffersList([]));
    setSelectionModel([]);
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-1 py-6 px-10">
      <Grid container spacing={2}>
        <Grid item xs={12} my={4}>
          <Typography variant="h4">Consumer View</Typography>
        </Grid>
        <Grid item xs={12} mb={4}>
          <Stack direction="row" spacing={2}>
            <Typography ml={1} variant="subtitle1" gutterBottom>
              Enter data provider connector URL
            </Typography>
            <Box
              sx={{
                width: 600,
                maxWidth: '100%',
              }}
            >
              <TextField
                value={providerUrl}
                type="url"
                onChange={e => setProviderUrl(e.target.value)}
                onKeyPress={handleKeypress}
                fullWidth
                size="small"
                label="Provider URL"
              />
            </Box>
            <Button variant="contained" onClick={fetchConsumerDataOffers}>
              Query
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={checkoutSelectedOffers} disabled={!selectedOffersList.length}>
              Subscribe to selected
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ height: 'auto', overflow: 'auto', width: '100%' }}>
            <DataGrid
              sx={{ py: 1 }}
              autoHeight={true}
              getRowId={row => row.assetId}
              rows={contractOffers}
              onRowClick={onRowClick}
              columns={columns}
              loading={offersLoading}
              checkboxSelection
              pagination
              pageSize={pageSize}
              onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
              rowsPerPageOptions={[10, 25, 50, 100]}
              onSelectionModelChange={newSelectionModel => {
                const selectedIDs = new Set(newSelectionModel);
                const selectedRowData = contractOffers.filter(row => selectedIDs.has(row.assetId.toString()));
                dispatch(setSelectedOffersList(selectedRowData));
                setSelectionModel(newSelectionModel);
              }}
              selectionModel={selectionModel}
              components={{
                Toolbar: GridToolbar,
                LoadingOverlay: LinearProgress,
                NoRowsOverlay: () => (
                  <Stack height="100%" alignItems="center" justifyContent="center">
                    No Data offers!
                  </Stack>
                ),
                NoResultsOverlay: () => (
                  <Stack height="100%" alignItems="center" justifyContent="center">
                    Data offer not found!
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
      {isMultipleContractSubscription && (
        <>
          <OfferDetailsDialog
            open={isOpenOfferDialog}
            offerObj={selectedOffersList[0]}
            handleButtonEvent={handleDetailsButtonEvent}
            isMultiple
          />
          <ConfirmTermsDialog
            offerObj={{
              offers: selectedOffersList ? selectedOffersList : [],
              provider: selectedOffersList[0]?.publisher ? selectedOffersList[0].publisher : ' ',
              offerCount: selectedOffersList.length,
            }}
            isProgress={isOfferSubLoading}
            open={isOpenOfferConfirmDialog}
            handleButtonEvent={handleConfirmTermDialog}
          />
        </>
      )}
      {selectedOffer && (
        <>
          <OfferDetailsDialog
            open={isOpenOfferDialog}
            offerObj={selectedOffer}
            handleButtonEvent={handleDetailsButtonEvent}
          />
          <ConfirmTermsDialog
            offerObj={{
              offers: selectedOffer ? [selectedOffer] : [],
              provider: selectedOffer ? selectedOffer.publisher : ' ',
              offerCount: 0,
            }}
            isProgress={isOfferSubLoading}
            open={isOpenOfferConfirmDialog}
            handleButtonEvent={handleConfirmTermDialog}
          />
        </>
      )}
    </div>
  );
};
