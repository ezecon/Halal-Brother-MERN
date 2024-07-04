import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as yup from "yup";
import TextInputField from "../../Componants/Shared/TextInputField";
import axios from "axios";

const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
}).required();

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const handleLoginForm = async (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', user);
      
      if (response.data.error) {
        toast.error(response.data.error); 
      } else {
        toast.success("Login successful!");
        localStorage.setItem('token', response.data.token);
        navigate('/'); 
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Login failed. Please try again.";
      toast.error(errorMessage);
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Login
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit(handleLoginForm)}>
          <CardBody className="flex flex-col gap-4">
            <TextInputField
              label="Email"
              type="email"
              name="email"
              size="lg"
              errors={errors}
              register={register}
            />
            <TextInputField
              label="Password"
              type="password"
              name="password"
              size="lg"
              errors={errors}
              register={register}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth type="submit">
              Login
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/register" className="ml-1 font-bold text-blue-gray">
                Register
              </Link>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
