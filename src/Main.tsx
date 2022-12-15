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
import { Box } from '@mui/material';
import { ErrorPage } from 'cx-portal-shared-components';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import UserService from './services/UserService';

export default function Main() {
  const [isExpanded, setIsExpanded] = useState(true);
  const handleExpanded = (expanded: boolean) => {
    setIsExpanded(expanded);
  };

  return (
    <>
      {UserService.hasValidResource() ? (
        <Box sx={{ my: 0, mx: 'auto', overflowY: 'auto', overflowX: 'hidden', height: '100vh' }}>
          <Box>
            <Nav getIsExpanded={(expanded: boolean) => handleExpanded(expanded)} />
            <Box sx={{ display: 'flex', mt: 8, height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
              <Sidebar isExpanded={isExpanded} />
              <Box sx={{ width: '100%', height: '100%', overflowY: 'scroll' }}>
                <Outlet />
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <ErrorPage header="This webpage is not available." title="Sorry for this inconvenience." />
      )}
    </>
  );
}
