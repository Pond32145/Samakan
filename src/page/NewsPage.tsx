import { FC, useState ,useEffect } from 'react';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface NewProps {
    data: Post;
}
const NewComponent: FC<NewProps> = ({ data }) => {
    return (
        
            <div key={data.id} className='boder rounded-md shadow-md p-4 screen-sm '>
                <div className='text-3xl'>{data.title}</div>
                <div className='text-sm py-4 '>{data.body}</div>
            </div>
    )
}

const NewsPage: FC = () => {
    //state
    const [posts, setPosts] = useState<Post[]>([
        {
            userId: 1,
            id: 1,
            title: "test",
            body: "test",
        }
    ]);

    //function
    const loadNews = () => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((resp) => resp.json()
            ).then((json) => {
                setPosts(json);
            });

    };

    useEffect(() =>{
        //fetch data here
        loadNews();
    }, []);

    // ssync await func
    const loadNewsAsync = async() =>{
        try{
        const resp = await fetch("https://jsonplaceholder.typicode.com/posts")
        const json = await resp.json()
        setPosts(json);
    } catch (e) {
        //show error
    }
};

    // template
    return (
        <>
            <h1>NewPage</h1>
            <button className='btnfc mr-4' onClick={loadNews}>
                LoadNews
            </button>
            <button className='btnfc mr-4' onClick={loadNewsAsync}>
                LoadNews(Async)
            </button>
            <div className='grid grid-cols1 gap-2 p-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4'>
            {posts.map((value) => (
                <NewComponent data={value} />
            ))}
            </div>
        </>
    )
};

export { NewsPage }