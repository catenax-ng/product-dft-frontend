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

import { Card, CardActions, CardContent, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GetAppIcon from '@mui/icons-material/GetApp';
import { toast } from 'react-toastify';

export const Help: React.FC = () => {
  const serialCardStyle = {
    display: 'block',
    transitionDuration: '0.3s',
    height: '570px',
  };

  const assemblyCardStyle = {
    display: 'block',
    transitionDuration: '0.3s',
    height: '710px',
  };

  const rulesCardStyle = {
    display: 'block',
    transitionDuration: '0.3s',
    height: '116px',
  };

  const copyHeadersToasty = () => {
    return toast.success('Copied to clipboard!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const copyHeadersSerialPartTypization = () => {
    navigator.clipboard.writeText(
      'UUID;part_instance_id;manufacturing_date;manufacturing_country;manufacturer_part_id;customer_part_id;classification;name_at_manufacturer;name_at_customer;optional_identifier_key;optional_identifier_value',
    );

    copyHeadersToasty();
  };

  const copyHeadersBatch = () => {
    navigator.clipboard.writeText(
      'UUID;batch_id;manufacturing_date;manufacturing_country;manufacturer_part_id;customer_part_id;classification;name_at_manufacturer;name_at_customer;optional_identifier_key;optional_identifier_value',
    );

    copyHeadersToasty();
  };

  const copyHeadersAssemblyPartRelationship = () => {
    navigator.clipboard.writeText(
      'parent_UUID;parent_part_instance_id;parent_manufacturer_part_id;parent_optional_identifier_key;parent_optional_identifier_value;UUID;part_instance_id;manufacturer_part_id;optional_identifier_key;optional_identifier_value;lifecycle_context;quantity_number;measurement_unit_lexical_value;datatype_URI;assembled_on',
    );

    copyHeadersToasty();
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

  return (
    <div className="flex-1 py-6 px-20">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card style={serialCardStyle}>
            <CardContent>
              <h2>
                <b> Serial Part Typization </b>
              </h2>
              &nbsp;
              <table>
                <thead>
                  <tr>
                    <th> Name </th>
                    <th> Mandatory </th>
                    <th> Position </th>
                  </tr>
                </thead>
                <tbody>
                  {serialPartTypizationRows.map(row => (
                    <tr key={row.name}>
                      <td>{row.name}</td>
                      <td>{row.mandatory ? <b> Yes </b> : 'No'}</td>
                      <td>{row.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
            <CardActions>
              <Button size="large" startIcon={<GetAppIcon />}>
                <Link to="/resources/serialPartTypization.csv" target="_blank" download>
                  Download sample
                </Link>
              </Button>
              <Button onClick={copyHeadersSerialPartTypization} size="large" startIcon={<ContentCopyIcon />}>
                Copy headers to clipboard
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card style={serialCardStyle}>
            <CardContent>
              <h2>
                <b> Batch </b>
              </h2>
              &nbsp;
              <table>
                <thead>
                  <tr>
                    <th> Name </th>
                    <th> Mandatory </th>
                    <th> Position </th>
                  </tr>
                </thead>
                <tbody>
                  {batchRows.map(row => (
                    <tr key={row.name}>
                      <td>{row.name}</td>
                      <td>{row.mandatory ? <b> Yes </b> : 'No'}</td>
                      <td>{row.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
            <CardActions>
              <Button size="large" startIcon={<GetAppIcon />}>
                <Link to="/resources/batch.csv" target="_blank" download>
                  Download sample
                </Link>
              </Button>
              <Button onClick={copyHeadersBatch} size="large" startIcon={<ContentCopyIcon />}>
                Copy headers to clipboard
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card style={assemblyCardStyle}>
            <CardContent>
              <h2>
                <b>Assembly Part Relationship </b>
              </h2>
              &nbsp;
              <table>
                <thead>
                  <tr>
                    <th> Name </th>
                    <th> Mandatory </th>
                    <th> Position </th>
                  </tr>
                </thead>
                <tbody>
                  {assemblyPartRelationshipRows.map(row => (
                    <tr key={row.name}>
                      <td>{row.name}</td>
                      <td align="center">{row.mandatory ? <b> Yes </b> : 'No'}</td>
                      <td align="right">{row.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
            <CardActions>
              <Button size="large" startIcon={<GetAppIcon />}>
                <Link to="/resources/assemblyPartRelationship.csv" target="_blank" download>
                  Download sample
                </Link>
              </Button>
              <Button onClick={copyHeadersAssemblyPartRelationship} size="large" startIcon={<ContentCopyIcon />}>
                Copy headers to clipboard
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card style={rulesCardStyle}>
            <CardContent>
              <h3>
                <b> Rules </b>
              </h3>
              <ul>
                <li> &bull; The file must be a file of type CSV (.csv extension).</li>
                <li> &bull; Data fields must be separated by a semicolon (;).</li>
                <li> &bull; All data fields must be present even if empty.</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Help;
