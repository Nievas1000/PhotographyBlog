import { createContext, useContext, useState } from "react";


export const PhotosContext = createContext()

export const usePhotos = () => {return useContext(PhotosContext)}

export const PhotosProvider = ({children}) =>{
    const [photos, setPhotos]=useState([])
    const [visibleHome, setVisible] = useState("home")
    const [myPhotos, setMyPhotos] = useState([])
    const [amountMyPhotos, setAmount] = useState(0)

    const savePhoto = (photo) =>{
        if(myPhotos.find(x => x.id === photo.id)){
            return alert("You already have this photo in your gallery")
        }
        setMyPhotos([
            ...myPhotos,
            photo,
        ])
        setAmount(amountMyPhotos + 1)
    }

    const removePhoto = (photo) =>{
        let indice = myPhotos.indexOf(myPhotos.find(x => x.id === photo.id))
        myPhotos.splice(indice,1)
        setMyPhotos([...myPhotos])
        setAmount(amountMyPhotos - 1)
    }


    return(
        <PhotosContext.Provider value={{photos, setPhotos, visibleHome, setVisible, myPhotos, savePhoto, removePhoto, amountMyPhotos}}>{children}</PhotosContext.Provider>
    )
}