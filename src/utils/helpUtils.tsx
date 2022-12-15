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

export const rulesCardStyle = {
  display: 'block',
  transitionDuration: '0.3s',
  height: '140px',
};

export const rulesContentStyle = {
  listStyleType: 'disc',
  padding: '10px 0 0 20px',
};

const copyHeadersSerialPartTypization = () => {
  navigator.clipboard.writeText(
    'UUID;part_instance_id;manufacturing_date;manufacturing_country;manufacturer_part_id;customer_part_id;classification;name_at_manufacturer;name_at_customer;optional_identifier_key;optional_identifier_value',
  );
};

const copyHeadersBatch = () => {
  navigator.clipboard.writeText(
    'UUID;batch_id;manufacturing_date;manufacturing_country;manufacturer_part_id;customer_part_id;classification;name_at_manufacturer;name_at_customer;optional_identifier_key;optional_identifier_value',
  );
};

const copyHeadersAssemblyPartRelationship = () => {
  navigator.clipboard.writeText(
    'parent_UUID;parent_part_instance_id;parent_manufacturer_part_id;parent_optional_identifier_key;parent_optional_identifier_value;UUID;part_instance_id;manufacturer_part_id;optional_identifier_key;optional_identifier_value;lifecycle_context;quantity_number;measurement_unit_lexical_value;datatype_URI;assembled_on',
  );
};

const serialPartTypizationRows = [
  { name: 'UUID', mandatory: false, position: 1 },
  { name: 'part_instance_id', mandatory: true, position: 2 },
  { name: 'manufacturing_date', mandatory: true, position: 3 },
  { name: 'manufacturing_country', mandatory: false, position: 4 },
  { name: 'manufacturer_part_id', mandatory: true, position: 5 },
  { name: 'customer_part_id', mandatory: false, position: 6 },
  { name: 'classification', mandatory: true, position: 7 },
  { name: 'name_at_manufacturer', mandatory: true, position: 8 },
  { name: 'name_at_customer', mandatory: false, position: 9 },
  { name: 'optional_identifier_key', mandatory: false, position: 10 },
  { name: 'optional_identifier_value', mandatory: false, position: 11 },
];

const batchRows = [
  { name: 'UUID', mandatory: false, position: 1 },
  { name: 'batch_id', mandatory: true, position: 2 },
  { name: 'manufacturing_date', mandatory: true, position: 3 },
  { name: 'manufacturing_country', mandatory: false, position: 4 },
  { name: 'manufacturer_part_id', mandatory: true, position: 5 },
  { name: 'customer_part_id', mandatory: false, position: 6 },
  { name: 'classification', mandatory: true, position: 7 },
  { name: 'name_at_manufacturer', mandatory: true, position: 8 },
  { name: 'name_at_customer', mandatory: false, position: 9 },
  { name: 'optional_identifier_key', mandatory: false, position: 10 },
  { name: 'optional_identifier_value', mandatory: false, position: 11 },
];

const assemblyPartRelationshipRows = [
  { name: 'parent_UUID', mandatory: false, position: 1 },
  { name: 'parent_part_instance_id', mandatory: true, position: 2 },
  { name: 'parent_manufacturer_part_id', mandatory: true, position: 3 },
  { name: 'parent_optional_identifier_key', mandatory: false, position: 4 },
  { name: 'parent_optional_identifier_value', mandatory: false, position: 5 },
  { name: 'UUID', mandatory: false, position: 6 },
  { name: 'part_instance_id', mandatory: true, position: 7 },
  { name: 'manufacturer_part_id', mandatory: true, position: 8 },
  { name: 'optional_identifier_key', mandatory: false, position: 9 },
  { name: 'optional_identifier_value', mandatory: false, position: 10 },
  { name: 'lifecycle_context', mandatory: true, position: 11 },
  { name: 'quantity_number', mandatory: true, position: 12 },
  { name: 'measurement_unit_lexical_value', mandatory: true, position: 13 },
  { name: 'datatype_URI', mandatory: true, position: 14 },
  { name: 'assembled_on', mandatory: true, position: 15 },
];

export const submodelHelpArr = [
  {
    name: 'Serial Part Typization',
    rows: serialPartTypizationRows,
    onCopyHeader: copyHeadersSerialPartTypization,
    downloadUrl: '/resources/serialPartTypization.csv',
  },
  {
    name: 'Batch',
    rows: batchRows,
    onCopyHeader: copyHeadersBatch,
    downloadUrl: '/resources/batch.csv',
  },
  {
    name: 'Assembly Part Relationship',
    rows: assemblyPartRelationshipRows,
    onCopyHeader: copyHeadersAssemblyPartRelationship,
    downloadUrl: '/resources/assemblyPartRelationship.csv',
  },
];
