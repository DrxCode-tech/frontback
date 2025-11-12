import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // ✅ make sure your firebase.js exports db

export default function ProfileGrid() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        // 🔥 Firestore path: UNIUYO / 24 / COMPUTER_ENGINEERING / REG
        const colRef = collection(db, "UNIUYO", "24", "COMPUTER_ENGINEERING");
        const snapshot = await getDocs(colRef);

        // 🔄 Convert data into an array
        const fetchedProfiles = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProfiles(fetchedProfiles);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white py-10 px-5">
      {/* Header */}
      <div className="w-full text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
          UNIUYO - Computer Engineering Profiles
        </h1>
        <p className="text-gray-400 mt-2">
          {loading
            ? "Loading profiles..."
            : `${profiles.length} profiles found`}
        </p>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {profiles.map((student) => (
          <div
            key={student.id}
            className="w-[200px] h-[220px] bg-gradient-to-tr from-pink-600 to-blue-600 rounded-2xl shadow-lg p-4 flex flex-col justify-center items-center text-center hover:scale-105 transition-transform duration-300"
          >
            <div className="w-16 h-16 bg-white/20 rounded-full mb-3 flex justify-center items-center text-2xl font-bold text-white">
              {student.name?.charAt(0).toUpperCase() || "?"}
            </div>
            <h2 className="text-lg font-semibold">{student.name || "Unknown"}</h2>
            <p className="text-sm text-gray-200 mt-1">
              {student.regNm || "No Reg. No"}
            </p>
            <p className="text-sm text-gray-400 mt-1 truncate w-full">
              {student.email || "No Email"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
