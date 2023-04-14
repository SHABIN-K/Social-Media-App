import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from "../lib/client";
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { feedQuery, searchQuery } from '../lib/data';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null)
  const { categoryId } = useParams();

  const ideaName = categoryId || 'new';
  
  useEffect(() => {
    if(categoryId){
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });

    }else {
      setLoading(true);
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId])

  if(loading) return <Spinner message={`We are adding ${ideaName} ideas to your feed!`}/>
  
  return (
    <div>{pins && (
      <MasonryLayout pins={pins}/>
    )}</div>
  )
}

export default Feed;