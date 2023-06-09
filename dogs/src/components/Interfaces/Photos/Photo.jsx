import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { PHOTO_GET } from '../../../API/api';
import Error from "../Error"
import Loading from "../Loading"
import PhotoContent from './PhotoContent'
import { Head } from '../Head';


const Photo = () => {
  const {id} =  useParams()
  const {data, loading, error, request} = useFetch()
  React.useEffect(()=>{
    const{url, options} = PHOTO_GET(id)
    request(url,options)
  },[request,id])
  if(error) return <Error error={error} />
  if(loading) return <Loading />
  if(data) 
    return (
      <>
        <Head
          title={data.photo.title}
        />
        <section className="container mainContainer"> <PhotoContent data={data} single={true}/></section>;
      </>
    )
  else return null
};

export default Photo;
