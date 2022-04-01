import AuthContext from "../context/AuthContext"
import { useContext, useState } from "react"
import { usePathName } from "../hooks/usePathNames"
import Image from "next/image"
import { usePhotos } from "../context/PhotosContext"
import Link from "next/link"
import PostForm from "../components/PostForm"

const Profile = () =>{
    usePathName()
    const {user} = useContext(AuthContext)
    const {amountMyPhotos} = usePhotos()
    const [visibleForm, setForm] = useState()

    const showForm = () =>{
        setForm(!visibleForm)
    }

    return(
        <div>
            <div className="container profile-data">
                <div className="img-user">
                    <img src={user.img_profile ? "http://localhost:3001/"+user.img_profile : "/usuario.png"} width={200} height={200} />
                </div>
                <div className="data-user">
                    <div className="setting-user">
                        <button><Link href="/settings">Edit profile</Link></button>
                    </div>
                    <h1>{user.name} {user.lastname} </h1>
                    <h5>{user.email}</h5>
                    <ul className="amounts">
                        <li><strong>0</strong> Post created</li>
                        <li><strong>{amountMyPhotos}</strong> <Link href="/savedpost">Post saved</Link></li>
                    </ul>
                    <p>Aca va a ir la descripcion</p>
                </div>
            </div>
            <button onClick={showForm}>Create Post</button>
            {visibleForm ? <PostForm /> : null}
        </div>
    )
}

export default Profile