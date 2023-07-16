
const YoutubeVideoForm = () => {
    return (<>

        <div className="relative">
            <div className="mx-auto max-w-screen-md py-12 px-4 flex justify-center sm:px-6 md:max-w-screen-xl md:py-20 lg:py-22 md:px-8 bg-white mt-8 rounded-full drop-shadow-xl">
                <div className="md:pr-8 md:w-1/2 xl:pr-0 xl:w-5/12">
                    <h1 className="text-3xl text-center text-gray-800z font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight dark:text-gray-200">
                        Upload Video <span className="text-red-600 dark:text-blue-500">Youtube</span>
                    </h1>
                    <p className="my-3 text-base text-gray-500 text-center">
                        Directly upload your video to your youtube channel
                    </p>



                    <form classNameName="mt-4">
                        <div className="mb-4">
                            <label htmlFor="hs-hero-name-2" className="block text-sm font-medium dark:text-white"><span className="sr-only">Title</span></label>
                            <input type="text" id="hs-hero-name-2" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-red-500 focus:ring-red-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 bg-[#ececec]" placeholder="Video Title" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="hs-hero-email-2" className="block text-sm font-medium dark:text-white"><span className="sr-only">Description</span></label>
                            <input type="email" id="hs-hero-email-2" className="py-3 px-4 block w-full border-gray-200 bg-[#ececec] rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Video Description" />
                        </div>

                        <label htmlFor="file-input" className="sr-only">Choose file</label>
                        <input type="file" name="file-input" id="file-input" className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
    file:bg-transparent file:border-0
    file:bg-gray-100 file:mr-4
    file:py-3 file:px-4
    dark:file:bg-gray-700 dark:file:text-gray-400 dark" />


                        <div className="grid mt-4">
                            <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 sm:p-4  ">Upload Video</button>
                        </div>


                    </form>
                </div>

            </div>


        </div>

    </>)
}
export default YoutubeVideoForm