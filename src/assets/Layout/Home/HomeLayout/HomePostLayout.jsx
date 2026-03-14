import React from "react";

import LeftSideBar from "../../../../Pages/RecentCourse/LeftSideBar/LeftSideBar";
import { Outlet } from "react-router";
import RightSiderBar from "../../../../Pages/RecentCourse/RightSiderBar/RightSiderBar";
import RecentPosts from "./../../../../Pages/RecentCourse/RecentPosts";

const HomePostLayout = () => {
  return (
    <div>
      <div className="font-bold  text-2xl text-center my-3">
        <h2>Recent Posts</h2>
      </div>
      <div className="md:flex w-[95%] mx-auto gap-12">
        <LeftSideBar></LeftSideBar>
        <RecentPosts></RecentPosts>
        <RightSiderBar></RightSiderBar>
      </div>
    </div>
  );
};

export default HomePostLayout;
