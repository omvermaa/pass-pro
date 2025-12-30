import React from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passRef = useRef();

  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState(() => {
    let passwords = localStorage.getItem("passwords");
    if (!passwords) return [];
    try {
      const parsed = JSON.parse(passwords);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const togglePass = () => {
    if (ref.current.src.includes("icons/hidden.png")) {
      ref.current.src = "/icons/eye.png";
      passRef.current.type = "text";
    } else {
      ref.current.src = "/icons/hidden.png";
      passRef.current.type = "password";
    }
  };

  const savePass = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      const newEntry = { ...form, id: uuidv4() };
      const updatedArray = [...passwordArray, newEntry];
      setPasswordArray(updatedArray);
      localStorage.setItem("passwords", JSON.stringify(updatedArray));
      toast.success("Password saved", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      toast.error("Password not Saved!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    setForm({ site: "", username: "", password: "" });
  };

  const deletePass = (id) => {
    console.log("Deleting password with id", id);
    if (confirm("Are you sure you want to delete this password?")) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast.success("Password deleted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const editPass = (id) => {
    console.log("Editing password with id", id);
    setForm(passwordArray.find((item) => item.id === id));
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.info("Copied successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch {
      // Fallback for mobile devices and older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        toast.info("Copied successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } catch {
        toast.error("Failed to copy", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getSiteUrl = (site) => {
    if (!site) return "#";
    if (site.startsWith("http://") || site.startsWith("https://")) {
      return site;
    }
    return `https://${site}`;
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Bounce}
      />
      {/* <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-size-[20px_20px]"></div> */}

      <div className="cont relative mt-5 mx-auto px-5 lg:w-3xl">
        <div className=" text-white flex items-center flex-col gap-6">
          <div className="logo text-2xl font-medium">
            <span className="text-red-600">&lt;</span>Pass
            <span className="text-red-600">Pro/&gt;</span>
          </div>
        </div>
        <div className="flex justify-center text-slate-400 font-light">
          Your Own Password Manager
        </div>

        <div className="inp relative p-2 ">
          <div className="url w-full py-2">
            <input
              name="site"
              onChange={handleChange}
              value={form.site}
              placeholder="Enter URL"
              className="text-white w-full rounded-full px-3 py-1 border border-slate-400"
              type="text"
              aria-label="Enter URL"
            />
          </div>

          <div className="userpass w-full flex flex-col sm:flex-row gap-4 py-2">
            <div className="user w-full">
              <input
                name="username"
                onChange={handleChange}
                value={form.username}
                placeholder="Enter Username"
                className="text-white rounded-full px-3 py-1 border border-slate-400 w-full"
                type="text"
                aria-label="Enter Username"
              />
            </div>

            <div className="pass w-full relative">
              <input
                name="password"
                ref={passRef}
                onChange={handleChange}
                value={form.password}
                placeholder="Enter Password"
                className="text-white rounded-full px-3 py-1 border w-full border-slate-400 "
                type="password"
                aria-label="Enter Password"
              />{" "}
              <span onClick={togglePass} className="absolute right-3 top-1.5">
                <img
                  ref={ref}
                  width={20}
                  height={20}
                  src="/icons/hidden.png"
                  alt="eye"
                  className="invert cursor-pointer"
                />
              </span>
            </div>
          </div>
        </div>

        <div className="savepass flex px-5 mx-auto absolute right-0 w-fit mb-10">
          <button
            onClick={() => savePass()}
            className="flex items-center gap-1 text-white hover:bg-red-800/80 px-3 py-1 rounded-full bg-red-800"
          >
            <span className="flex items-center">
              <lord-icon
                src="https://cdn.lordicon.com/vjgknpfx.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#ffffff"
              ></lord-icon>
            </span>
            Add Password
          </button>
        </div>

        <div className="passwords">
          <h1 className="text-xl mt-15 font-bold py-2 text-white">
            Your Passwords
          </h1>
          {passwordArray.length === 0 && (
            <div className="text-slate-400">No passwords saved yet.</div>
          )}
          {passwordArray.length > 0 && (
            <>
              {/* Table for larger screens */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="table-auto text-center rounded-lg overflow-hidden w-full text-white min-w-full">
                  <thead className="bg-red-800">
                    <tr>
                      <th className="py-2 min-w-20">Site</th>
                      <th className="py-2">Username</th>
                      <th className="py-2">Passwords</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y bg-slate-400/10 divide-gray-700">
                    {passwordArray.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="py-2">
                            <a target="_blank" href={getSiteUrl(item.site)} rel="noopener noreferrer">
                              {item.site}
                            </a>
                          </td>
                          <td className="py-2">
                            <div className="flex justify-center items-center gap-1">
                              {item.username}
                              <button
                                className=" cursor-pointer"
                                onClick={() => {
                                  copyText(item.username);
                                }}
                              >
                                <img width={32} src="/icons/copy.svg" alt="" />
                              </button>
                            </div>
                          </td>
                          <td className="py-2">
                            <div className="flex justify-center items-center gap-1">
                              {item.password}
                              <button
                                className=" cursor-pointer"
                                onClick={() => {
                                  copyText(item.password);
                                }}
                              >
                                <img width={32} src="/icons/copy.svg" alt="" />
                              </button>
                            </div>
                          </td>
                          <td className="py-2 flex justify-center gap-4 cursor-pointer">
                            <span onClick={() => deletePass(item.id)}>
                              <lord-icon
                                className="delete w-7"
                                src="https://cdn.lordicon.com/jzinekkv.json"
                                trigger="hover"
                                colors="primary:#ffffff,secondary:#ffffff"
                              ></lord-icon>
                            </span>
                            <span onClick={() => editPass(item.id)}>
                              <lord-icon
                                className="edit w-8"
                                src="https://cdn.lordicon.com/vwzukuhn.json"
                                trigger="hover"
                              ></lord-icon>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Cards for mobile screens */}
              <div className="sm:hidden space-y-4">
                {passwordArray.map((item, index) => {
                  return (
                    <div key={index} className="bg-slate-400/10 rounded-lg p-4 border border-gray-700">
                      <div className="mb-2">
                        <span className="font-semibold text-red-400">Site:</span>{" "}
                        <a target="_blank" href={getSiteUrl(item.site)} rel="noopener noreferrer" className="text-blue-400 underline">
                          {item.site}
                        </a>
                      </div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="font-semibold text-red-400">Username:</span>
                        <span className="text-white">{item.username}</span>
                        <button
                          className="cursor-pointer"
                          onClick={() => copyText(item.username)}
                        >
                          <img width={32} src="/icons/copy.svg" alt="copy username" className="invert" />
                        </button>
                      </div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="font-semibold text-red-400">Password:</span>
                        <span className="text-white">{item.password}</span>
                        <button
                          className="cursor-pointer"
                          onClick={() => copyText(item.password)}
                        >
                          <img width={32} src="/icons/copy.svg" alt="copy password" className="invert" />
                        </button>
                      </div>
                      <div className="flex justify-end gap-4 mt-4">
                        <button onClick={() => editPass(item.id)} className="text-blue-400 hover:text-blue-300">
                          <lord-icon
                            className="edit w-6"
                            src="https://cdn.lordicon.com/vwzukuhn.json"
                            trigger="hover"
                          ></lord-icon>
                        </button>
                        <button onClick={() => deletePass(item.id)} className="text-red-400 hover:text-red-300">
                          <lord-icon
                            className="delete w-6"
                            src="https://cdn.lordicon.com/jzinekkv.json"
                            trigger="hover"
                            colors="primary:#ffffff,secondary:#ffffff"
                          ></lord-icon>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
