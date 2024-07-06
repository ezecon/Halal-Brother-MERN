import { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../../Hook/useToken";
import axios from "axios";
import { FaIceCream,FaCartPlus } from "react-icons/fa";
import { MdTableRestaurant } from "react-icons/md";

export function NavMenu() {
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/verifyToken', { token });

        if (response.status === 200 && response.data.valid) {
          setUserID(response.data.decoded.id);
          console.log(response.data.decoded.id)

        } else {
          console.log("Token verification failed:", response.data);
          removeToken();
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        removeToken();
      }
    };

    verifyToken();
  }, [token, navigate, removeToken]);


  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-white"
      >
        <div className="flex">
          <MdTableRestaurant className="pr-1 text-2xl"/>
        <a href="/reservation" className="flex items-center">
          Reservation
        </a>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-white"
      >
        <div className="flex">
          <FaIceCream className="pr-1 text-2xl"/>
        <a href="/products" className="flex items-center">
          Order Now
        </a>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-white"
      >
        <div className="flex">
          <FaCartPlus className="pr-1 text-2xl"/>
        <a href="/cart" className="flex items-center">
          Cart
        </a>
        </div>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 bg-black text-white">
      <div className="container mx-auto flex items-center justify-between">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium playwrite-gb-s-regular"
        >
         <Link to="/"> <span className="crimson">H</span>alal <span className="crimson">B</span>rothers</Link>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-1">
          {token ? (
            
            <Menu>
                  <MenuHandler>
                  <Avatar
                          src="https://scontent.fdac8-1.fna.fbcdn.net/v/t39.30808-6/378327503_2323202168067724_5512786837058323955_n.jpg?stp=cp6_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEpKbDWaH9Agw0fwkO8whL_VOvpMrfLsshU6-kyt8uyyJ0pqkZsWcQsIQ0SU-QbeGxb_EwZ9aChQ6hVJRvtaw62&_nc_ohc=-eAGNJhpKGAQ7kNvgH_CYOU&_nc_ht=scontent.fdac8-1.fna&oh=00_AYAkJXvlp20w3D6oZfzgbyhgJ_gdOMTZITbmTkK0lfP3Ig&oe=668D3FA5"
                          alt="avatar"
                          withBorder={true}
                          className="p-0.5 border-red-50"
                        />
                  </MenuHandler>
                  <MenuList>
                    <Link to="/profile"><MenuItem>Profile</MenuItem></Link>
                    <MenuItem>Dashboard</MenuItem>
                    <MenuItem>Logout</MenuItem>
                  </MenuList>
           </Menu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="text" size="sm" className="hidden lg:inline-block text-white">
                  <span>Log In</span>
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="gradient" size="sm" className="hidden lg:inline-block check-button">
                  <span>Sign In</span>
                </Button>
              </Link>
            </>
          )}
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex items-center gap-x-1">
            <Link to="/login">
              <Button fullWidth variant="text" size="sm" className="text-white">
                <span>Log In</span>
              </Button>
            </Link>
            <Link to="/register">
              <Button fullWidth variant="text" size="sm" className="text-white">
                <span>Sign In</span>
              </Button>
            </Link>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}
