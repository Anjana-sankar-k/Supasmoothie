import supabase from "../config/supabaseClient"; // ✅ Ensure Supabase client is configured properly
import { useEffect, useState } from "react";

const Home = () => {
  // ✅ State variables for handling fetched data, errors, and loading
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    const fetchSmoothies = async () => {
      setLoading(true); // ✅ Show loading before fetching data

      // ✅ Fetch data from Supabase
      const { data, error } = await supabase.from("smoothies").select();

      console.log("Supabase Data:", data);
      console.log("Supabase Error:", error);

      if (error) {
        setFetchError("Could not fetch the smoothies"); // ✅ Set error message if fetching fails
        setSmoothies(null);
      } else {
        setSmoothies(data); // ✅ Store retrieved data in state
        setFetchError(null);
      }

      setLoading(false); // ✅ Turn off loading after fetching
    };

    fetchSmoothies();
  }, []); // ✅ Runs only once when the component mounts

  return (
    <div className="page home">
      {/* ✅ Display error message if fetch fails */}
      {fetchError && <p className="error">{fetchError}</p>}

      {/* ✅ Show loading message */}
      {loading && <p className="loading">Loading smoothies...</p>}

      {/* ✅ Ensure smoothies exist before mapping */}
      {!loading && smoothies && smoothies.length > 0 ? (
        <div className="smoothies-list">
          {smoothies.map((smoothie) => (
            <div key={smoothie.id} className="smoothie-item">
              <h3>{smoothie.Name}</h3> {/* ✅ Use correct column name: Name */}
              <p>{smoothie.Method}</p> {/* ✅ Display Method */}
              <p>Rating: {smoothie.Rating}</p> {/* ✅ Display Rating */}
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="no-data">No smoothies found.</p> // ✅ Show message if empty
      )}
    </div>
  );
};

export default Home;
