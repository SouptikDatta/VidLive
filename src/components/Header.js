import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { useCallback, useState } from "react";
import { cacheResults } from "../utils/searchSlice";
import { FaBars } from 'react-icons/fa';
import Logo from '../assets/logo.svg'
import { CgProfile } from "react-icons/cg";
import { YOUTUBE_SEARCH_API } from "../utils/constants";

export default function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchCache = useSelector(store => store.search);
    const dispatch = useDispatch();

    function toggleMenuHandler() {
        dispatch(toggleMenu());
    }

    const getSearchSuggestions = useCallback(async (query) => {
        try {
            const response = await fetch(`${YOUTUBE_SEARCH_API}${query}`);
            const data = await response.json();
            if (data && data.items) {
                const titles = data.items.map(item => item.snippet.title);
                return titles;
            }
        } catch (error) {
            console.error("Error fetching search suggestions:", error);
        }
        return [];
    }, []);

    const handleInputChange = (value) => {
        setSearchQuery(value);
        if (value.trim() === "") {
            setSuggestions([]);
            return;
        }

        const timer = setTimeout(() => {
            if (searchCache[value]) {
                setSuggestions(searchCache[value]);
            } else {
                getSearchSuggestions(value).then(suggestions => {
                    setSuggestions(suggestions);
                    dispatch(cacheResults({ [value]: suggestions }));
                });
            }
        }, 200);

        return () => clearTimeout(timer);
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`${YOUTUBE_SEARCH_API}${searchQuery}`);
            const data = await response.json();
            if (data && data.items) {
                // Handle search results here
                console.log("Search results:", data.items);
            }
        } catch (error) {
            console.error("Error searching:", error);
        }
    };

    return (
        <div className="flex flex-wrap justify-between p-3 pl-10 pr-10 shadow-lg items-center bg-gray-900 text-white" style={{ position: "sticky", top: 0, zIndex: 100, boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px" }}>
            <div className="flex items-center gap-5">
                <FaBars onClick={toggleMenuHandler} className="h-12 md:h-16 cursor-pointer" />
                <div className="flex items-center">
                    <img className="h-10 md:h-12 mr-2" src={Logo} alt="logo" />
                    <h4 className="text-lg md:text-2xl font-extrabold">VidLive</h4>
                </div>
            </div>
            <div className="flex items-center">
                <input
                    className="flex-grow border border-gray-300 p-2 rounded-full rounded-r-none outline-none bg-gray-800 text-white"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setShowSuggestions(false)}
                    placeholder="Search"
                />
                <button className="border border-gray-300 bg-gray-800 p-2 border-l-0 rounded-full rounded-l-none outline-none" onClick={handleSearch}>🔍</button>
            </div>
            <div className="flex items-center">
                <CgProfile className="text-xl md:text-2xl" />
                <span className="text-sm md:text-base text-gray-300">Souptik</span>
            </div>
            {showSuggestions && suggestions && suggestions.length > 0 && (
                <div className="absolute bg-gray-800 w-full md:w-auto shadow-lg rounded-lg border border-gray-100 mt-10 md:mt-0">
                    <ul>
                        {suggestions.map((d, index) => (
                            <li key={index} className="px-2 py-2 hover:bg-gray-700 shadow-sm cursor-pointer" onClick={() => setSearchQuery(d)}>🔍 {d}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
