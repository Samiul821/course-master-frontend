import React, { useState, useRef } from "react";
import { FaUpload, FaCheck } from "react-icons/fa";
import { AiOutlineAlert, AiOutlineLoading3Quarters } from "react-icons/ai";

const AdminProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "Dr. Sarah Johnson",
    email: "sarah.johnson@coursemaster.edu",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    password: "",
    profileImage: "/placeholder-user.jpg",
  });

  const [preview, setPreview] = useState("/placeholder-user.jpg");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setPreview(result);
        setFormData((prev) => ({ ...prev, profileImage: result }));
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error reading file:", error);
      setErrorMessage("Failed to read image file");
    }
  };

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      return data.data.url;
    } catch (error) {
      console.error("imgbb upload error:", error);
      throw new Error("Failed to upload image to imgbb");
    }
  };

  const updateMongoDBProfile = async (data) => {
    try {
      const response = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Profile update failed");
      await response.json();
    } catch (error) {
      console.error("MongoDB update error:", error);
      throw new Error("Failed to update profile in database");
    }
  };

  const updateFirebaseEmail = async (newEmail) => {
    try {
      console.log("Firebase email update:", newEmail);
    } catch (error) {
      console.error("Firebase email update error:", error);
      throw new Error("Failed to update email in Firebase");
    }
  };

  const updateFirebasePassword = async (newPassword) => {
    try {
      console.log("Firebase password update");
    } catch (error) {
      console.error("Firebase password update error:", error);
      throw new Error("Failed to update password in Firebase");
    }
  };

  const updateFirebasePhoto = async (photoURL) => {
    try {
      console.log("Firebase photo update:", photoURL);
    } catch (error) {
      console.error("Firebase photo update error:", error);
      throw new Error("Failed to update photo in Firebase");
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      let uploadedImageUrl = formData.profileImage;

      if (fileInputRef.current?.files?.[0]) {
        uploadedImageUrl = await uploadToImgBB(fileInputRef.current.files[0]);
      }

      await updateMongoDBProfile({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        profileImage: uploadedImageUrl,
      });

      if (formData.email) await updateFirebaseEmail(formData.email);
      if (formData.password) await updateFirebasePassword(formData.password);
      if (uploadedImageUrl) await updateFirebasePhoto(uploadedImageUrl);

      setSuccessMessage("Profile updated successfully!");
      setFormData((prev) => ({ ...prev, password: "" }));
    } catch (error) {
      console.error("Save profile error:", error);
      setErrorMessage(error.message || "Failed to save profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 text-balance">
            Admin Profile
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your CourseMaster account settings and profile information
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            <div className="flex flex-col items-center lg:col-span-1">
              <div className="relative group">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-green-500 shadow-lg bg-gray-100 flex items-center justify-center">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <label
                  htmlFor="profile-image"
                  className="absolute inset-0 rounded-full bg-black bg-opacity-40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="flex flex-col items-center text-white">
                    <FaUpload className="w-6 h-6 mb-2" />
                    <span className="text-sm font-medium">Change Photo</span>
                  </div>
                </label>

                <input
                  ref={fileInputRef}
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  aria-label="Upload profile image"
                />
              </div>

              <p className="text-sm text-gray-500 mt-4 text-center">
                Max file size: 5MB
                <br />
                JPG, PNG supported
              </p>
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-6">
                {successMessage && (
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <FaCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-green-800 font-medium">
                      {successMessage}
                    </p>
                  </div>
                )}

                {errorMessage && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AiOutlineAlert className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-red-800 font-medium">{errorMessage}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      aria-label="Full name"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      aria-label="Phone number"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      aria-label="Email address"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                      placeholder="admin@coursemaster.edu"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Date of Birth
                    </label>
                    <input
                      id="dateOfBirth"
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      aria-label="Date of birth"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Password{" "}
                      <span className="text-gray-500 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      aria-label="Password"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                      placeholder="Leave blank to keep current password"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Only fill this field if you want to change your password
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    aria-label="Save profile changes"
                  >
                    {isLoading ? (
                      <>
                        <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaCheck className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => window.location.reload()}
                    disabled={isLoading}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-900 font-semibold rounded-lg transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
                    aria-label="Cancel and discard changes"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Note:</span> Your profile changes
            will be synced across all CourseMaster platforms. Password changes
            will require re-authentication.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
