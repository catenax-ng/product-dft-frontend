/********************************************************************************
 * Copyright (c) 2021,2022 FEV Consulting GmbH
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

export interface AssemblyPartRelationship {
  id?: number;
  parent_uuid: string;
  parent_part_instance_id: string;
  parent_manufacturer_part_id: string;
  parent_optional_identifier_key: string;
  parent_optional_identifier_value: string;
  uuid: string;
  part_instance_id: string;
  manufacturer_part_id: string;
  optional_identifier_key: string;
  optional_identifier_value: string;
  lifecycle_context: string;
  quantity_number: string;
  measurement_unit_lexical_value: string;
  datatype_uri: string;
  assembled_on: string;
}
