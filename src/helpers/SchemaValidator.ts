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
import { GridValidRowModel } from '@mui/x-data-grid';
import Ajv2019 from 'ajv/dist/2019';
import { DefinedError } from 'ajv/dist/core';
import addFormats from 'ajv-formats';

import { setSnackbarMessage } from '../features/notifiication/slice';
import { handleDialogOpen } from '../features/policies/slice';
import { store } from '../store/store';

export const schemaValidator = async (data: GridValidRowModel[]) => {
  const ajv = new Ajv2019();
  addFormats(ajv);

  const submodelSlice = store.getState().submodelSlice;
  const validate = ajv.compile(submodelSlice.submodelDetails.items);
  const result: boolean[] = [];
  data.forEach((item: GridValidRowModel, index: number) => {
    const valid = validate(item);
    if (valid) {
      result.push(true);
    } else {
      result.push(false);
      for (const err of validate.errors as DefinedError[]) {
        store.dispatch(
          setSnackbarMessage({
            message: `Row ${index + 1}: ${err.instancePath.replace(/[^a-zA-Z ]/g, ' ')} ${err.message}`,
            type: 'error',
          }),
        );
      }
    }
  });
  if (!result.includes(false)) {
    store.dispatch(handleDialogOpen({ data: data, url: submodelSlice.selectedSubmodel.value, type: 'json' }));
  }
};
