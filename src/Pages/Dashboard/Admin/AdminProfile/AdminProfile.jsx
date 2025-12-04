import React, { useState, useEffect } from "react";
import { FaUpload, FaCheck } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxios from "../../../../Hooks/useAxios";
// import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AdminProfile = () => {
  const axiosInstance = useAxios()
  const queryClient = useQueryClient();
  const { user, updateUser } = useAuth();

  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // ✅ store selected file

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {}, // initially empty
  });

  // Fetch profile data
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/profile?email=${user.email}`);
      return res.data;
    },
  });

  // Prefill form when profile data arrives
  useEffect(() => {
    if (profile?.user) {
      const userData = profile.user;
      reset({
        fullName: userData.fullname || "",
        email: userData.email || "",
        phone: userData.phone || "",
        dob: userData.dob ? userData.dob.split("T")[0] : "",
        gender: userData.gender || "",
        password: "",
      });
      setPreview(userData.profileImage || null);
      setSelectedFile(null); // reset selected file
    }
  }, [profile, reset]);

  // Handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file); // ✅ store selected file
    setPreview(URL.createObjectURL(file));
  };

  // Form submit
  const onSubmit = async (data) => {
    try {
      let imageUrl = profile?.user.profileImage; // default to existing image

      // ✅ Upload selected image if exists
      if (selectedFile) {
        const file = selectedFile;

        if (!["image/jpeg", "image/png"].includes(file.type)) {
          toast.error("Only JPG/PNG allowed");
          return;
        }

        if (file.size > 10 * 1024 * 1024) {
          toast.error("Max image size 10MB");
          return;
        }

        // Upload to Imgbb
        const formData = new FormData();
        formData.append("image", file);

        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMAGEBB_KEY
          }`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (imgRes.data.success) {
          imageUrl = imgRes.data.data.url;
        } else {
          toast.error("Image upload failed");
          return;
        }
      }

      // Update Firebase profile
      await updateUser({
        displayName: data.fullName,
        photoURL: imageUrl,
      });

      // Update MongoDB
      await axiosSecure.patch(`/users/update/${data.email}`, {
        fullName: data.fullName,
        phone: data.phone,
        dob: data.dob,
        gender: data.gender,
        profileImage: imageUrl,
      });

      toast.success("Profile updated!");
      queryClient.invalidateQueries(["userProfile"]);
      setSelectedFile(null); // reset selected file
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("Failed to update profile");
    }
  };

  if (isLoading) return <p className="text-center py-20">Loading profile...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">
        Error: {error.message || "Failed to load profile"}
      </p>
    );
  if (!profile) return <p className="text-center">No profile found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900">Admin Profile</h1>
        <p className="text-gray-600 mb-8">Update your CourseMaster profile</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 shadow-md border-4 border-green-500">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex justify-center items-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <label
                htmlFor="image"
                className="absolute inset-0 rounded-full bg-black bg-opacity-40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
              >
                <FaUpload className="text-white w-6 h-6" />
              </label>

              <input
                type="file"
                id="image"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
            </div>
            <p className="text-sm text-gray-500 text-center">
              Upload JPG or PNG (max 10MB)
            </p>
          </div>

          {/* FORM FIELDS */}
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-semibold">Full Name</label>
                <input
                  {...register("fullName", { required: "Name required" })}
                  className="w-full px-4 py-3 border rounded-lg"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-semibold">Phone</label>
                <input
                  {...register("phone")}
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Email</label>
                <input
                  {...register("email")}
                  className="w-full px-4 py-3 border rounded-lg bg-gray-100"
                  readOnly
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Date of Birth
                </label>
                <input
                  type="date"
                  {...register("dob")}
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Gender</label>
                <select
                  {...register("gender")}
                  className="w-full px-4 py-3 border rounded-lg bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 font-semibold">
                  Password (Optional)
                </label>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Leave blank to keep current password"
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin" />{" "}
                    Saving...
                  </>
                ) : (
                  <>
                    <FaCheck /> Save Changes
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  const userData = profile.user;
                  reset({
                    fullName: userData.fullname || "",
                    email: userData.email || "",
                    phone: userData.phone || "",
                    dob: userData.dob ? userData.dob.split("T")[0] : "",
                    gender: userData.gender || "",
                    password: "",
                  });
                  setPreview(userData.profileImage || null);
                  setSelectedFile(null);
                }}
                className="px-6 py-3 bg-gray-200 rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> Your profile changes sync across all
            CourseMaster platforms instantly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
