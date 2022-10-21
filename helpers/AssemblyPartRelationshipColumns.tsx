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

import { DynamicTableColumn } from '../models/DynamicTableColumn';
import { commonColumns } from './CommonColumns';

function getObject(
  field: string,
  headerName: string,
  headerAlign: string,
  type?: string,
  valueOptions?: { value: string; label: string }[],
) {
  return { field, headerName, editable: true, sortable: false, flex: 1, type, headerAlign, valueOptions };
}

export function getAssemblyPartRelationshipColumns() {
  const assemblyPartRelationshipColumns: DynamicTableColumn[] = commonColumns.filter(
    (column: DynamicTableColumn) => column.field !== 'batch_id',
  );
  const auxArray = JSON.parse(JSON.stringify(assemblyPartRelationshipColumns));

  auxArray.push(
    getObject('parent_uuid', 'Parent UUID', 'center'),
    getObject('parent_part_instance_id', 'Parent Part Instance ID*', 'center'),
    getObject('parent_manufacturer_part_id', 'Parent Manufacturer Part ID*', 'center'),
    getObject('parent_optional_identifier_key', 'Parent Optional Identifier Key', 'center', 'singleSelect', [
      { value: '', label: 'Empty' },
      { value: 'VAN', label: 'VAN' },
      { value: 'BatchID', label: 'BatchID' },
    ]),
    getObject('parent_optional_identifier_value', 'Parent Optional Identifier Value', 'center'),
    getObject('lifecycle_context', 'Lifecycle Context*', 'center'),
    getObject('quantity_number', 'Quantity Number*', 'center'),
    getObject('measurement_unit_lexical_value', 'Measurement Unit Lexical Value*', 'center'),
    getObject('manufacturer_part_id', 'Manufacturer Part ID*', 'center'),
    getObject('datatype_uri', 'Datatype URI*', 'center'),
    getObject('assembled_on', 'Assembled On*', 'center', 'date'),
  );

  return auxArray;
}
