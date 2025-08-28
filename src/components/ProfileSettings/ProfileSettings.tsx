import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ArrowLeft, CameraAlt, Save, Close } from "@mui/icons-material";
import { Link } from "@tanstack/react-router";

export default function ProfileSettings() {
  const { user, updateProfile, logout, loading, error } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    language: user?.preferences.language || "en",
    theme: user?.preferences.theme || "dark",
    autoplay: user?.preferences.autoplay || true,
    maturityRating: user?.preferences.maturityRating || "R",
  });
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!hasChanges || !user) return;

    const updates = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      preferences: {
        ...user.preferences,
        language: formData.language,
        theme: formData.theme,
        autoplay: formData.autoplay,
        maturityRating: formData.maturityRating,
      },
    };

    await updateProfile(updates);
    setHasChanges(false);
  };

  const tabContent = {
    profile: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">
          Profile Information
        </h2>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {formData.firstName.charAt(0)}
                {formData.lastName.charAt(0)}
              </span>
            </div>
            <button className="absolute bottom-0 right-0 bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition-colors">
              <CameraAlt className="text-base text-white" />
            </button>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold">
              Profile Picture
            </h3>
            <p className="text-gray-400 text-sm">Upload a profile picture</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:border-red-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:border-red-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="bg-gray-900 rounded-lg p-4">
          <h3 className="text-white text-lg font-semibold mb-2">
            Subscription
          </h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-300 capitalize">
                {user?.subscription.plan} Plan
              </p>
              <p className="text-gray-400 text-sm">
                Status: {user?.subscription.status}
              </p>
            </div>
            <button className="text-red-500 hover:text-red-400 text-sm font-medium">
              Change Plan
            </button>
          </div>
        </div>
      </div>
    ),
    preferences: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">
          Viewing Preferences
        </h2>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Language
          </label>
          <select
            value={formData.language}
            onChange={(e) => handleInputChange("language", e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:border-red-500 focus:outline-none"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Theme
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={formData.theme === "dark"}
                onChange={(e) => handleInputChange("theme", e.target.value)}
                className="text-red-500 focus:ring-red-500"
              />
              <span className="ml-2 text-white">Dark</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={formData.theme === "light"}
                onChange={(e) => handleInputChange("theme", e.target.value)}
                className="text-red-500 focus:ring-red-500"
              />
              <span className="ml-2 text-white">Light</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Autoplay next episode</h3>
            <p className="text-gray-400 text-sm">
              Automatically play the next episode in a series
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.autoplay}
              onChange={(e) => handleInputChange("autoplay", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Maturity Rating
          </label>
          <select
            value={formData.maturityRating}
            onChange={(e) =>
              handleInputChange("maturityRating", e.target.value)
            }
            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:border-red-500 focus:outline-none"
          >
            <option value="G">G - General Audiences</option>
            <option value="PG">PG - Parental Guidance</option>
            <option value="PG-13">PG-13 - Parents Strongly Cautioned</option>
            <option value="R">R - Restricted</option>
            <option value="NC-17">NC-17 - Adults Only</option>
          </select>
          <p className="text-gray-400 text-sm mt-1">
            Content with higher ratings will be hidden from your recommendations
          </p>
        </div>
      </div>
    ),
    security: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">
          Security Settings
        </h2>

        <div className="bg-gray-900 rounded-lg p-4">
          <h3 className="text-white text-lg font-semibold mb-2">
            Change Password
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            It's a good idea to use a strong password that you don't use
            elsewhere.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium transition-colors">
            Change Password
          </button>
        </div>

        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white text-lg font-semibold">
                Two-Factor Authentication
              </h3>
              <p className="text-gray-400 text-sm">
                Add an extra layer of security to your account.
              </p>
            </div>
            <button className="text-red-500 hover:text-red-400 text-sm font-medium">
              Enable
            </button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4">
          <h3 className="text-white text-lg font-semibold mb-2">
            Active Sessions
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Manage devices that are currently signed in to your account
          </p>
          <div className="space-y-2">
            <div className="flex justify-between items-center bg-gray-800 rounded p-3">
              <div>
                <p className="text-white font-medium">Current Device</p>
                <p className="text-gray-400 text-sm">
                  Firefox on Windows • Active now
                </p>
              </div>
              <span className="text-green-500 text-sm">Current</span>
            </div>
          </div>
        </div>
      </div>
    ),
    signout: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">Sign Out</h2>

        <div className="bg-gray-900 rounded-lg p-4">
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="px-4 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-white hover:text-gray-300">
                <ArrowLeft className="text-2xl" />
              </Link>
              <h1 className="text-red-600 text-2xl font-bold">NETFLIX</h1>
              <span className="text-gray-400 text-lg">Account Settings</span>
            </div>

            {hasChanges && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setFormData({
                      firstName: user?.firstName || "",
                      lastName: user?.lastName || "",
                      email: user?.email || "",
                      language: user?.preferences.language || "en",
                      theme: user?.preferences.theme || "dark",
                      autoplay: user?.preferences.autoplay || true,
                      maturityRating: user?.preferences.maturityRating || "R",
                    });
                    setHasChanges(false);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <Close className="text-xl" />
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium flex items-center space-x-2 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Save className="text-base" />
                  )}
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="flex">
        <div className="w-64 bg-gray-900 min-h-screen p-6">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full text-left px-4 py-3 rounded transition-colors ${
                activeTab === "profile"
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("preferences")}
              className={`w-full text-left px-4 py-3 rounded transition-colors ${
                activeTab === "preferences"
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              Preferences
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`w-full text-left px-4 py-3 rounded transition-colors ${
                activeTab === "security"
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab("signout")}
              className={`w-full text-left px-4 py-3 rounded transition-colors ${
                activeTab === "signout"
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              Sign Out
            </button>
          </nav>
        </div>

        <div className="flex-1 p-6 lg:p-12">
          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded mb-6">
              {error.message}
            </div>
          )}

          {tabContent[activeTab as keyof typeof tabContent]}
        </div>
      </div>
    </div>
  );
}
