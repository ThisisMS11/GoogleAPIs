'use client';
import { useState } from "react";
const Video = ({ params }) => {

    const videoId = params.id;

    const [newnote, setNewnote] = useState({ title: "", description: "" });

    const notes2 = [
        {
            title: "What is MUI?",
            description: "MUI is a UI component library to help developers who hate CSS build frontend UI with ease.",
        },
        {
            title: "Introduction to React Hooks",
            description: "React Hooks are a way to use state and other React features in functional components.",
        },
        {
            title: "Getting Started with Node.js",
            description: "Node.js is a JavaScript runtime that allows you to run JavaScript on the server.",
        },
        {
            title: "The Basics of Python Programming",
            description: "Python is a popular and versatile programming language known for its simplicity and readability.",
        },
        {
            title: "A Beginner's Guide to Machine Learning",
            description: "Machine learning is a field of study that allows computers to learn and make predictions from data.",
        },
        {
            title: "Understanding RESTful APIs",
            description: "RESTful APIs are a set of rules and conventions for building web services.",
        },
    ];

    const [notes, setNotes] = useState(notes2)

    const handleOnChange = (event) => {
        setNewnote({
            ...newnote, [event.target.name]: event.target.value
        })
    }

    const handleNoteSubmit = (event) => {
        event.preventDefault();
        console.log(newnote)
        setNotes([...notes, newnote])
        setNewnote({title:"" , description:""})
    }


    return <div className="p-4 md:flex">

        <iframe className="w-full h-80 md:h-[38rem] rounded-lg " 
        src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
        </iframe>

        {/* I can create a input to keep a track of my own notes  */}

        <div className="m-2 md:h-[38rem] overflow-y-scroll videoScrollBar bg-white p-2 rounded-md md:bg-none">


        <form onSubmit={handleNoteSubmit}>
            <input type="text" className="block w-full rounded-md border mt-2 border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium  focus:outline-none focus:ring-0" placeholder="Title..."
                value={newnote.title} name="title" onChange={handleOnChange}
            />
            <input type="text" className="block w-full rounded-md border mt-2 border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium  focus:outline-none focus:ring-0" placeholder="Add your notes...
            " value={newnote.description} name="description" onChange={handleOnChange} />

            <button type="submit" className="mt-2 p-2 w-full bg-blue-600 text-white rounded-lg">Add note</button>
        </form>

        {/* notes box  */}
        {notes.map((note, index) => {
            return <div className="hs-accordion-group mt-4" key={index}>
                <div
                    className="shadow-lg  hs-accordion active bg-white w-full"
                    id="hs-basic-heading-one">

                    <button className="hs-accordion-toggle hs-accordion-active:text-blue-600 group py-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400" aria-controls="hs-basic-collapse-one">

                        <svg className="ml-4 hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" stroke-width="2" stroke-linecap="round" />gap-x-3
                            <path d="M8.12421 13.36V2.35999" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        </svg>

                        <svg className=" ml-4 hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        </svg>

                        {note.title}
                    </button>

                    <div id="hs-basic-collapse-one"
                        className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-heading-one">
                        <p className="text-gray-800 dark:text-gray-200 px-4 py-2">
                            {note.description}
                        </p>
                    </div>
                </div>

            </div>
        })
        }

</div>



    </div>
}
export default Video;