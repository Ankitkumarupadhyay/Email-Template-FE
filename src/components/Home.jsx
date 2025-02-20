import React from "react";
import Input from "./Input";
import LivePreview from "./LivePreview";
import AllTemplates from "./AllTemplates";

const Home = () => {
  return (
    
      <div className="bg-white">
        <div className="flex flex-col md:flex-row p-3 w-full">
          <div className="w-[90%] md:w-[50%] m-2 bg-[#0C3257] rounded-lg p-5 sm:p-10 pt-5 h-[550px]">
            <Input isEdit={false}/>
          </div>
          <div className="w-[90%] md:w-[50%] m-2  bg-[#0C3257] rounded-lg p-5 sm:p-10 pt-5 h-[550px] ">
            <LivePreview />
          </div>
        </div>
        <AllTemplates />
      </div>
    
  );
};

export default Home;
