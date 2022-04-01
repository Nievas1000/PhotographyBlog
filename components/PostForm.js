import { Formik, Form, Field, ErrorMessage } from "formik"
import { useState, useContext } from "react"
import AuthContext from "../context/AuthContext"
import axios from "axios"

const validate = (values) =>{
    const errors ={}
    if(!values.title){
        errors.title = 'Requerido'
    }else if(!values.description){
      errors.description = 'Requerido'
    }else if(!values.image){
        errors.image = 'Requerido'
    }
        
    return errors
}
const PostForm = () =>{
    const initialValues = {title:'', description:''}
    const [file, setFile] = useState(null)
    const {user} = useContext(AuthContext)

    const createPost = async (post) =>{
        console.log(post)
    }

    const sendPhoto = async (e) =>{
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('image', file)
        try {
            let result = await axios.post(`http://localhost:3001/createpost/${user.id}`,formdata)

        } catch (error) {
            console.log(error)
        }
    }
    const selectedHandler = e => {
        setFile(e.target.files[0])
    }
    
    return(
        <div className="login">
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={(values, actions) =>{
                    createPost(values)
                    actions.resetForm(initialValues)
                }}
            >
            <Form className="login-form">
              <Field name="title" type="text" placeholder="Title"/>
              <ErrorMessage className="validation" name="title"/>
              <br/>
              <Field name="description" type="text" placeholder="Description"/>
              <ErrorMessage className="validation" name="description"/>
              <input onChange={selectedHandler} className="form-control" type="file" id="formFileMultiple" multiple style={{marginLeft: 50}}/>
              <ErrorMessage className="validation" name="image"/>
              <br/>
              <button type="submit" className="login-button"> Send </button>
            </Form>
            </Formik>
        </div>
    )
}

export default PostForm