import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "./utils/userSlice";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  console.log(user.user);
  // if(user.user.length) console.log("false");
  // else console.log("true");
  const navigate = useNavigate();
  useEffect(() => {
    // Check if the user array has data
    if (user.user.length) {
      console.log("User data exists");
    } else {
      console.log("User data does not exist, navigating to login");
      // Navigate to the login page
      navigate("/login", { replace: true });
    }
  }, [user.user]);

  const handlesignout = () => {
    dispatch(removeUser());
  };

  return (
    <>
      {user.user.length ? (
        <>
          <div className="bg-[#071e34]">
            <button
              className="absolute top-6 right-6 text-emerald-400 bg-gray-800 rounded-lg p-2"
              onClick={handlesignout}
            >
              SignOut
            </button>
          </div>

          <div className="bg-[#071e34] flex justify-center items-center h-screen text-white">
            <div className="w-84 h-fit mx-auto bg-[#20354b] bg-red-50 rounded-lg">
              <div className="mt-6 w-fit mx-auto">
                <img
                  className="rounded-full w-20"
                  src="http://res.cloudinary.com/dowwcdnts/image/upload/v1703786728/tietpasyoxhbynoohooo.jpg"
                />
              </div>
              <div className="mt-3 w-fit mx-6">
                <h1 className="mx-3 text-2xl"> {user.user[0]?.username}</h1>
                <h1 className="mx-3 text-xl"> {user.user[0]?.fullName}</h1>
                <h1 className="mx-3 text-xl"> {user.user[0]?.email}</h1>

                <h1 className="mx-3 text-xl mb-6">
                  <span className="text-emerald-400">Created by: </span>
                  {new Date(user.user[0]?.createdAt).getFullYear()}
                </h1>
                <div className="">
                  <Link
                    className="text-emerald-400 bg-gray-800 rounded-lg p-2 mx-10 font-semibold  "
                    to={"/browse"}
                  >
                    Check More Info
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>
          user does not <button></button>exist please log in
        </h1>
      )}
    </>
  );
}

export default App;
