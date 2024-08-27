"use client";

import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaRegDotCircle } from "react-icons/fa";

const ProfitChart = () => {
  const data = [
    {
      year: "2016",
      Contributions: 4000,
      Donors: 2400,
    },
    {
      year: "2017",
      Contributions: 3000,
      Donors: 1398,
    },
    {
      year: "2018",
      Contributions: 2000,
      Donors: 9800,
    },
    {
      year: "2019",
      Contributions: 2780,
      Donors: 3908,
    },
    {
      year: "2020",
      Contributions: 1890,
      Donors: 4800,
    },
    {
      year: "2021",
      Contributions: 2390,
      Donors: 3800,
    },
    {
      year: "2022",
      Contributions: 3490,
      Donors: 4300,
    },
  ];
  return (
    <>
      <ResponsiveContainer width="100%" height="90%" className={"py-5"}>
        <div className="flex flex-row gap-3 pl-8">
          <div className="flex flex-row place-items-center text-[#8884d8]">
            <FaRegDotCircle className="" />
            <p className=" pl-2">Total Donors</p>
          </div>
          <div className="flex flex-row place-items-center text-[#4682B4]">
            <FaRegDotCircle className="" />
            <p className="pl-2">Total Contribution</p>
          </div>
        </div>
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          className="p-2"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4682B4" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4682B4" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="year" dy={10} />
          <YAxis dx={0} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Contributions"
            stroke="#4682B4"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Line
            type="monotone"
            dataKey="Donors"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
export default ProfitChart;
