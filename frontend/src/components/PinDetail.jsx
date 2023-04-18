import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { MdDownloadForOffline } from 'react-icons/md';

import { client, urlFor } from '../lib/client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../lib/data';
import Spinner from './Spinner';

const PinDetail = ({user}) => {
  return <div>PinDetail</div>;
};

export default PinDetail;
