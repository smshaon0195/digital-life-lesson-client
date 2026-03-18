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
  console.log(posts);
  const favoratePosts = posts.filter((post) => post.favorite);
  console.log(favoratePosts);

  return (
    <div className="bg-gray-100 text-black min-h-screen top-15">
      {/* Header */}
      <header className=" bg-white sticky text-black shadow ">
        <div className=" text-center justify-between md:flex w-[95%] mx-auto items-center p-4">
          <h1 className="text-xl font-bold">User Dashboard</h1>

          <div className="text-center border-amber-200 border-2 px-3 sm:border-0">
            <h2 className="text-2xl font-bold">
              Wellcome <br />
              <span className="text-blue-600 font-serif">{user.displayName} ❤️</span>{" "}
            </h2>
          </div>
        </div>
      </header>

      <div className="flex pt-20">
        {/* Main */}
        <main className="flex-1 p-6 space-y-8">
          {/* Stats */}
          <section className="grid text-center w-[95%] mx-auto grid-cols-1 md:grid-cols-3 gap-4">
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
                {posts.map((post) => {
                  return (
                    <tr key={post._id} className="border-b">
                      <td>{post.text}</td>
                      <td>Public</td>
                      <td className="space-x-2">
                        <button className="text-blue-600">Update</button>
                        <button className="text-red-600">Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
