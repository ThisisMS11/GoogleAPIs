'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { useAutoAnimate } from '@formkit/auto-animate/react'

const Video = ({ params }) => {

    /* auto animate stuff */
    const [parent, enableAnimations] = useAutoAnimate()

    const videoId = params.id;

    const [newnote, setNewnote] = useState({ title: "", content: "" });

    const notes2 = [
        {
            title: "What is MUI?",
            content: "MUI is a UI component library to help developers who hate CSS build frontend UI with ease.",
        },
        {
            title: "Introduction to React Hooks",
            content: "React Hooks are a way to use state and other React features in functional components.",
        },
        {
            title: "Getting Started with Node.js",
            content: "Node.js is a JavaScript runtime that allows you to run JavaScript on the server.",
        },
        {
            title: "The Basics of Python Programming",
            content: "Python is a popular and versatile programming language known for its simplicity and readability.",
        },
        {
            title: "A Beginner's Guide to Machine Learning",
            content: "Machine learning is a field of study that allows computers to learn and make predictions from data.",
        },
        {
            title: "Understanding RESTful APIs",
            content: "RESTful APIs are a set of rules and conventions for building web services.",
        },
    ];

    const [notes, setNotes] = useState([])

    const handleOnChange = (event) => {
        setNewnote({
            ...newnote, [event.target.name]: event.target.value
        })
    }

    /* Add a new note */
    const handleNoteSubmit = async (event) => {
        event.preventDefault();
        // setNotes([...notes, newnote])

        /* call the api here */
        const url = `${process.env.NEXT_PUBLIC_SERVER}/api/videos/notes`;

        try {

            const addNote = await axios.post(url, {
                title: newnote.title,
                content: newnote.content,
                videoId
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            setNotes([...notes, addNote.data.newNote])

            setNewnote({ title: "", content: "" })

        } catch (error) {
            alert('some error occured while post creation');
            console.log({ error });
        }
    }

    /* Delete a note */
    const handleDelete = async (noteId) => {
        /* call the delete note api here */
        const url = `${process.env.NEXT_PUBLIC_SERVER}/api/videos/notes/${noteId}`;


        try {
            const deleteNote = await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            /* change the local view of notes */
            const filteredNotes = notes.filter((e) => e._id !== deleteNote.data.deleteNoteRes._id)
            setNotes(filteredNotes);
        } catch (error) {
            alert('some error occured while deleting the note');

            console.log(error);
        }
    }

    /* updating a note */


    useEffect(() => {
        async function fetchAllNotes() {

            try {
                const url = `${process.env.NEXT_PUBLIC_SERVER}/api/videos/notes/${videoId}`;

                const videoNotes = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                setNotes(videoNotes.data.notes);
            } catch (error) {
                alert('some error occured while fetching the notes please stay try again');
                console.log(error);
            }
        }

        fetchAllNotes();
    }, [])



    return <div className="p-4 md:flex justify-around items-center">

        <div className="md:w-[60rem] h-80 md:h-[38rem] max-w-[65rem] ">

            <iframe className="h-full w-full rounded-lg "
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
            </iframe>
        </div>


        {/* I can create a input to keep a track of my own notes  */}

        <div ref={parent} className="mt-2 md:mt-0 w-full md:w-1/3 md:h-[38rem] overflow-y-scroll videoScrollBar bg-white p-2 rounded-md md:bg-none">


            <form onSubmit={handleNoteSubmit}>
                <input type="text" className="block w-full rounded-md border mt-2 border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium  focus:outline-none focus:ring-0" placeholder="Title..."
                    value={newnote.title} name="title" onChange={handleOnChange}
                />
                <input type="text" className="block w-full rounded-md border mt-2 border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium  focus:outline-none focus:ring-0" placeholder="Add your notes...
            " value={newnote.content} name="content" onChange={handleOnChange} />

                <button type="submit" className="mt-2 p-2 w-full bg-blue-600 text-white rounded-lg">Add note</button>
            </form>

            {/* notes box  */}
            {notes && notes.map((note, index) => {
                return <div className="hs-accordion-group mt-4" key={note._id}>
                    <div
                        className="shadow-lg  hs-accordion active bg-white w-full"
                        id="hs-basic-heading-one">

                        <div className="flex justify-between">

                            <button className="hs-accordion-toggle hs-accordion-active:text-blue-600 group py-3 inline-flex items-center  gap-x-3 w-fit font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400" aria-controls="hs-basic-collapse-one">



                                <svg className="ml-4 hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />gap-x-3
                                    <path d="M8.12421 13.36V2.35999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>

                                <svg className=" ml-4 hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>



                                {note.title}
                            </button>

                            <button className="mr-2 cursor-pointer" onClick={() => handleDelete(note._id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" className="text-[#4b5563]">
                                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                </svg>
                            </button>

                        </div>

                        <div id="hs-basic-collapse-one"
                            className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-heading-one">
                            <p className="text-gray-800 dark:text-gray-200 px-4 py-2">
                                {note.content}
                            </p>
                        </div>

                        <div className="text-gray-400 text-sm text-right mr-2">{(note.createdAt).split('T')[0]}</div>
                    </div>

                </div>
            })
            }

        </div>



    </div>
}
export default Video;