import useAuth from "./context/Context";
import SignUp from "./screens/singUp/SingUp";
import Home from "./screens/home/Home";

function App() {
  const {user} = useAuth()
  return (

    // Surely occupying children and making a reusable component is the best option, since the background and logo are always the same.
    !user ? (
      <SignUp/>
    ) : (
      <Home/>
    )
  )
}

export default App;
