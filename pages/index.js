import { usePhotos } from '../context/PhotosContext'

export default function Home({images}) {
  const {photos, visibleHome, savePhoto, myPhotos} = usePhotos()

  
  return (
    <div className='container-home'>
      <div className="center">
          {visibleHome === "home" ? images.map(photos =>
            <article key={photos.id} >
              <img src={photos.urls.regular}/>
              <p><img src={photos.user.profile_image.small} className='img-profile' /> {photos.user.username}</p>
              <p>{[photos.description, photos.alt_description]}</p>
              <button className='btn-save' onClick={() => {savePhoto(photos)}}>Save</button>
            </article>) 
            : 
            photos.map(photos =>
              <article key={photos.id} >
                <img src={photos.urls.regular} />
                <p><img src={photos.user.profile_image.small} className='img-profile' /> {photos.user.username}</p>
                <p>{[photos.description]}</p>
                <button onClick={() => {savePhoto(photos)}} className='btn-save'>Save</button>
              </article>)}
      </div>             
    </div>
  )
}

export const getStaticProps = async () =>{

  const response = await fetch('https://api.unsplash.com/photos?per_page=20', {
                      headers:{
                        'Authorization':'Client-ID Q475s4L3OnPULK8fgwgK-tGlpDyjHRL6-BOuN5LeBWs'
                      }
                    })
  const images = await response.json()


  return{
      props: {images}
  }
}


