import { cookies } from 'next/headers'
// import searchResults from './demodata';
import Card from '../../../components/Videos/Card'
// import Search from '../../../components/Search';

async function getData(query) {

    const url = `${process.env.NEXT_PUBLIC_SERVER}/api/google/videos/search`;

    const jsondata = {
        query: query,
        regionCode: 'IN'
    }

    const res = await fetch(url, {
        method: 'POST',
        headers: { Cookie: cookies().toString() },
        body: JSON.stringify(jsondata)
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    const data = await res.json();
    return data.data;
}

const SearchResults = async ({ searchParams }) => {

    const query = searchParams.search_query;

    const searchResults = await getData(query);

    return <section >

        {/* <Search /> */}

        <div className='flex flex-wrap gap-4 relative justify-center'>
            {searchResults && searchResults.map((video) => {
                return <div key={video.id}
                    className=" h-fit p-2 "
                >

                    <Card video={video} ForSearch={true} />

                </div>
            })}
        </div>
    </section>
}


export default SearchResults;