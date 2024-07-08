import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as yup from "yup";
import TextInputField from "../../Componants/Shared/TextInputField";
import axios from "axios";

// Define the validation schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  retypePassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match").required("Retype Password is required"),
}).required();

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const handleSignupForm = async (data) => {
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    }; 

    try {
      const response = await axios.post('https://halal-brother-server.vercel.app/api/users/register', newUser);
      
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Registration successful!");
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        console.error('Error registering:', error);
        toast.error("Registration failed. Please try again.");
      }
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
            Register
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit(handleSignupForm)}>
          <CardBody className="flex flex-col gap-4">
            <TextInputField
              label="Name"
              type="text"
              name="name"
              size="lg"
              errors={errors}
              register={register}
            />
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
            <TextInputField
              label="Retype Password"
              type="password"
              name="retypePassword"
              size="lg"
              errors={errors}
              register={register}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth type="submit">
              Register
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Typography
                as="a"
                href="/login"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                <Link to="/login">Login</Link>
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
