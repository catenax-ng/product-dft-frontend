/********************************************************************************
 * Copyright (c) 2021,2022 FEV Consulting GmbH
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

import React, { useCallback, useEffect, useState } from 'react';
import { Refresh } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { ProcessReport } from '../models/ProcessReport';
import StickyHeadTable from '../components/StickyHeadTable';
import styles from '../styles.module.scss';
import DftService from '../services/DftService';

export const UploadHistory: React.FC = () => {
  const [tableData, setTableData] = useState<ProcessReport[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);

  const refreshTable = useCallback(async () => {
    try {
      const response = await DftService.getInstance().getUploadHistory({ page: page, pageSize: rowsPerPage });
      setTableData(response.data.items);
      setTotalElements(response.data.totalItems);
    } catch (error) {
      console.log(error);
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      refreshTable();
    }
    return () => {
      isApiSubscribed = false;
    };
  }, [page, rowsPerPage, refreshTable]);

  const ColorButton = styled(Button)<ButtonProps>(() => ({
    color: styles.white,
    backgroundColor: styles.blue,
    '&:hover': {
      backgroundColor: styles.white,
      color: styles.blue,
    },
  }));

  return (
    <div className="flex-1 py-6 px-20">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h1 className="flex flex-row text-bold text-3xl">Upload History</h1>
        </Grid>
        <Grid item xs={6} className="text-right">
          <ColorButton variant="contained" onClick={() => refreshTable()}>
            <span>
              <Refresh />
              &nbsp; Refresh
            </span>
          </ColorButton>
        </Grid>
      </Grid>
      <div className="mt-8">
        <StickyHeadTable
          rows={tableData}
          page={page}
          rowsPerPage={rowsPerPage}
          totalElements={totalElements}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        />
      </div>
    </div>
  );
};

export default UploadHistory;
