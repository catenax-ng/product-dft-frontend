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

import AddCircleIcon from '@mui/icons-material/AddCircle';
import HistoryIcon from '@mui/icons-material/History';
import HelpIcon from '@mui/icons-material/Help';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

export const icons = {
  AddCircleIcon,
  HistoryIcon,
  HelpIcon,
  ManageSearchIcon,
};

export interface IntMenuChildren {
  text: string;
  menuIcon?: keyof typeof icons;
  to?: string;
  dataId?: string;
}

export interface IntMenuItem {
  text: string;
  isHeading?: boolean;
  isExpanded?: boolean;
  childrens?: IntMenuChildren[];
}

export interface IntMenuItemProps {
  item: IntMenuChildren;
  isExpanded: boolean;
}

// menu items
export const MenuItems: IntMenuItem[] = [
  {
    text: 'Provider',
    isHeading: true,
    childrens: [
      {
        text: 'Create Data',
        menuIcon: 'AddCircleIcon',
        to: '/dashboard/create-data',
        dataId: 'uploadFileMenu',
      },
      {
        text: 'Upload History',
        menuIcon: 'HistoryIcon',
        to: '/dashboard/history',
        dataId: 'uploadHistoryMenu',
      },
      {
        text: 'Help',
        menuIcon: 'HelpIcon',
        to: '/dashboard/help',
        dataId: 'helpMenu',
      },
    ],
  },
  {
    text: 'Consumer',
    isHeading: true,
    childrens: [
      {
        text: 'Consume Data',
        menuIcon: 'ManageSearchIcon',
        to: '/dashboard/consume-data',
        dataId: 'uploadFileMenu',
      },
      {
        text: 'Contract History',
        menuIcon: 'HistoryIcon',
        to: '/dashboard/contract-history',
        dataId: 'uploadHistoryMenu',
      },
    ],
  },
];
