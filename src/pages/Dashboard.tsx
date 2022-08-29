/* eslint-disable @typescript-eslint/no-explicit-any */
// Copyright 2022 Catena-X
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { SyntheticEvent, useState } from 'react';
import styles from '../styles.module.scss';
import { useLocation } from 'react-router-dom';
import '../styles/Table.scss';

// components
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import Notification from '../components/Notification';

// models
import { CsvTypes, ProcessReport, Status } from '../models/ProcessReport';
import { File } from '../models/File';
import { FileType } from '../models/FileType';

// utils
import { Help } from './Help';
import UploadHistory from './UploadHistory';
import CreateData from './CreateData';
import { toast } from 'react-toastify';
import { toastProps } from '../helpers/ToastOptions';
import { Config } from '../utils/config';
import DftService from '../services/DftService';
import dft from '../api/dft';
import UserService from '../services/UserService';

interface IMetaData {
  accessType: string;
  bpnList: string[];
}

const Dashboard: React.FC = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadStatus, setUploadStatus] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [currentUploadData, setUploadData] = useState<ProcessReport>({
    processId: '',
    csvType: CsvTypes.unknown,
    numberOfItems: 0,
    numberOfFailedItems: 0,
    numberOfSucceededItems: 0,
    status: Status.inProgress,
    startDate: '',
    endDate: undefined,
  });
  const [metaData, setMetaData] = useState<IMetaData>({
    accessType: 'restricted',
    bpnList: [],
  });
  let dragCounter = 0;

  const handleExpanded = (expanded: boolean) => {
    setIsExpanded(expanded);
  };

  const validateFile = (file: File) => {
    const validTypes: string[] = Object.values(FileType);
    return validTypes.includes(file.type) || file.name.endsWith('.csv');
  };

  const handleFiles = (file: File) => {
    setUploadStatus(false);
    setUploading(false);
    const maxFileSize = parseInt(Config.REACT_APP_FILESIZE);
    if (validateFile(file) && file.size < maxFileSize) {
      setSelectedFiles([file]);
      file.invalid = false;
      setErrorMessage('');
    } else {
      file.invalid = true;
      setErrorMessage('File not permitted');
    }
  };

  // eslint-disable-next-line
  const dragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  // eslint-disable-next-line
  const dragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter--;
    if (dragCounter > 0) return;
    setIsDragging(false);
  };

  const removeSelectedFiles = (clearState: boolean) => {
    if (clearState) setSelectedFiles([]);
    setUploadStatus(false);
    setUploading(false);
  };

  // eslint-disable-next-line
  const fileDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length && files.length < 2 && selectedFiles.length === 0) {
      handleFiles(files[0]);
      setUploadStatus(false);
      setUploading(false);
    } else if (files.length && files.length < 2 && selectedFiles.length > 0) {
      setSelectedFiles([files[0]]);
      setUploadStatus(false);
      setUploading(false);
    } else {
      setErrorMessage('Only one file is permitted');
    }
    setIsDragging(false);
  };

  const clearUpload = () => {
    setTimeout(() => {
      setUploading(false);
      setUploadStatus(true);
    }, 1000);
  };

  const processingReport = (r: { data: ProcessReport }, processId: string) => {
    setUploadData(r.data);
    if (r && r.data && r.data.status !== Status.completed && r.data.status !== Status.failed) {
      // if status !== 'COMPLETED' && status !== 'FAILED' -> set interval with 2 seconds to refresh data
      const interval = setInterval(
        () =>
          DftService.getInstance()
            .getReportById(processId)
            .then(result => {
              setUploadData(result.data);
              if (result?.data?.status === Status.completed || result.data.status === Status.failed) {
                clearInterval(interval);
                clearUpload();
              }
            }),
        2000,
      );
    } else {
      clearUpload();

      if (r && r.data && r.data.status === Status.completed && r.data.numberOfFailedItems === 0) {
        toast.success('Upload completed!', toastProps());
      } else if (r && r.data && r.data.status === Status.completed && r.data.numberOfFailedItems > 0) {
        toast.warning('Upload completed with warnings!', toastProps());
      } else {
        toast.error('Upload failed!', toastProps());
      }
    }
  };

  const processingReportFirstCall = (processId: string) => {
    setUploadData({
      processId: '',
      csvType: CsvTypes.unknown,
      numberOfItems: 0,
      numberOfFailedItems: 0,
      numberOfSucceededItems: 0,
      status: Status.inProgress,
      startDate: '',
      endDate: undefined,
    });

    setTimeout(async () => {
      DftService.getInstance()
        .getReportById(processId)
        .then(r => {
          processingReport(r, processId);
        })
        .catch(error => {
          // if process id not ready - repeat request
          if (error.response.status === 404) {
            processingReportFirstCall(processId);
          } else {
            clearUpload();
          }
        });
    }, 2000);
  };

  const onAccessPolicyUpdate = (data: any) => setMetaData(data);
  // eslint-disable-next-line
  const uploadFile = async (e: any) => {
    e.preventDefault();
    setUploading(true);
    setUploadData({
      processId: '',
      csvType: CsvTypes.unknown,
      numberOfItems: 0,
      numberOfFailedItems: 0,
      numberOfSucceededItems: 0,
      status: Status.inProgress,
      startDate: '',
      endDate: undefined,
    });

    const uploadMetaData = {
      bpn_numbers: metaData.accessType === 'restricted' ? metaData.bpnList : [],
      type_of_access: metaData.accessType,
    };
    const formData = new FormData();
    // eslint-disable-next-line
    formData.append('file', selectedFiles[0] as any);
    formData.append('meta_data', JSON.stringify(uploadMetaData));

    dft
      .post('/upload', formData, {
        headers: {
          Authorization: `Bearer ${UserService.getToken()}`,
        },
      })
      .then(resp => {
        const processId = resp.data;
        // first call
        processingReportFirstCall(processId);
      })
      .catch(() => {
        setUploadData({ ...currentUploadData, status: Status.failed });
        clearUpload();
      });
  };

  const layout = () => {
    switch (location.pathname) {
      case '/dashboard/create-data':
        return (
          <CreateData
            processingReportFirstCall={processingReportFirstCall}
            setUploading={setUploading}
            uploading={uploading}
            currentUploadData={currentUploadData}
            setUploadData={setUploadData}
            uploadStatus={uploadStatus}
            selectedFiles={selectedFiles}
            setUploadStatus={setUploadStatus}
            handleFiles={(files: any) => handleFiles(files)}
            uploadFile={(e: any) => uploadFile(e)}
            removeSelectedFiles={removeSelectedFiles}
            onAccessPolicyUpdate={onAccessPolicyUpdate}
          />
        );
      case '/dashboard/history':
        return <UploadHistory />;
      case '/dashboard/help':
        return <Help />;
      default:
        break;
    }
  };

  return (
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
      )}

      {isDragging && (
        <div className="relative w-full h-full bg-[#03a9f4]">
          <div className="inset-x-0 inset-y-1/2 absolute z-5 flex flex-col justify-center gap-y-2 text-center">
            <span>
              <UploadFileOutlinedIcon style={{ fontSize: 60 }} sx={{ color: styles.white }} />
            </span>
            <h1 className="text-4xl text-white">Drop it like it's hot :)</h1>
            <p className="text-lg text-white">Upload your file by dropping it in this window</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
