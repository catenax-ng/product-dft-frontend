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

import { useRef } from 'react';
import { FileSize } from '../models/FileSize';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import styles from '../styles.module.scss';
import { useAppDispatch, useAppSelector } from '../store/store';
import { removeSelectedFiles } from '../store/providerSlice';

// eslint-disable-next-line
const UploadForm = (props: any) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { selectedFiles, uploadStatus } = useAppSelector(state => state.providerSlice);

  const fileInputClicked = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const filesSelected = () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      props.getSelectedFiles(fileInputRef.current.files[0]);
    }
  };

  const fileSize = (size: number) => {
    if (size === 0) return '0 Bytes';
    const k = 1024;
    const sizes: string[] = Object.keys(FileSize);
    const i = Math.floor(Math.log(size) / Math.log(k));
    return `${parseFloat((size / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className="flex flex-col py-9">
      <h4 className=" text-3xl font-sans text-[#444444] text-center mb-5">Upload a file </h4>
      <div className="border border-dashed  border-3  flex flex-row justify-center w-auto h-full items-center">
        <div className="flex flex-col gap-y-4 mx-20 ">
          <div className="py-6 px-4 flex flex-col items-center gap-x-4 relative">
            <input
              id="round"
              ref={fileInputRef}
              type="file"
              onClick={fileInputClicked}
              onChange={filesSelected}
              className="hidden"
            />
            <CloudUploadIcon sx={{ fontSize: 40, color: styles.grey }} />
            <h2 className=" my-1">Drag and drop your file on this page</h2>
            <h2 className=" my-1">or</h2>

            <label
              htmlFor="round"
              className="relative rounded-md cursor-pointer p-2 text-sky-500  border items-center hover:bg-[#efefef]"
            >
              CHOOSE A FILE
            </label>
          </div>
        </div>
      </div>
      &nbsp;
      <div>
        <ul>
          <li>The upload must be performed in the following order:</li>
          <li> 1 - serialPartTypization.csv </li>
          <li> 2 - batch.csv </li>
          <li> 3 - assemblyPartRelationship.csv</li>
        </ul>
      </div>
      {selectedFiles.length && !uploadStatus ? (
        <div className="flex flex-col mt-5 ">
          <label htmlFor="" className="font-bold text-[#000000] block mb-5  text-left ">
            Selected file
          </label>

          <div className="flex justify-between bg-[#f1f1f1] p-2">
            <div className="flex flex-row items-center gap-x-4 relative">
              <UploadFileIcon className="ml-2" />
              <div className="flex flex-row gap-x-4 items-center">
                <p className="text-md">{selectedFiles[0].name}</p>
                <p className="text-sm">({fileSize(selectedFiles[0].size)})</p>
              </div>
            </div>
            <span className="p-2 cursor-pointer">
              <button className="text-[#212121] text-sm" onClick={() => dispatch(removeSelectedFiles())}>
                <CloseIcon />
              </button>
            </span>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default UploadForm;
