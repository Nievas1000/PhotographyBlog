import { usePhotos } from "../context/PhotosContext"

const SavedPost = () =>{
    const { myPhotos, removePhoto} = usePhotos()

    return(
        <div>
            {myPhotos.map(photos =>
                 <article key={photos.id} >
                 <img src={photos.urls.regular} />
                 <p><img src={photos.user.profile_image.small} className='img-profile' /> {photos.user.username}</p>
                 <p>{[photos.description]}</p>
                 <button onClick={() => {removePhoto(photos)}} className='btn-save'>Remove</button>
               </article>
            )}
        </div>
    )
}

export default SavedPost