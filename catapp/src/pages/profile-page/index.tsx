import Footer from "../../components/Footer"
import Profile from "../../components/Profile"
import Sidebar from "../../components/sidebar/Sidebar"

interface Props {}

const ProfilePage = (props: Props) => {
    return(
        <div>
            <Sidebar />
            <Profile />
        </div>
    )
}

export default ProfilePage 