import GithubServiceContext from "context/GithubServiceContext";
import useInifiniteScroll from "hooks/useInfiniteScroll";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { Repo } from "services/github";
import RepoItem from "./repoItem";
import "./style.sass";

interface Props {
    query: string;
}

const List: FC<Props> = ({ query }) => {
    const initialData = useMemo<Repo>(() => {
        return {
            total_count: 0,
            incomplete_results: false,
            items: []
        }
    }, [])

    const [data, setData] = useState<Repo>(initialData)
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const { service } = useContext(GithubServiceContext);

    const loadMore = async () => {
        setLoading(true);
        if (query) {
            try {
                const result = await service.getRepository(query, page);
                if (result.items.length) {
                    const $data = {
                        ...data,
                        items: [...data.items, ...result.items],
                    };
                    setData($data);
                    setHasMore(true);
                    setPage(page + 1);
                }
                else if (result.items.length === 0 && page === 1) {
                    setData(initialData);
                    setHasMore(false);
                    setPage(1);
                }
                setLoading(false);
            } catch (error) {
                setHasMore(false);
                setLoading(false);
            }
        }
        else {
            setLoading(false);
        }
    }

    const infiniteScrollRef = useInifiniteScroll<HTMLDivElement>({
        loading,
        hasMore,
        loadMore,
    })

    return (
        <div className="list-container" ref={infiniteScrollRef}>
            {data.items.map(item => <RepoItem repoItem={item} />)}
        </div>
    )
}

export default List