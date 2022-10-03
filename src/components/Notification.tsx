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

import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import styles from '../styles.module.scss';

// eslint-disable-next-line
const Notification = (props: any) => {
  const { errorMessage } = props;
  return (
    <section className="flex justify-between p-4 bg-red-300">
      <div className="flex flex-row items-center gap-x-2">
        <DangerousOutlinedIcon sx={{ color: styles.danger }} />
        <p className="text-md text-red-600">{errorMessage}</p>
      </div>
      <span style={{ marginRight: '4rem' }} className="cursor-pointer" onClick={() => props.clear()}>
        <CloseOutlinedIcon fontSize="medium" />
      </span>
    </section>
  );
};
export default Notification;
