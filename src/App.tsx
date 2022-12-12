import useAuth from "./context/Context";
import SignIn from "./screens/singIn/singIn";
import Home from "./screens/home/home";

function App() {
  const {user} = useAuth()
  return (

    // Surely occupying children and making a reusable component is the best option, since the background and logo are always the same.
    !user ? (
      <SignIp/>
    ) : (
      <Home/>
    )
  )
}

export default App;
