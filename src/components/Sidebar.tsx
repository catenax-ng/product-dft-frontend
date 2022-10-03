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

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles.module.scss';
import { List, ListItem, ListItemButton, ListItemText, ListItemIcon, Divider, Typography } from '@mui/material';
import { IntMenuItemProps, MenuItems, icons } from '../models/Sidebar';

/**
 * Menu Item
 * @param props
 * @returns ListItem
 */
const MenuItem: React.FC<IntMenuItemProps> = ({ item, isExpanded }) => {
  const navigate = useNavigate();
  const { menuIcon, to, text, dataId } = item;
  const Icon = icons[menuIcon];
  return (
    <ListItem data-testid={dataId} onClick={() => navigate(to)} sx={{ p: 0 }}>
      <ListItemButton sx={{ minHeight: '48px' }}>
        <ListItemIcon>
          <Icon fontSize="small" sx={{ color: `${location.pathname === to ? styles.blue : styles.black}` }} />
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, display: !isExpanded ? 'none' : 'flex' }} />
      </ListItemButton>
    </ListItem>
  );
};

/**
 * Menu Title
 * @param props
 * @returns Typography
 */
const MenuItemHeading: React.FC<IntMenuItemProps> = ({ item, isExpanded }) => {
  return (
    <>
      <Typography
        variant="body1"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        className={`${!isExpanded ? 'hidden' : 'flex'} gap-x-2 px-5 py-2 bg-[#efefef]`}
      >
        {isExpanded ? item.text : item.text.charAt(0)}
      </Typography>
      <Divider />
    </>
  );
};

// eslint-disable-next-line
const Sidebar = (props: any) => {
  const { isExpanded } = props;
  return (
    <aside
      className={`${
        isExpanded ? 'w-64' : 'w-14'
      } will-change-width transition-width duration-300 ease-[cubic-bezier(0.2, 0, 0, 1, 0)] flex flex-col overflow-hidden z-auto order-none shadow-md`}
    >
      <div className={`${isExpanded ? 'w-64' : 'w-14 '} h-[calc(100%-4.75rem)] flex flex-col fixed`}>
        <div className="will-change-width px-0 overflow-hidden relative">
          <List>
            {MenuItems.map((menuItem, index) => (
              <div key={index}>
                <MenuItemHeading item={menuItem} isExpanded={isExpanded} />
                {menuItem.childrens.map((children, k) => {
                  return <MenuItem key={k} item={children} isExpanded={isExpanded} />;
                })}
              </div>
            ))}
          </List>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
