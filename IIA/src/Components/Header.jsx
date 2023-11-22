import { Link } from "react-router-dom"
function Header  ()  {
  return (
    <div className="">
    <div className="font-bold w-[100%] h-[150px] bg-blue-500">
      <div className=" text-5xl">Warehousing Management system</div>
      <Link to='/analysis'>
      <button className="border w-[100px] h-[40] ml-[1050px]  mt-[-20px] rounded ease-in-out duration-300 hover:text-white">Analysis</button>
      </Link>
      <Link to='/analysis2'>
      <button className="border w-[100px] h-[40] ml-[1050px]  mt-[-20px] rounded ease-in-out duration-300 hover:text-white">Analysis2</button>
      </Link>
    </div>
    </div>
  )
}

export default Header
