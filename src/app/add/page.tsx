"use client";

import Image from "next/image";
import Navbar from "../components/navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [selected, setSelected] = useState(0); // ตัวแปรเก็บค่ารูปที่เลือก
  const [ind, setInd] = useState(1); // ตัวแปรเก็บค่ารูปที่เลือก
  const title = ["Leaf-buds", "Leaflet color", "Stipule features"];
  const [Feature1, setFeature1] = useState(0); // ตัวแปรเก็บค่ารูปที่เลือก
  const [Feature2, setFeature2] = useState(0); // ตัวแปรเก็บค่ารูปที่เลือก
  const [Feature3, setFeature3] = useState(0); // ตัวแปรเก็บค่ารูปที่เลือก
  const [Feature4, setFeature4] = useState(0); // ตัวแปรเก็บค่ารูปที่เลือก
  const [Feature5, setFeature5] = useState(0); // ตัวแปรเก็บค่ารูปที่เลือก
  const [Feature6, setFeature6] = useState(0); // ตัวแปรเก็บค่ารูปที่เลือก
  const [showModal, setShowModal] = useState(false);
  const [varities, setVaities] = useState<varities[]>([]);
  const [description, setDescription] = useState<Description[]>([]);
  const [selectedVarity, setSelectedVarity] = useState(0);
  const [numdes, setNumdes] = useState(0);
  useEffect(() => {
    getVarities();
    getFeature();
  }, []);

  interface Description {
    Feature_ID: String;
    Type_ID: number;
    Feature_Description: string;
    Feature_Path_Image: string;
  }

  interface varities {
    Varity_ID: number;
    Varity_name: string;
  }

  const getVarities = () => {
    axios.get("https://cmdkpp.com/API/api_select_varities.php").then((res) => {
      setVaities(res.data);
      console.log(res.data);
    });
  };

  const getFeature = () => {
    axios.get("https://cmdkpp.com/API/api_select_features.php").then((res) => {
      setDescription(res.data);
      console.log(res.data);
    });
  };
  const addData = () => {
    console.log(
      Feature1,
      Feature2,
      Feature3,
      Feature4,
      Feature5,
      Feature6,
      selectedVarity
    );
    axios
      .post("https://cmdkpp.com/API/api_add_maping.php", {
        Feature1: 5,
        Feature2: 5,
        Feature3: 5,
        Feature4: 5,
        Feature5: 5,
        Feature6: 5,
        selectedVarity: 5,
      })
      .then((res) => {
        console.log('Response status:', res.status);
        setShowModal(false);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  const loop_image = () => {
    const items = [];
    for (let i = 0; i < 18; i++) {
      items.push(
        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div className="flex flex-col justify-between p-4 leading-normal">
            <Image
              src={`/image/Feature${ind}_${i + 1}.png`} // ตรวจสอบว่า URL ถูกต้องตามโครงสร้างโฟลเดอร์ของโปรเจค
              alt="Picture of the author"
              layout="responsive"
              width={100}
              height={100}
            />
            <div className="flex justify-center p-6 items-center mb-4">
              <input
                id="default-radio-${ind}"
                type="radio"
                value="${i+1}"
                name="default-radio"
                onClick={() => {
                  if (ind == 1) {
                    setFeature1(i + 1);
                  } else if (ind == 2) {
                    setFeature2(i + 1);
                  } else if (ind == 3) {
                    setFeature3(i + 1);
                  } else if (ind == 4) {
                    setFeature4(i + 1);
                  } else if (ind == 5) {
                    setFeature5(i + 1);
                  } else if (ind == 6) {
                    setFeature6(i + 1);
                  }
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            {description.length > 0 ? (
              <p>{description[i + numdes].Feature_Description}</p>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      );
    }
    return items;
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
        <div className="flex items-center bg-white border p-3 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div className="flex">
            <button
              type="button"
              className={`text-white bg-blue-700 hover: bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                ind <= 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : ""
              }`}
              onClick={() => {
                setInd(ind - 1);
                setNumdes(numdes - 18);
              }}
              disabled={ind <= 1 ? true : false}
            >
              back
            </button>

            <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
              <li
                className={`flex md:w-full items-center   dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 
              ${ind <= 1 ? "text-blue-600" : "text-green-600"}`}
              >
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                  {ind == 1 ? (
                    ""
                  ) : (
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                  )}
                  Leaf_buds{" "}
                </span>
              </li>
              <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                <span
                  className={`flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500 ${
                    ind >= 3
                      ? "text-green-600"
                      : ind == 2
                      ? "text-blue-600"
                      : ""
                  }`}
                >
                  {ind < 3 ? (
                    ""
                  ) : (
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                  )}
                  Leaflet_color{" "}
                </span>
              </li>
              <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                <span
                  className={`flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500 ${
                    ind >= 4
                      ? "text-green-600"
                      : ind == 3
                      ? "text-blue-600"
                      : ""
                  }`}
                >
                  {ind < 4 ? (
                    ""
                  ) : (
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                  )}
                  Stipule_features{" "}
                </span>
              </li>
              <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                <span
                  className={`flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500 ${
                    ind >= 5
                      ? "text-green-600"
                      : ind == 4
                      ? "text-blue-600"
                      : ""
                  }`}
                >
                  {ind < 5 ? (
                    ""
                  ) : (
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                  )}
                  Leaf_Stalk_color{" "}
                </span>
              </li>
              <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                <span
                  className={`flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500 ${
                    ind >= 6
                      ? "text-green-600"
                      : ind == 5
                      ? "text-blue-600"
                      : ""
                  }`}
                >
                  {ind < 6 ? (
                    ""
                  ) : (
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                  )}
                  Blabe_features{" "}
                </span>
              </li>
              <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-5 dark:after:border-gray-700">
                <span
                  className={`flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500 ${
                    ind >= 7
                      ? "text-green-600"
                      : ind == 6
                      ? "text-blue-600"
                      : ""
                  }`}
                >
                  {ind < 7 ? (
                    ""
                  ) : (
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                  )}
                  Stem_color{" "}
                </span>
              </li>
            </ol>

            <button
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={() => {
                if (ind == 6) {
                  setInd(6);
                  setShowModal(true);
                } else {
                  setInd(ind + 1), console.log(ind);
                  setNumdes(numdes + 18);
                }
              }}
              disabled={ind > 6 ? true : false}
            >
              <p>Next</p>
            </button>
          </div>
        </div>

        <div className="flex   flex-col items-center justify-center min-h-screen py-2">
          <div className="grid  grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-4">
            {loop_image()}
          </div>
        </div>
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                {(() => {
                  const jsxElements = [];
                  const jsxElements2 = [];

                  for (let i = 1; i < 7; i++) {
                    let textimg = 0;
                    if (i == 1) {
                      textimg = Feature1;
                    } else if (i == 2) {
                      textimg = Feature2;
                    } else if (i == 3) {
                      textimg = Feature3;
                    } else if (i == 4) {
                      textimg = Feature4;
                    } else if (i == 5) {
                      textimg = Feature5;
                    } else if (i == 6) {
                      textimg = Feature6;
                    }

                    console.log(textimg);
                    jsxElements.push(
                      <div key={i} className="relative p-6">
                        {/* ตัวอย่าง JSX ภายในลูป */}
                        <p>Iteration: {i}</p>
                        <Image
                          src={`/image/Feature${i}_${textimg}.png`} // ตรวจสอบว่า URL ถูกต้องตามโครงสร้างโฟลเดอร์ของโปรเจค
                          alt="Picture of the author"
                          layout="responsive"
                          width={100}
                          height={100}
                        />
                      </div>
                    );
                  }

                  return jsxElements;
                })()}

                {
                  <div key={1} className="relative p-6 flex-auto">
                    {varities.map((variety) => (
                      <div key={variety.Varity_ID}>
                        <input
                          type="radio"
                          id={`radio_${variety.Varity_ID}`}
                          name="vehicle1"
                          value={variety.Varity_ID}
                          onChange={(e) =>
                            setSelectedVarity(parseInt(e.target.value))
                          }
                        />
                        <label htmlFor={`radio_${variety.Varity_ID}`}>
                          {variety.Varity_name}
                        </label>
                      </div>
                    ))}
                  </div>
                }

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false), setInd(1);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      addData();
                  
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
