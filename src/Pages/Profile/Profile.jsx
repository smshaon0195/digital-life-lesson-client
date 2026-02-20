import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";

const Profile = () => {
  const { updateUserProfile, user } = useAuth();
  // console.log(user);
  const [profileImage, setProfileImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    education: "",
    language: "",
    bio: "",
  });

  // Initialize formData when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        gender: formData.gender,
        education: formData.education,
        language: formData.language,
        bio: formData.bio,
      });
      setProfileImage(user.photoURL || null);
    }
  }, [user]);
  // console.log(formData);
  // Handle profile image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageData = new FormData();
      imageData.append("image", file);

      const image_API = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_Hosting}`;

      axios
        .post(image_API, imageData)
        .then((res) => {
          // console.log("ImgBB response:", res.data);
          setProfileImage(res.data.data.url);
        })
        .catch((err) => console.error("ImgBB upload error:", err));
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [e.target.phone]: e.target.value,
    });
  };

  // Save profile to Firebase
  const handleSubmit = (e) => {
    e.preventDefault();

    const updateDetails = {
      displayName: formData.name,
      photoURL: profileImage,
    };

    updateUserProfile(updateDetails)
      .then(() => {
        alert("Profile updated successfully!");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen text-blue-800 bg-gradient-to-br from-amber-50 to-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Profile Settings</h2>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-400">
            <img
              src={profileImage || user?.photoURL || "https://shorturl.at/UI6JP"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold">{formData.name || user?.displayName}</h3>
            <p className="text-gray-500 text-sm">{formData.email || user?.email}</p>

            <label className="inline-block mt-3 cursor-pointer text-sm text-amber-600 font-medium">
              Change Photo
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-amber-300 focus:ring"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium">Mobile Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="01XXXXXXXXX"
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Education */}
          <div>
            <label className="text-sm font-medium">Education</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="BSc in Computer Science"
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />
          </div>

          {/* Language */}
          <div>
            <label className="text-sm font-medium">Language</label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              placeholder="Bangla, English"
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium">About Me</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              placeholder="Write something about yourself..."
              className="w-full mt-1 border rounded-lg px-3 py-2"
            ></textarea>
          </div>

          {/* Save Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-3 rounded-xl font-semibold hover:bg-amber-600 transition"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
