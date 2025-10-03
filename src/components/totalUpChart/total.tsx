import React from "react";

const Total = () => {
  return (
    <div>
      <div className="w-[500px] max-w-md mx-auto h-[590px] mt-[30px] border-[1px] border-gray-200 rounded-[14px] p-[20px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Top selling products</h2>
          <a href="#" className="text-blue-500 flex items-center gap-1">
            See All &rarr;
          </a>
        </div>

        <div className="flex flex-col gap-4 mt-[40px]">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <img
                src="/src/assets/wino.svg"
                alt="Product"
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <h3 className="font-medium text-gray-800">
                  Healthcare Erbology
                </h3>
                <p className="text-sm text-gray-500">in Accessories</p>
              </div>
            </div>
            <span className="text-green-500 font-semibold ml-[30px]">
              13,153
            </span>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <img
                src="/src/assets/wino.svg"
                alt="Product"
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <h3 className="font-medium text-gray-800">
                  Healthcare Erbology
                </h3>
                <p className="text-sm text-gray-500">in Accessories</p>
              </div>
            </div>
            <span className="text-green-500 font-semibold">13,153</span>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <img
                src="/src/assets/wino.svg"
                alt="Product"
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <h3 className="font-medium text-gray-800">
                  Healthcare Erbology
                </h3>
                <p className="text-sm text-gray-500">in Accessories</p>
              </div>
            </div>
            <span className="text-green-500 font-semibold">13,153</span>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <img
                src="/src/assets/wino.svg"
                alt="Product"
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <h3 className="font-medium text-gray-800">
                  Healthcare Erbology
                </h3>
                <p className="text-sm text-gray-500">in Accessories</p>
              </div>
            </div>
            <span className="text-green-500 font-semibold">13,153</span>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <img
                src="/src/assets/wino.svg"
                alt="Product"
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <h3 className="font-medium text-gray-800">
                  Healthcare Erbology
                </h3>
                <p className="text-sm text-gray-500">in Accessories</p>
              </div>
            </div>
            <span className="text-green-500 font-semibold">13,153</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Total;
