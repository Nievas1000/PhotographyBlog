import axios from "axios"
import { useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import { useContext } from "react"
import { usePathName } from "../hooks/usePathNames"

const Settings = () =>{
    const [file, setFile] = useState(null)
    const {user} = useContext(AuthContext)

    const sendPhoto = async (e) =>{
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('image', file)
        try {
            let result = await axios.post(`http://localhost:3001/sendphoto/${user.id}`,formdata)

        } catch (error) {
            console.log(error)
        }
    }
    const selectedHandler = e => {
        setFile(e.target.files[0])
      }

    return(
        <div className="container-settings">
            <div className="settings">
                <div className="form-setting">
                    <h1 style={{marginBottom:30}}>Setting profile</h1>
                    <div className="mb-3">
                        <h5  className="form-label">Name</h5>
                        <input name="name" type="text" className="form-control" id="formGroupExampleInput" />
                    </div>
                    <div className="mb-3">
                        <h5 className="form-label">Last Name</h5>
                        <input name="lastname" type="text" className="form-control" id="formGroupExampleInput2" />
                    </div>
                    <div className="mb-3">
                        <h5 name="email" className="form-label">Email</h5>
                        <input type="text" className="form-control" id="formGroupExampleInput2" />
                    </div>
                    <div className="mb-3">
                        <h5 className="form-label">Add a description</h5>
                        <textarea name="description" className="form-control"  id="floatingTextarea2" style={{height: 100}}></textarea>
                    </div>
                    <div className="mb-3">
                        <h5 className="form-label">Add a profile photo</h5>
                        <input onChange={selectedHandler} className="form-control" type="file" id="formFileMultiple" multiple/>
                        <button type="submit" className="btn btn-dark" style={{marginTop: 20}} onClick={sendPhoto}>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings