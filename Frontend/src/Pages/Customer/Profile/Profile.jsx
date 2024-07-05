import { Button } from "@material-tailwind/react";

export default function Profile() {
  return (
    <div className="flex justify-center">
      <div className="bg-blue-gray-500 m-4 sm:m-10 p-4 sm:p-10 flex flex-col sm:flex-row border-white rounded-lg max-w-screen-md w-full">
        <div className="w-full sm:w-40">
          <img
            className="border-white rounded w-full sm:w-auto"
            src="https://scontent.fdac8-1.fna.fbcdn.net/v/t39.30808-6/378327503_2323202168067724_5512786837058323955_n.jpg?stp=cp6_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEpKbDWaH9Agw0fwkO8whL_VOvpMrfLsshU6-kyt8uyyJ0pqkZsWcQsIQ0SU-QbeGxb_EwZ9aChQ6hVJRvtaw62&_nc_ohc=-eAGNJhpKGAQ7kNvgH_CYOU&_nc_ht=scontent.fdac8-1.fna&oh=00_AYAkJXvlp20w3D6oZfzgbyhgJ_gdOMTZITbmTkK0lfP3Ig&oe=668D3FA5"
            alt="Profile"
          />
        </div>
        <div className="mt-4 sm:mt-0 sm:pl-10 flex flex-col justify-center">
          <div className="text-white">
            <p>Name: hdufdhhf</p>
            <p>Address:</p>
            <p>Number:</p>
            <p>Email:</p>
          </div>
          <Button className="mt-4">Update Profile</Button>
        </div>
      </div>
    </div>
  );
}
