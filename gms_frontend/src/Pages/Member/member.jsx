import React, { useEffect, useState } from "react";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MemberCard from "../../Components/Membercard/membercard";
import Modal from "../../Components/Modal/modal";
import Addmembership from "../../Components/AddMembership/addmembership";
import AddMember from "../../Components/addmember/addmember";
import axios from "axios";
import { toast } from "react-toastify";

const Member = () => {
  const [addMembership, setAddmembership] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [startFrom, setstartFrom] = useState(0);
  const [endTo, setendTo] = useState(9);
  const [totalData, settotalData] = useState(0);
  const [noofpage, setnoofpage] = useState(0);
  const [limit] = useState(9);
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearchModeOn, setIsSearchModeOn] = useState(false);

  const handleSearchData = async () => {
    if (search.trim() === "") return;
    setIsSearchModeOn(true);

    try {
      const res = await axios.get(
        `http://localhost:4000/members/searched-members?searchTerm=${search}`,
        { withCredentials: true }
      );
      setMembers(res.data.members);
    } catch (err) {
      console.log(err);
      toast.error("Technical Fault");
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    setIsSearchModeOn(false);
    fetchData(); // restore paginated members
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/members/all-member?skip=${startFrom}&limit=${limit}`,
        { withCredentials: true }
      );

      const total = res.data.totalMembers;
      const fetchedMembers = res.data.members;

      settotalData(total);
      setMembers(fetchedMembers);

      let extraPage = total % limit === 0 ? 0 : 1;
      let totalPage = parseInt(total / limit) + extraPage;
      setnoofpage(totalPage);

      if (total === 0) {
        setstartFrom(-1);
        setendTo(0);
      } else {
        setendTo(Math.min(startFrom + limit, total));
      }
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  useEffect(() => {
    if (!isSearchModeOn) {
      fetchData();
    }
  }, [startFrom]);

  const handleMembership = () => {
    setAddmembership((prev) => !prev);
  };

  const handleAddMember = () => {
    setAddMember((prev) => !prev);
  };

  const handlePrev = () => {
    if (currentPage !== 1) {
      const currPage = currentPage - 1;
      setcurrentPage(currPage);
      const from = (currPage - 1) * limit;
      setstartFrom(from);
    }
  };

  const handleNext = () => {
    if (currentPage !== noofpage) {
      const currPage = currentPage + 1;
      setcurrentPage(currPage);
      const from = (currPage - 1) * limit;
      setstartFrom(from);
    }
  };

  return (
    <div className="text-black p-5 w-full min-h-screen">
      {/* Top Banner */}
      <div className="border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3">
        <div
          className="border-2 px-4 py-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black"
          onClick={handleAddMember}
        >
          Add Member <FitnessCenterIcon />
        </div>
        <div
          className="border-2 px-4 py-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black"
          onClick={handleMembership}
        >
          Membership <AddIcon />
        </div>
      </div>

      {/* Back Link */}
      <Link
        to={"/dashboard"}
        className="flex items-center mt-4 text-slate-800 hover:underline"
      >
        <ArrowBackIcon /> Back to Dashboard Page
      </Link>

      {/* Search Bar */}
      <div className="mt-5 w-full flex items-center gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 w-full p-2 rounded-lg"
          placeholder="Search By Name or Mobile No"
        />
        <div
          className="bg-slate-900 p-3 border-2 text-white rounded-lg cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black"
          onClick={handleSearchData}
        >
          <SearchIcon />
        </div>
        {isSearchModeOn && (
          <button
            onClick={handleClearSearch}
            className="text-red-500 underline ml-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* Count and Pagination */}
      <div className="mt-4 flex justify-between items-center text-slate-900 text-xl">
        <div>
          {isSearchModeOn
            ? `Searched Members: ${members.length}`
            : `Total Members: ${totalData}`}
        </div>

        {!isSearchModeOn && (
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-full cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white transition duration-300 ${
                currentPage === 1 ? "bg-gray-200 text-gray-400" : ""
              }`}
              onClick={handlePrev}
            >
              <ChevronLeftIcon />
            </div>
            <div>
              {startFrom + 1} - {endTo} of {totalData} Members
            </div>
            <div
              className={`p-2 rounded-full cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white transition duration-300 ${
                currentPage === noofpage ? "bg-gray-200 text-gray-400" : ""
              }`}
              onClick={handleNext}
            >
              <ChevronRightIcon />
            </div>
          </div>
        )}
      </div>

      {/* Member Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {members.length > 0 ? (
          members.map((member) => (
            <MemberCard key={member._id} member={member} />
          ))
        ) : (
          <div className="text-gray-500 col-span-full text-center">
            No members found
          </div>
        )}
      </div>

      {/* Modals */}
      {addMembership && (
        <Modal
          handleClose={handleMembership}
          content={<Addmembership handleClose={handleMembership} />}
          header="Add Membership"
        />
      )}
      {addMember && (
        <Modal
          handleClose={handleAddMember}
          content={<AddMember handleClose={handleAddMember} />}
          header="Add New Member"
        />
      )}
    </div>
  );
};

export default Member;
