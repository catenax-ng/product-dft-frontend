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

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfirmTermsDialog from '../components/ConfirmTermsDialog';

const offerObj = {
  offers: [
    {
      bpnNumbers: ['BPN1', 'BPN2'],
      connectorOfferid: 'connector1',
      connectorOfferUrl: 'http://localhost:8080',
      title: 'Offer title',
      created: '22/07/2022',
      description: 'description',
      publisher: 'name',
      version: '1.0.0',
      contractInfo: 'contract info dummy',
      modified: '22/07/2022',
      offerInfo: 'offer extra info',
      typeOfAccess: 'restricted',
      usagePolicies: [
        {
          type: 'Duration',
          typeOfAccess: 'Unrestricted',
          value: '1',
        },
      ],
    },
  ],
  offerCount: 1,
  provider: 'provider',
};

describe('ConfirmTermsDialog Component', () => {
  const isOpen = true;
  const { getByRole, getByText } = render(<ConfirmTermsDialog title="Confirm" open={isOpen} offerObj={offerObj} />);
  const confirmButton = getByRole('button', { name: 'Confirm' });
  const checkbox = getByRole('checkbox');
  const heading = getByText('Confirm', { selector: 'h2' });

  test('Snapshot ConfirmTermsDialog - Initial component Visible', () => {
    // check heading is render
    expect(heading).toHaveTextContent('Confirm');
    expect(heading).toBeInTheDocument();

    // confirm button disabled
    expect(confirmButton).toBeDisabled();
    // expect checkbox unchecked
    expect(checkbox).not.toBeChecked();
  });

  test('checkbox toggle event', () => {
    // check
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    // uncheck
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
