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
import Sidebar from '../components/Sidebar';

test('expanded sidebar', () => {
  render(
    <MemoryRouter>
      <Sidebar isExpanded={true} />
    </MemoryRouter>,
  );

  // check upload file menu
  const uploadFileMenu = screen.getByText('Create Data');
  expect(uploadFileMenu).toBeInTheDocument();
  expect(uploadFileMenu).not.toHaveClass('hidden');

  // check upload history menu
  const uploadHistoryMenu = screen.getByText('Upload History');
  expect(uploadHistoryMenu).toBeInTheDocument();
  expect(uploadHistoryMenu).not.toHaveClass('hidden');

  // check help menu
  const helpMenu = screen.getByText('Help');
  expect(helpMenu).toBeInTheDocument();
  expect(helpMenu).not.toHaveClass('hidden');
});

test('collapsed sidebar', () => {
  render(
    <MemoryRouter>
      <Sidebar isExpanded={false} />
    </MemoryRouter>,
  );
  // check upload file menu
  const uploadFileMenu = screen.queryByText('Create Data');
  expect(uploadFileMenu).not.toBeVisible();
  // check upload history menu
  const uploadHistoryMenu = screen.queryByText('Upload History');
  expect(uploadHistoryMenu).not.toBeVisible();
  // check help menu
  const helpMenu = screen.queryByText('Help');
  expect(helpMenu).not.toBeVisible();
});
