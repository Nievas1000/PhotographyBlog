import { CgProfile } from "react-icons/cg";
import { BsSave2 } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import { CgLogIn } from "react-icons/cg";
import AuthContext from "../context/AuthContext"
import { useContext } from "react"
import Link from "next/link";
import axios from "axios";

const MenuUser = () =>{
    const {isLogged, setIsLogged,saveUser} = useContext(AuthContext)

    const closeSession = async () =>{
        try {
          await axios.get('http://localhost:3001/logout');
          setIsLogged(false)
          saveUser(null)
        } catch (error) {
          console.log(error)
        }
      }

    return(
        <div className="menu">
            <ul>    
                {isLogged ?<> <li className="item-menu"><CgProfile style={{fontSize:25, marginRight:10}} /> <Link href="/profile">Profile</Link> </li>
                <li className="item-menu"><BsSave2 style={{fontSize:25, marginRight:10}} /><Link href="/savedpost" >Saved</Link></li>
                <li className="item-menu-setting"><IoSettingsOutline style={{fontSize:25, marginRight:10}} /> <Link href="/settings">Settings</Link></li></> : null}
                {isLogged ?
                <li className="item-menu" onClick={closeSession}> <CgLogOut style={{fontSize:25, marginRight:10}} />Log off</li>
                :
                <li className="item-menu"  ><CgLogIn style={{fontSize:25, marginRight:10}} /><Link href="/signin">Log in</Link></li>}
            </ul>
        </div>
    )
}

export default MenuUser