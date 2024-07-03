import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import TextInputField from "../../Componants/Shared/TextInputField";


export default function Signup() {
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
      <form >
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
  )
}
