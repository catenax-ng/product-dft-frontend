/********************************************************************************
 * Copyright (c) 2021,2022 FEV Consulting GmbH
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

import { Box, Grid } from '@mui/material';
import { Tab, TabPanel, Tabs } from 'cx-portal-shared-components';
import { SyntheticEvent, useState } from 'react';

import DataTable from '../components/DataTable';
import JsonInput from '../components/JsonInput';
import Permissions from '../components/Permissions';
import PoliciesDialog from '../components/policies/PoliciesDialog';
import SelectSubmodel from '../components/SelectSubmodel';
import UploadFile from '../components/UploadFile';

export default function CreateData() {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ flex: 1, p: 4 }}>
      <Permissions values={['provider_create_contract_offer']}>
        <Grid container spacing={2} mb={3}>
          <Grid item xs={3}>
            <SelectSubmodel />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleChange} aria-label="upload types: tabs" sx={{ pt: 0 }}>
                <Tab label="Upload File" />
                <Tab label="Table" />
                <Tab label="JSON" />
              </Tabs>
            </Box>
            <Box>
              <TabPanel value={activeTab} index={0}>
                <UploadFile />
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                <DataTable />
              </TabPanel>
              <TabPanel value={activeTab} index={2}>
                <JsonInput />
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      </Permissions>
      <PoliciesDialog />
    </Box>
  );
}
