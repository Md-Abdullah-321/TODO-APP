import { NavLink, useNavigate } from "react-router-dom";


function Navbar() {
  // const [login, setLogin] = useState(true);
  const navigate = useNavigate();


  const handleClick = async(e) => {
    e.preventDefault();

    const res = await fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });
    localStorage.removeItem("name");
    navigate('/login')
  }
  let name = localStorage.getItem('name')
  return (
    <div>
      {name && <div>
    <div className="w-10/12 md:w-8/12 mx-auto py-2 font-mono text-xl font-bolder">
      <ul className="flex justify-between items-center">
           <li>
           <NavLink to='/logout' onClick={handleClick} className='hover:border-b-4 border-Primary-Color pb-1 px-2 rounded-md bg-Secondary-Color p-1 font-semibold text-Primary-Color uppercase'> Logout </NavLink>
           </li>
           <li className="text-Primary-Color font-bold uppercase">{name}</li>
        </ul>
    </div>
 </div>}
    </div>
  );
}

export default Navbar;
