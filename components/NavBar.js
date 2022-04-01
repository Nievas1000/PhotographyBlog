import Link from 'next/link'
import { Formik, Form, Field } from 'formik'
import { usePhotos } from '../context/PhotosContext'
import { CgProfile } from "react-icons/cg";
import MenuUser from './MenuUser'
import useMenu from '../hooks/useMenu';

const NavBar = () =>{
    const {setPhotos, setVisible} = usePhotos()
    const [visibleMenu, showMenu] = useMenu()

    const getPhotos = async (values) =>{
        const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}` , {
          headers:{
            'Authorization':'Client-ID Q475s4L3OnPULK8fgwgK-tGlpDyjHRL6-BOuN5LeBWs'
          }
        })
        const data = await response.json()
        setPhotos(data.results)
        setVisible("search")
    }
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <h1 onClick={()=>{setVisible("home")}} className='title-navbar' href="/">BlogKing</h1>
                        <Formik 
                        initialValues={{search:''}}
                        onSubmit={getPhotos}>
                            <Form className="d-flex">
                                <Field className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="search"/>
                            </Form>
                            </Formik>
                            <ul className="navbar-nav">
                                <li className="nav-item" onClick={()=>{setVisible("home")}}>
                                    <Link className="nav-link" aria-current="page" href="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/">Present</Link>
                                </li>
                                <li className="nav-item">
                                    <CgProfile  onClick={showMenu} style={{fontSize:30}} />
                                </li>                               
                                {visibleMenu ? <MenuUser /> : null}
                            </ul>
                    </div>      
                </div>
            </nav>
        </div>
    )
}

export default NavBar