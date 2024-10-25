import {
  Calendar,
  Copy,
  Eye,
  PencilLine,
  Trash2,
  Share2,
  X,
} from "lucide-react";
import telegram from "../assets/telegram.svg";
import whatsapp from "../assets/whatsapp.svg";
import facebook from "../assets/facebook.svg";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react"; // Import useState
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/formatDate";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedPaste, setSelectedPaste] = useState(null);

  const handleShareClick = (paste) => {
    setSelectedPaste(paste);
    setShowShareModal(true);
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
  };

  // Filter pastes based on search term (by title or content)
  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-3">
        {/* Search */}
        <div className="w-full flex gap-3 px-4 py-2  rounded-[0.3rem] border border-[rgba(128,121,121,0.3)]  mt-6">
          <input
            type="search"
            placeholder="Search paste here..."
            className="focus:outline-none w-full bg-transparent"
            value={searchTerm} // Bind the input to searchTerm state
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
        </div>

        {/* All Pastes */}
        <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
          <h2 className="px-4 text-4xl font-bold border-b border-[rgba(128,121,121,0.3)] pb-4">
            All Pastes
          </h2>
          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <div
                  key={paste?._id}
                  className="border border-[rgba(128,121,121,0.3)] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]"
                >
                  {/* heading and Description */}
                  <div className="w-[50%] flex flex-col space-y-3">
                    <p className="text-4xl font-semibold ">{paste?.title}</p>
                    <p className="text-sm font-normal line-clamp-3 max-w-[80%] text-[#707070]">
                      {paste?.content}
                    </p>
                  </div>

                  {/* icons */}
                  <div className="flex flex-col gap-y-4 sm:items-end">
                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-blue-500"
                        // onClick={() => toast.error("Not working")}
                      >
                        <a href={`/?pasteId=${paste?._id}`}>
                          <PencilLine
                            className="text-black group-hover:text-blue-500"
                            size={20}
                          />
                        </a>
                      </button>
                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500"
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <Trash2
                          className="text-black group-hover:text-pink-500"
                          size={20}
                        />
                      </button>

                      <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-orange-500">
                        <a href={`/pastes/${paste?._id}`} target="_blank">
                          <Eye
                            className="text-black group-hover:text-orange-500"
                            size={20}
                          />
                        </a>
                      </button>
                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-green-500"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard");
                        }}
                      >
                        <Copy
                          className="text-black group-hover:text-green-500"
                          size={20}
                        />
                      </button>
                      <button
                        className="p-2 rounded bg-white border hover:border-blue-500"
                        onClick={() => handleShareClick(paste)}
                      >
                        <Share2
                          className="text-black group-hover:text-blue-500"
                          size={20}
                        />
                      </button>
                    </div>
                    {showShareModal && selectedPaste && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-5 rounded shadow-lg w-[90%] max-w-[400px]">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Share link</h3>
                            <button onClick={() => setShowShareModal(false)}>
                              <X size={20} />
                            </button>
                          </div>

                          <input
                            type="text"
                            value={`https://yourwebsite.com/pastes/${selectedPaste._id}`}
                            readOnly
                            className="w-full p-2 border rounded mb-4"
                          />
                          <button
                            className="w-full p-2 bg-blue-500 text-white rounded"
                            onClick={() =>
                              handleCopyLink(
                                `https://yourwebsite.com/pastes/${selectedPaste._id}`
                              )
                            }
                          >
                            <Copy size={16} /> Copy Link
                          </button>

                          <div className="flex justify-around mt-4">
                            <a
                              href={`https://t.me/share/url?url=https://yourwebsite.com/pastes/${selectedPaste._id}&text=Check this paste`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img
                                src={telegram}
                                alt="Telegram"
                                style={{ height: "35px", width: "35px" }}
                              />
                            </a>

                            <a
                              href={`https://wa.me/?text=https://yourwebsite.com/pastes/${selectedPaste._id}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img
                                src={whatsapp}
                                alt="WhatsApp"
                                style={{ height: "35px", width: "35px" }}
                              />
                            </a>

                            <a
                              href={`https://www.facebook.com/sharer/sharer.php?u=https://yourwebsite.com/pastes/${selectedPaste._id}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img
                                src={facebook}
                                alt="Facebook"
                                style={{ height: "35px", width: "35px" }}
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="gap-x-2 flex ">
                      <Calendar className="text-black" size={20} />
                      {FormatDate(paste?.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-2xl text-center w-full text-chileanFire-500">
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;
