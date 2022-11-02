/* eslint-disable @typescript-eslint/no-explicit-any */
/********************************************************************************
 * Copyright (c) 2021,2022 FEV Consulting GmbH
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

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

// components
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
<<<<<<< Updated upstream
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import Notification from '../components/Notification';
=======
// import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
>>>>>>> Stashed changes

// models
import { File } from '../models/File';
import { FileType } from '../models/FileType';

// utils
import { Help } from './Help';
import UploadHistory from './UploadHistory';
import CreateData from './CreateData';
import { Config } from '../utils/config';
import { ConsumeData } from './ConsumeData';
import ContractHistory from './ContractHistory';
import { useAppDispatch } from '../store/store';
import { setSelectedFiles, setUploadStatus } from '../store/providerSlice';
import PoliciesDialog from '../components/policies/PoliciesDialog';
import { setPageLoading } from '../store/appSlice';
<<<<<<< Updated upstream
import { useTheme } from '@mui/material';
=======
import { Box } from '@mui/material';
import { PageNotifications } from 'cx-portal-shared-components';
>>>>>>> Stashed changes

const Dashboard: React.FC = () => {
  // const theme = useTheme();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  // const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  // const { selectedFiles } = useAppSelector(state => state.providerSlice);
  // let dragCounter = 0;
  const dispatch = useAppDispatch();
  const handleExpanded = (expanded: boolean) => {
    setIsExpanded(expanded);
  };

  const validateFile = (file: File) => {
    const validTypes: string[] = Object.values(FileType);
    return validTypes.includes(file.type) || file.name.endsWith('.csv');
  };

  const handleFiles = (file: File) => {
    dispatch(setUploadStatus(false));
    dispatch(setPageLoading(false));
    const maxFileSize = parseInt(Config.REACT_APP_FILESIZE);
    if (validateFile(file) && file.size < maxFileSize) {
      dispatch(setSelectedFiles([file] as any));
      file.invalid = false;
      setErrorMessage('');
    } else {
      file.invalid = true;
      setErrorMessage('File not permitted');
    }
  };

  // const dragEnter = (e: any) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   dragCounter++;
  //   if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
  //     setIsDragging(true);
  //   }
  // };

  // const dragLeave = (e: any) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   dragCounter--;
  //   if (dragCounter > 0) return;
  //   setIsDragging(false);
  // };

  // const fileDrop = (e: any) => {
  //   e.preventDefault();
  //   const files = e.dataTransfer.files;
  //   if (files.length && files.length < 2 && selectedFiles.length === 0) {
  //     handleFiles(files[0]);
  //     dispatch(setUploadStatus(false));
  //     dispatch(setPageLoading(false));
  //   } else if (files.length && files.length < 2 && selectedFiles.length > 0) {
  //     dispatch(setSelectedFiles([files[0]]));
  //     dispatch(setUploadStatus(false));
  //     dispatch(setPageLoading(false));
  //   } else {
  //     setErrorMessage('Only one file is permitted');
  //   }
  //   setIsDragging(false);
  // };

  const layout = () => {
    switch (location.pathname) {
      case '/dashboard/create-data':
        return (
          <>
            <CreateData handleFiles={(files: any) => handleFiles(files)} />
            <PoliciesDialog />
          </>
        );
      case '/dashboard/history':
        return <UploadHistory />;
      case '/dashboard/help':
        return <Help />;
      case '/dashboard/consume-data':
        return <ConsumeData />;
      case '/dashboard/contract-history':
        return <ContractHistory />;
      default:
        break;
    }
  };
  return (
<<<<<<< Updated upstream
    <div
      className="max-w-screen-4xl my-0 mx-auto overflow-y-auto overflow-x-hidden h-screen block"
      onDragOver={(e: SyntheticEvent) => e.preventDefault()}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}
    >
      {!isDragging && (
        <main className="flex-1 flex flex-row justify-start min-h-screen pt-16 relative">
          <Nav getIsExpanded={(expanded: boolean) => handleExpanded(expanded)} />
          <div className="flex">
            <Sidebar isExpanded={isExpanded} />
          </div>
          {errorMessage !== '' && (
            <div className={`${isExpanded ? 'left-64' : 'left-14'} absolute top-16 z-50 w-screen`}>
              <Notification errorMessage={errorMessage} clear={() => setErrorMessage('')} />
            </div>
          )}

          <div className="flex w-screen">{layout()}</div>
        </main>
=======
    <Box
      sx={{ my: 0, mx: 'auto', overflowY: 'auto', overflowX: 'hidden', height: '100vh' }}
      // onDragOver={(e: SyntheticEvent) => e.preventDefault()}
      // onDragEnter={dragEnter}
      // onDragLeave={dragLeave}
      // onDrop={fileDrop}
    >
      {errorMessage !== '' ? (
        <Box
          sx={{
            width: 350,
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 10,
            backgroundColor: 'white',
            borderRadius: 2,
          }}
        >
          <PageNotifications
            severity="error"
            description={errorMessage}
            open
            onCloseNotification={() => setErrorMessage('')}
          />
        </Box>
      ) : (
        ''
>>>>>>> Stashed changes
      )}
      {/* {!isDragging && ( */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          pt: 8,
          height: '100%',
          position: 'relative',
        }}
      >
        <Nav getIsExpanded={(expanded: boolean) => handleExpanded(expanded)} />
        <Sidebar isExpanded={isExpanded} />
        <Box sx={{ display: 'flex', width: '100%' }}>{layout()}</Box>
      </Box>
      {/* )} */}

<<<<<<< Updated upstream
      {isDragging && (
        <div className="relative w-full h-full bg-[#03a9f4]">
          <div className="inset-x-0 inset-y-1/2 absolute z-5 flex flex-col justify-center gap-y-2 text-center">
            <span>
              <UploadFileOutlinedIcon style={{ fontSize: 60 }} sx={{ color: theme.palette.common.white }} />
            </span>
            <h1 className="text-4xl text-white">Drop it like it's hot :)</h1>
            <p className="text-lg text-white">Upload your file by dropping it in this window</p>
          </div>
        </div>
      )}
    </div>
=======
      {/* {isDragging && (
        <Box className="relative w-full h-full bg-[#03a9f4]">
          <Box sx={{}} className="inset-x-0 inset-y-1/2 absolute z-5 flex flex-col justify-center gap-y-2 text-center">
            <span>
              <UploadFileOutlinedIcon style={{ fontSize: 60 }} sx={{ color: theme.palette.common.white }} />
            </span>
            <Typography color="white" variant="h2">
              Drop it like it's hot :)
            </Typography>
            <Typography color="white" variant="h4">
              Upload your file by dropping it in this window
            </Typography>
          </Box>
        </Box>
      )} */}
    </Box>
>>>>>>> Stashed changes
  );
};

export default Dashboard;
