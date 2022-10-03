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

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import { handleDialogOpen } from '../store/accessUsagePolicySlice';
import { store } from '../store/store';
import { ReduxWrapper } from '../utils/testUtils';

describe('Dashboard', () => {
  test('upload file page', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/dashboard/create-data' }]}>
        <Dashboard />
      </MemoryRouter>,
      { wrapper: ReduxWrapper },
    );
    expect(screen.getByText('Drag and drop your file on this page')).toBeInTheDocument();
    expect(screen.queryByText('Refresh')).not.toBeInTheDocument();
    expect(screen.queryByText('Rules')).not.toBeInTheDocument();
  });

  test('upload history page', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/dashboard/history' }]}>
        <Dashboard />
      </MemoryRouter>,
      { wrapper: ReduxWrapper },
    );
    expect(screen.getByText('Refresh')).toBeInTheDocument();
  });

  test('help page', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/dashboard/help' }]}>
        <Dashboard />
      </MemoryRouter>,
      { wrapper: ReduxWrapper },
    );
    expect(screen.getByText('Rules')).toBeInTheDocument();
  });

  test('Render Policies Dialog Componenet', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/dashboard/create-data' }]}>
        <Dashboard />
      </MemoryRouter>,
      { wrapper: ReduxWrapper },
    );
    store?.dispatch(handleDialogOpen(true));
    expect(screen.queryByText('Policies')).toBeInTheDocument();
  });
});
