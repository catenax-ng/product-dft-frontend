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

import { ErrorPage } from 'cx-portal-shared-components';

import { useAppSelector } from '../store/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Permissions(props: any) {
  const { permissions } = useAppSelector(state => state.appSlice);
  const valid = props.values ? props.values.some((item: string) => permissions?.includes(item)) : true;
  if (valid) return props.children;
  else if (permissions.length && props.fullPage)
    return (
      <ErrorPage title="You have no permission to view this content" description="Please contact your administrator" />
    );
  else return null;
}
