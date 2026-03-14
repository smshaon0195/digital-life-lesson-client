import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const Dashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: posts = [] } = useQuery({
    queryKey: ["Posts", user.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure.get(`/posts?email=${user.email}`);
      return result.data;
    },
  });
  const favoratePosts = posts.filter((post) => post.favorite);
  console.log(favoratePosts);

  return (
    <div className="bg-gray-100 text-black min-h-screen top-15">
      {/* Header */}
      <header className=" bg-white sticky text-black shadow ">
        <div className="flex justify-between  w-[95%] mx-auto items-center p-4">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <h2 className="text-2xl font-bold">Wellcome </h2>
          <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded cursor-not-allowed">
            Premium (Disabled)
          </button>
        </div>
      </header>

      <div className="flex pt-20">
        {/* Main */}
        <main className="flex-1 p-6 space-y-8">
          {/* Stats */}
          <section className="grid w-[95%] mx-auto grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white text-black p-4 rounded shadow">
              <p>Total Lessons</p>
              <h2 className="text-2xl font-bold">{posts.length}</h2>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p>Total Favorites</p>
              <h2 className="text-2xl font-bold">{favoratePosts.length}</h2>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p>Recent Lessons</p>
              <h2 className="text-2xl font-bold">3</h2>
            </div>
          </section>

          {/* My Lessons */}
          <section className="bg-white w-[95%] mx-auto p-6 rounded shadow">
            <h2 className="font-semibold mb-4">My Lessons</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th>Title</th>
                  <th>Visibility</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td>HTML Basics</td>
                  <td>Public</td>
                  <td className="space-x-2">
                    <button className="text-blue-600">Update</button>
                    <button className="text-red-600">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
