import AccountNav from "../components/account/AccountNav";
import { Outlet } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../UserContext"
import { Navigate } from "react-router-dom";


export default function AccountLayout() {
  const { ready, user } = useContext(UserContext);


  if (ready && !user){
    return <Navigate to="/login"/>
}

    return (
      <div id="adminPanelFlex" className="flex flex-row-reverse">
        <div  className=" flex-shrink-0 bg-gray-200 	">
          <div id="sideNavAdmin" className=" fixed right-0 top-0 h-full ">
            <AccountNav />
          </div>
        </div>
        <div id="outletAdmin" className="mt-4  w-full">
          <Outlet />
        </div>
      </div>
    );
  }
  