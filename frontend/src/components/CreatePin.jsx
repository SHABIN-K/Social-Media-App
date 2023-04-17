import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
//from local files
import { categories } from '../lib/categories';
import { client } from '../lib/client';
import Spinner from './Spinner';
 

const CreatePin = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  
  return (
    <div>CreatePin</div>
  )
}

export default CreatePin