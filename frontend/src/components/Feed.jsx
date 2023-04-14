import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from "../lib/client";
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  
  useEffect(() => {
    if(categoryId){
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {

      });

    }else {

    }
  }, [categoryId])
  
  if(loading) return <Spinner/>
  
  return (
    <div>Feed</div>
  )
}

export default Feed;