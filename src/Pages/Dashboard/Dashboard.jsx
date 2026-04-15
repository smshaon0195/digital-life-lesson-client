import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router";

const Dashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: posts = [] } = useQuery({
    queryKey: ["favoritePosts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts`);
      return res.data;
    },
  });
  const favoritePostsByUser = posts.filter(
    (lesson) => Array.isArray(lesson.favorite) && lesson.favorite.includes(user?.email),
  );
  const { data: myPosts = [] } = useQuery({
    queryKey: ["myPosts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts?email=${user?.email}`);
      return res.data;
    },
  });

  // user plan is now starting and show this display

  const { data: usersPaymentDetails = [] } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });
  const planName = usersPaymentDetails?.plan?.planName;

  return (
    <div className=" min-h-screen top-15">
      {/* Header */}
      <header className="  sticky  shadow ">
        <div className=" text-center justify-between md:flex w-[95%] mx-auto items-center p-4">
          <h1 className="text-xl font-bold">Wellcome your Dashboard</h1>

          <div className="text-center border border-amber-200  px-3 sm:border-0">
            <h2 className="text-2xl font-bold">
              Wellcome <br />
              <span className="text-green-800 font-serif">❤️ {user.displayName} ❤️</span>{" "}
            </h2>

            <p
              className={
                planName === "Premium"
                  ? "font-bold text-blue-800 "
                  : planName === "Base"
                    ? "text-green-500 font-bold "
                    : planName === "Unlimited"
                      ? "text-[#db4517] font-bold text-shadow-amber-400"
                      : ""
              }
            >
              {planName} User
            </p>
          </div>
        </div>
      </header>

      <div className="flex pt-20">
        {/* Main */}
        <main className="flex-1 p-6 space-y-8">
          {/* Stats */}
          <section className="grid text-center w-[95%] mx-auto grid-cols-1 md:grid-cols-3 gap-4">
            <Link to={"/dashboard/my-Lesson"}>
              <div className=" p-4 rounded shadow-2xl">
                <p>My Total Lessons</p>
                <h2 className="text-2xl font-bold">{myPosts.length}</h2>
              </div>
            </Link>
            <Link to={"/dashboard/favorites"}>
              <div className=" p-4 shadow-2xl rounded ">
                <p>My Total Favorites</p>
                <h2 className="text-2xl font-bold">{favoritePostsByUser.length || 0}</h2>
              </div>
            </Link>
            <div className=" p-4 rounded shadow-2xl">
              <p>Recent Lessons</p>
              <h2 className="text-2xl font-bold">{posts.slice(0, 3).length}</h2>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
