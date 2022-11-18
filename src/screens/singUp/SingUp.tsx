import useAuth from '../../context/Context'
import { useForm, SubmitHandler } from "react-hook-form";
import loader from "../../assets/loader.svg"
import logo from "../../assets/logo.svg"
import './index.css'

type Inputs = {
    email: string,
    password: string,
};

const SignUp = () => {
    const { error, signIn, loading } = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async ({ email, password }: Inputs) => {
        await signIn(email, password)
    }

    return (
        <main className="main-container">
            <img className="logo-image" src={logo} alt="Logo image" />
            <div className="login-wrapper">
                <div className="text-container">
                    <h1>Welcome, Stranger!</h1>
                    <span>Please log in to this form if you wish to pass the exam.</span>
                </div>
                <form className="form-container" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input className={errors.email ? "input error-email" : "input"} {...register("email", {
                            required: "Incorrect email.", pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Incorrect email structure."
                            }
                        })} type="text" placeholder="Email" />
                        {
                            errors.email && (
                                <span>
                                    {errors.email.message}
                                </span>
                            )
                        }
                    </div>
                    <div>
                        <input className={errors.password ? "input error-password" : "input"} {...register("password", {
                            required: "Incorrect password.", minLength: {
                                value: 4,
                                message: "Minimum length is 4."
                            }
                        })} type="password" placeholder="Password" />
                        {
                            errors.password && (
                                <span>
                                    {errors.password.message}
                                </span>
                            )
                        }
                    </div>
                    <button type="submit">{loading ? <img src={loader} alt="loading" /> : <span>Login →</span>}</button>
                    {
                        error && (
                            <span>
                            {error.error}
                            </span>
                        )
                    }
                </form>
            </div>
        </main>
    )
}

export default SignUp