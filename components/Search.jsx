'use client';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

const Search = () => {
    const [query, setQuery] = useState("");
    const router=useRouter();

    const handleQuerySearch=(e)=>{
        e.preventDefault();
        console.log(query)
        router.push('/dashboard/results?search_query='+query)
    }

    return (
        <div className="py-3 text-center ">
            <form onSubmit={handleQuerySearch} className="relative max-w-sm md:max-w-lg mx-auto">
                <label htmlFor="hs-table-search" className="sr-only">Search</label>

                <input type="text" name="hs-table-search" id="hs-table-search" 
                className="p-3 pl-10 bg-gray-100 text-black block w-full border-black rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" 

                placeholder="Search for items"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    autoComplete="off"
                />

                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
                    <svg className="h-3.5 w-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </div>

            </form>
        </div>
    )
}

export default Search