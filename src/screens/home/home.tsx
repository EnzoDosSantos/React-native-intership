import useAuth from "../../context/Context"
import door from "../../assets/door.svg"
import logo from "../../assets/logo.svg"
import loader from "../../assets/loader.svg"
import "./index.css"

const Home = () => {
    const { user, isLoading, logout } = useAuth()
    return (
        <main className="home-container">
            <img className="logo-image" src={logo} alt="Logo image" />
            <div className="home-wrapper">
                <div>
                    <img src={user?.avatar} alt={user?.name} />
                    <span>That’s it, {user?.name}!</span>
                    <button onClick={logout}>
                        {
                        isLoading ? 
                        <img src={loader} alt="loader" />
                        :
                        <>
                        <img src={door} alt="logout icon" />
                        Logout
                        </>
                    }
                    </button>
                </div>
            </div>
        </main>
    )
}

export default Home